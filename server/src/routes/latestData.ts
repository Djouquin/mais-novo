import { Router } from "express";

import Device from "../models/device";
import Patient from "../models/pacient";
import Reading from "../models/readings";
import ReadingsForm from "../models/readingsForm";

import type { IDevice } from "../models/device";
import type { IReading } from "../models/readings";
import type { IReadingForm } from "../models/readingsForm";

const router = Router();
//rota para fazer o arrecadamento e calculo dos dados do BD

//|Nome|MEWS|FreqResp|Pressao|FreqCard|Temperatura|consciencia|spo2|horario|dispositivo|bateria|
router.get("/", async (req, res) => {
  try{
    const patients = await Patient.find();
    const results =[];//ver se tem q declarar dentro ou fora do for
    
    for (const patient of patients) {
      let form:IReadingForm | null = null;
      let sensorReadings:IReading | null = null;
      let device:IDevice | null = null;

      form = await ReadingsForm.findOne({ patientID: patient._id });
      //verificar se conectado a um device
      if(patient.intervalos.length !== 0){
        for (let i of patient.intervalos.reverse()){ //o fato de .reverse() mutar o array original faz diferenca?
          
          //procurar no intervalo de uso do paciente qual device estava usando
          device = await Device.findOne({deviceID: i.deviceID});

          //pegar em Readings a leitura dentro do intervalo
            sensorReadings = await Reading.findOne({
            macAddress: device?.macAddress,
            timestamp: {
              $gte: i.intervalo[0],
              $lte: i.intervalo[1]
            }
          })
          
          //ver se ta conectado a um paciente
          if( device?.currentPatient!= null && i.intervalo[1] == 999999999999999999){
           let connectedDevice = device; 
          }
          
          if (sensorReadings != null)break;
        }
      }

      //ler dados do form (caso tiver)
      
        //definir qual valores de spo2 e heartRate usar atraves de timestamp

        let heartRate: number | null = null;
        let spo2: number | null = null;

        let formHR = form?.heartRateForm ?? null;
        let formSPO2 = form?.spo2Form ?? null;
        let sensorHR = sensorReadings?.heartRate ?? null;
        let sensorSPO2 = sensorReadings?.spo2 ?? null;

        if ( sensorReadings && form) {
          let useForm = form.timestamp > sensorReadings.timestamp;
          heartRate = useForm? formHR : sensorHR;
          spo2 = useForm? formSPO2 : sensorSPO2; 
        }
        else{
          heartRate = formHR ?? sensorHR;
          spo2 = formSPO2 ?? sensorSPO2;
        }
        
        //calcula MEWS
        const MEWS =
        calculatePointsMews(form?.respRate ?? 0, intervalosMews.respiratoryRate,) +
        calculatePointsMews(form?.bloodPressure ?? 0, intervalosMews.bloodPressure) +
        calculatePointsMews(heartRate ?? 0, intervalosMews.heartRate) +
        calculatePointsMews(form?.temperature ?? 0, intervalosMews.temperature) +
        calculatePointsMews(form?.conscience ?? "", intervalosMews.conscience);
        
        //formata horario para hh:mm | dd/mm/a
        const date = formatDate(form?.timestamp ?? null)
        
        results.push(
          {
            name:patient.nome,
            MEWS:MEWS,
            respiratoryRate:form?.respRate ?? null,
            bloodPressure:form?.bloodPressure,
            heartRate:heartRate,
            temperature:form?.temperature,
            conscience:form?.conscience,
            spo2:spo2,
            time:date,
            battery:sensorReadings?.battery,
            deviceID:device?.deviceID
          }
        )
    }
    res.status(200).json(results);
  }catch{
    res.status(500).json({message:'erro ao buscar pacientes'});
  }
});

export default router;

const intervalosMews: {
  heartRate: [number | null, number | null][];
  respiratoryRate: [number | null, number | null][];
  bloodPressure: [number | null, number | null][];
  temperature: [number | null, number | null][];
  conscience: (string | null)[];
} = {
  heartRate: [
    [null, 40],
    [41, 50],
    [null, null],
    [51, 100],
    [101, 110],
    [111, 119],
    [120, null],
  ],
  respiratoryRate: [
    [null, null],
    [null, 9],
    [null, null],
    [10, 18],
    [19, 25],
    [26, 29],
    [30, null],
  ],
  bloodPressure: [
    [null, 70],
    [71, 80],
    [81, 100],
    [101, 179],
    [null, null],
    [180, 199],
    [200, null],
  ],
  temperature: [
    [null, null],
    [null, 35],
    [null, null],
    [35.1, 37.7],
    [37.8, 38.9],
    [39, null],
    [null, null],
  ],
  conscience: [null, null, null, "A", "V", "P", "U"],
};

function calculatePointsMews(
  valor: number | string | null,
  intervalos: [null | number, null | number][] | (string | null)[],
): number {
  if (valor == null) return 0;

  for (let i = 0; i < 7; i++) {
    const intervalo = intervalos[i];

    // para intervalos numericos
    if (Array.isArray(intervalo)) {
      const [min, max] = intervalo;
      //evitar falsos positivos
      if (min == null && max == null) continue;

      if (
        typeof valor === "number" &&
        (min == null || valor >= min) &&
        (max == null || valor <= max)
      ) {
        return Math.abs(i - 3);
      }
    } else if ( typeof valor === "string"){
      //para conceito
      if (intervalo === valor) return Math.abs(i - 3);
    }else if (valor == null)return 0;
  }
  return 0;
}

function formatDate(timestamp:number | null):string{
  if (timestamp != null){
    const date = new Date(timestamp);
    
    const day =(String(date.getDate()).padStart(2,'0'));
    const month =(String(date.getMonth()+1).padStart(2,'0'));
    const year =(String(date.getFullYear()));
    const hours =(String(date.getHours()).padStart(2,'0'));
    const minutes =(String(date.getMinutes()).padStart(2,'0'));
    const formatted = `${hours}:${minutes}\n${day}/${month}/${year}`
    
    return formatted;
  }else{
    return 'balls'
  }
}
