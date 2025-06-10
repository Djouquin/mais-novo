import { Router } from "express";
import fs from "fs"
import mock from "../../mock.json";

const router = Router();
//rota para criar pacientes em mock.json (equivalente database)

router.patch('/', async(req,res)=>{
  try{
    const { name, id,respiratoryRate, bloodPressure, temperature, conscience}= req.body
    
    //fetch manda como string
    const parsedRespiratoryRate = Number(respiratoryRate)
    const parsedBloodPressure = Number(bloodPressure)
    const parsedTemperature = Number(temperature)
    if(isNaN(parsedRespiratoryRate)||isNaN(parsedBloodPressure)||isNaN(parsedTemperature)){
      res.status(500);
    }

    //console.log(req.body);
    res.status(200).json({ message: "Paciente atualizado com sucesso!" });
  }
  catch{
    res.status(400)
  }
})
export default router;
