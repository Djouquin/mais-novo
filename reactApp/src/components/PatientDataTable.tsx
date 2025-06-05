import battery from '../assets/battery-charging-icon.svg';
import { useEffect, useState } from "react";
import type { PatientData } from '../../../shared/types/PatientData';

interface Props {
    route: string;
}

const PatientDataTable = ({route}:Props)=>{
    
    const [patientData,setPatientData]= useState <PatientData[]>([])
    
    useEffect(()=>{ //fetch e organiza os dados da rota em MEWS decrescente
        const fetchData = () => {
            fetch(route)
            .then(res => res.json())
            .then((data: PatientData[]) => {
                const sortedData = data.sort((b,a)=> (a.MEWS ?? 0) - (b.MEWS ?? 0));
                setPatientData(sortedData)
            });
        }
        
        fetchData();

        const interval = setInterval(fetchData,2000); //atualiza a cada 2s
        return () => clearInterval(interval); //para desmount do componente
    },[])//encontrar maneira de atualizar com dependency não setInterval
      
    return( //cria e preenche tabela  
        <div className="w-full overflow-x-auto">
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
                        <td className={`p-3 ${getMewsColor(p.MEWS)}`}>{p.MEWS}</td>
                        <td className="p-3">{isNull(p.respiratoryRate)}</td>
                        <td className="p-3">{isNull(p.bloodPressure)}</td>
                        <td className="p-3">{isNull(p.heartRate)}</td>
                        <td className="p-3">{isNull(p.temperature)}</td>
                        <td className="p-3">{isNull(p.conscience)}</td>
                        <td className='p-3'>{isNull(p.spo2)}</td>
                        <td className="p-3">{isNull(p.time)}</td>
                        <td className="p-3">{isNull(p.device)}</td>
                        <td className="p-3">{isNull(p.battery)}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function getMewsColor(MewsScore: number|undefined):string{
    const coresMews = ["bg-green-500","bg-yellow-500", "bg-orange-500", "bg-red-500", "bg-gray-400"];
    
    if(MewsScore == null) return coresMews[4];
    if(MewsScore < 2) return coresMews[0];
    if(MewsScore === 2) return coresMews[1];
    if(MewsScore < 5) return coresMews[2];
    if(MewsScore >= 5) return coresMews[3];

    return '';
}

function isNull(value: number|string|null|undefined){
    return value ?? '-'
}

export default PatientDataTable;