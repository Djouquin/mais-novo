import express from "express";
import cors from "cors";
import latestData from "./routes/latestData";
import newPatient from "./routes/newPatient";
import * as utils from "./utils";
import * as config from "./config"

const app = express();

//DB
async function comeca() {
  await config.configDB();
  // await utils.createForm();
  // await utils.createDevice();
  // await utils.createPacient();
  // await utils.createReading();
}
comeca();
  
// Rotas
app.use(cors());
app.use(express.json());
app.use("/api/ultimosDados", latestData);
app.use("/api/novoPaciente", newPatient);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://192.168.68.119:${PORT}`);
});
