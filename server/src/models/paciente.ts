import mongoose from 'mongoose'

// Esquema para pacientes
const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  dataInternacao: { type: String, required: true },
  leito: { type: String, required: true },
  nroFia: { type: String, required: true },
  nomeMae: { type: String, required: true },
  qrCode: { type: String, required: true, unique: true},
  intervalos: [
    {
      intervalo: [Number],  // [start, end] do timestamp
      deviceID: { type: String, required: true },  // MAC address do dispositivo
    }
  ],
});

// Modelo para pacientes
const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente; // Exporta o modelo
