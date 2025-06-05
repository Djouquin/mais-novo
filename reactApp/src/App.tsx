import './App.css';
import PatientDataTable from './components/PatientDataTable';
import Header from './components/Header';

function App() {

  return (
    <div className='bg-cyan-50 min-h-screen p-10'>
      <Header title ="Ultimos Dados do Paciente "/>
      <PatientDataTable route='http://localhost:8080/api/ultimosDados'/>
    </div>
  )
}

export default App
