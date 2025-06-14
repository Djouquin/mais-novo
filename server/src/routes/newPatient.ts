import { Router } from "express";
import mongoose from 'mongoose';

const router = Router();
//rota para criar pacientes em mock.json (equivalente database)

router.patch('/', async(req,res)=>{
  try{
    //fetch do form
    const { name, id,respiratoryRate, bloodPressure, temperature, conscience}= req.body
    
    const parsedRespiratoryRate = Number(respiratoryRate)
    const parsedBloodPressure = Number(bloodPressure)
    const parsedTemperature = Number(temperature)
    
    //ler as leituras do dispositivo salvas no BD
    console.log(req.body)
    
    res.status(200).json({ message: "Paciente atualizado com sucesso!" });
  }
  catch{
    res.status(400)
  }
})
export default router;
