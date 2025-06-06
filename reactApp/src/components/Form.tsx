import Button from "./Button";
import {useState } from "react";
interface Props{
  message: string;
}
const Form = ({message}:Props) => {
  const[ShowForm, SetShowForm] = useState(false)
  return (
    <div className="flex flex-col items-center space-y-5">
      {ShowForm||(
        <Button message={message} handler ={()=>{SetShowForm(true)}}></Button>
      )}
      {ShowForm && (
        <form className="flex flex-col items-start space-y-1 bg-cyan-200 p-6 rounded-2xl">
          <Button message='×' handler ={()=>{SetShowForm(false)}} style="bg-red-500 p-2 w-8 h-8"></Button>
          <label htmlFor="fname">Nome:</label>
          <input type="text" id="fname" name="fname" className="bg-cyan-800 p-2 rounded-2xl"/>      
          <Button message='Confirmar'></Button>
        </form>
      )}
    </div>
  );
};

export default Form;
