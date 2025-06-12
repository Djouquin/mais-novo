import express from "express";
import cors from "cors";
import latestData from "./routes/latestData";
import newPatient from "./routes/newPatient";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL!) // .env tem que estar na pasta server
const db = mongoose.connection
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.log('conectado ao database'))
const app = express();
//middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/ultimosDados", latestData);
app.use("/api/novoPaciente", newPatient);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://192.168.68.119:${PORT}`);
});
