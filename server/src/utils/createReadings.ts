import reading from '../models/readings'

export async function createReading(){
  const newReading = new reading({
    macAddress: "123",
    timestamp: Date.now(),
    spo2: 95,
    heartRate:80,
    battery:100,
  })
  try{
    await newReading.save();
    console.log("reading salvo");
  }
    catch(error){
    console.error('erro salvando:',error);
  }
}