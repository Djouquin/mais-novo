import express from "express";
import cors from "cors";
import latestData from "./controllers/latestData";

const app = express();

// Rotas
app.use(cors());
app.use(express.json());
app.use("/api/ultimosDados", latestData);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://192.168.68.119:${PORT}`);
});
