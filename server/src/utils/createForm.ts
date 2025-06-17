import readingForm from '../models/readingsForm';
import mongoose from 'mongoose';

export async function createForm(){
    const newForm = new readingForm({
        patientID : new mongoose.Types.ObjectId('6850455ff371db4ef388c703'), //colocar o que foi criado pelo Mongo
        timestamp : Date.now(),
        respRate: 10,
        bloodRate: 120,
        temperature: 36.5,
        conscience: "A",
        spo2Form: 95,
        heartRateForm: 80,
    })
    
    try{
        await newForm.save();
        console.log("form salvo");
    }
    catch(error){
    console.error('erro salvando:',error);
    }
}
