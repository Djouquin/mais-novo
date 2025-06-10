import Button from "./Button";
import {useState } from "react";
interface Props{
  message: string;
  route: string;
}

const Form = ({message,route}:Props) => {
  const[ShowForm, SetShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uniqueID = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const formData= new FormData(e.currentTarget);
    const name = formData.get("name");
    const respiratoryRate = formData.get("respiratoryRate");
    const bloodPressure = formData.get("bloodPressure");
    const temperature = formData.get("temperature");
    const conscience = formData.get("conscience");

    try{
      const response = await fetch(route, {
        method: "PATCH",
        body: JSON.stringify({ name,id: uniqueID,respiratoryRate,bloodPressure,temperature,conscience }),
        headers: { "Content-Type": "application/json" },
      });
      if(!response.ok)throw new Error ('bah');
      SetShowForm(false);
    }
    catch (error){
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center space-y-5">
      {ShowForm||(
        <Button message={message} handler ={()=>{SetShowForm(true)}}></Button>
      )}
      {ShowForm && (
        <form //os valores de SPO2 Horario e Dispositivo e Bateria vao vir de outra rota
          onSubmit={handleSubmit} 
          className="flex flex-col items-start space-y-1 bg-cyan-200 p-6 rounded-2xl"
        >
          <Button message='×' handler ={()=>{SetShowForm(false)}} style="bg-red-500 p-2 w-8 h-8 "></Button>
            <label htmlFor="name">Nome:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              placeholder="nome"
              defaultValue={'PlaceHolder'} 
              className="bg-cyan-800 p-2 rounded-2xl text-white"
            />
            <label htmlFor="respiratoryRate">Frequência Respiratória:</label>
            <input 
              type="number" 
              id="respiratoryRate" 
              name="respiratoryRate"
              placeholder="Frequência Respiratória"
              defaultValue={19} 
              className="bg-cyan-800 p-2 rounded-2xl text-white"
            />
            <label htmlFor="bloodPressure">Pressão Arterial:</label>
            <input 
              type="number" 
              id="bloodPressure" 
              name="bloodPressure"
              placeholder="Pressão Arterial"
              defaultValue={120} 
              className="bg-cyan-800 p-2 rounded-2xl text-white"
            />
            <label htmlFor="heartRate">Frequência Cardíaca:</label>
            <input 
              type="number" 
              id="heartRate" 
              name="heartRate"
              placeholder="Frequência Cardíaca"
              defaultValue={80} 
              className="bg-cyan-800 p-2 rounded-2xl text-white"
            />
            <label htmlFor="temperature">Temperatura:</label>
            <input 
              type="number" 
              id="temperature" 
              name="temperature"
              placeholder="Temperatura"
              defaultValue={36.5} 
              className="bg-cyan-800 p-2 rounded-2xl text-white"
            />
            <label htmlFor="conscience">Consciência:</label>
            <input 
              type="text" 
              id="conscience" 
              name="conscience"
              placeholder="Consciência"
              defaultValue={'A'} 
              className="bg-cyan-800 p-2 rounded-2xl text-white"
            />
          <Button message='Confirmar' type='submit'></Button>
        </form>
      )}
    </div>
  );
};

export default Form;
