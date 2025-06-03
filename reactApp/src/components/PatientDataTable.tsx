import Header from './Header';
import battery from '../assets/battery-charging-icon.svg';
import { useEffect, useState } from "react";

interface Props {
    title: string;
    route: string;
}
import type { PatientData } from '../../../shared/types/PatientData';

const PatientDataTable = ({title,route}:Props)=>{
    const [patientData,setPatientData]= useState <PatientData[]>([])
    
    useEffect(()=>{
        const fetchData = () => {
            fetch(route)
            .then((res) => res.json())
            .then((data) =>  setPatientData(data))
        }
        
        fetchData();

        const interval = setInterval(fetchData,5000); //atualiza a cada 5s
        return () => clearInterval(interval); //para desmount do componente
    },[])
        
    return(
        <div className="w-full overflow-x-auto">
            <Header title ={title}/>
            <table className="table-auto w-full">
                <thead>
                    <tr className= "divide-x-4 text-2xl text-cyan-50 divide-blue-950 bg-blue-900">
                        <th className="px-3">Nome do Paciente</th>
                        <th className="px-3">MEWS</th>
                        <th className="px-3">Frequência Respiratória</th>
                        <th className="px-3">Pressão Arterial</th>
                        <th className="px-3">Frequência Cardíaca</th>
                        <th className="px-3">Temperatura</th>
                        <th className="px-3">Nível de Consciência</th>
                        <th className="px-3">SPO2</th>
                        <th className="px-3">Horário</th>
                        <th className="px-3">Dispositivo</th>
                        <th className="px-3"> 
                            <img className="size-30" src= {battery}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patientData.map((p,index)=>(
                    <tr key = {index}
                    className="text-center divide-x-4 divide-cyan-800 text-black bg-cyan-200">
                        <td className="p-3">{p.name}</td>
                        <td className="p-3">{p.MEWS}</td>
                        <td className="p-3">{p.respiratoryRate}</td>
                        <td className="p-3">{p.bloodPressure}</td>
                        <td className="p-3">{p.heartRate}</td>
                        <td className="p-3">{p.temperature}</td>
                        <td className="p-3">{p.conscience}</td>
                        <td className='p-3'>{p.spo2}</td>
                        <td className="p-3">{p.time}</td>
                        <td className="p-3">{p.device}</td>
                        <td className="p-3">{p.battery}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default PatientDataTable;