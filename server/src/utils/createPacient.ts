import pacient from '../models/pacient'

export async function createPacient(){
  const newPacient = new pacient({
    nome:'Nome',
    dataNascimento:'1/1/1111',
    dataInternacao:'2/2/2222',
    leito:'leito',
    nroFia:'123123',
    nomeMae:'nomeMae',
    qrCode:'qrCode',
    pacienteIntervalos: [
      { intervalo: [1609459200, 1609462800], macAddress: "AA:BB:CC:DD:FF" },
      { intervalo: [1609470000, 1609473600], macAddress: "GG:HH:II:JJ:KK" },
    ],
  })
  try{
    await newPacient.save();
      console.log("paciente salvo");
  }
    catch(error){
    console.error('erro salvando:',error);
  }
}