import "./App.css";
import PatientDataTable from "./components/PatientDataTable";
import Header from "./components/Header";
import CreatePatientForm from "./components/CreatePatientForm";

function App() {
  return (
    <>
      <div className="bg-cyan-50 min-h-screen p-10 min-w-screen">
        <Header title="Ultimos Dados do Paciente " />
        <PatientDataTable route="http://localhost:8080/api/ultimosDados" />
        <div className="flex justify-center mt-2">
          <CreatePatientForm route="http://localhost:8080/api/novoPaciente" message="Criar novo paciente"/>
        </div>
      </div>
    </>
  );
}

export default App;
