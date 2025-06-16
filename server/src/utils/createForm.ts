import readingForm from '../models/readingsForm';

export async function createForm(){
    const newForm = new readingForm({
        patientID : "3",
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
