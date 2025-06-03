import './App.css';
import Table from './components/PatientDataTable';

function App() {

  return (
    <div className='bg-cyan-50 min-h-screen p-10'>
      <Table title='Ultimos Dados do Paciente' route='http://localhost:8080/api/ultimosDados'/>
    </div>
  )
}

export default App
