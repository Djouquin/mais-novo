import "./App.css";
import PatientDataTable from "./components/PatientDataTable";
import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  return (
    <>
      <div className="bg-cyan-50 min-h-screen p-10 min-w-screen">
        <Header title="Ultimos Dados do Paciente " />
        <PatientDataTable route="http://localhost:8080/api/ultimosDados" />
        <div className="flex justify-center mt-2">
          <Form message="Criar novo paciente"></Form>
        </div>
        <div className="flex justify-center mt-2">
          <Form message="Deletar Paciente"></Form>
        </div>
      </div>
    </>
  );
}

export default App;
