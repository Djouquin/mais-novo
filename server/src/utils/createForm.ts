import readingForm from '../models/readingsForm';

async function createForm(){
    const newForm = new readingForm({
        patientID : "3",
        timestamp : 10,
        respRate: 10,
        bloodRate: 120,
        temperature: 36.5,
        conscience: "A",
        spo2Form: 95,
        heartRateForm: 80,
    })
    
    try{
        await newForm.save();
        console.log("salvo");
    }
    catch(error){
    console.error('erro salvando:',error);
    }
}
export default createForm
