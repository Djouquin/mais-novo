import { Router } from "express";
import Patient from "../models/pacient";
import ReadingsForm from "../models/readingsForm";

const router = Router();
//rota para fazer o calculo e display dos dados do BD

//|Nome|MEWS|FreqResp|Pressao|FreqCard|Temperatura|consciencia|spo2|horario|dispositivo|bateria|
router.get("/", async (req, res) => {
  try{
    const patients = await Patient.find();
    const results =[];
    
    for (const patient of patients) {
      const form = await ReadingsForm.findOne({ patientID: patient._id });
      if(form){
        //calcula e soma todos os valores da tabela para o MEWS
        const MEWS =
        calculatePoints(form.respRate ?? 0 , intervalosMews.respiratoryRate,) +
        calculatePoints(form.bloodPressure ?? 0, intervalosMews.bloodPressure) +
        calculatePoints(form.heartRateForm ?? 0, intervalosMews.heartRate) +
        calculatePoints(form.temperature ?? 0, intervalosMews.temperature) +
        calculatePoints(form.conscience ?? "", intervalosMews.conscience);

        const date = form.timestamp
        results.push(
          {
            name:patient.nome,
            MEWS:MEWS,
            respiratoryRate:form.respRate,
            bloodPressure:form.bloodPressure,
            heartRate:form.heartRateForm,
            temperature:form.temperature,
            conscience:form.conscience,
            spo2:form.spo2Form,
            time:date
          }
        )
      }
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

function calculatePoints(
  valor: number | string,
  intervalos: [null | number, null | number][] | (string | null)[],
): number {
  if (valor == null) return 0;

  for (let i = 0; i < 7; i++) {
    const intervalo = intervalos[i];

    if (Array.isArray(intervalo)) {
      // para intervalos numericos
      const [min, max] = intervalo;

      if (min == null && max == null) continue;

      if (
        typeof valor === "number" &&
        (min == null || valor >= min) &&
        (max == null || valor <= max)
      ) {
        return Math.abs(i - 3);
      }
    } else {
      //para conceito
      if (intervalo === valor) return Math.abs(i - 3);
    }
  }
  return 0;
}

// function formatDate():string{

//   return formatted;
// }
function getColorBattery(value: any, timestamp: any) {}
