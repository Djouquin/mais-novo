import mongoose from 'mongoose'

// Esquema para dispositivos
const deviceSchema = new mongoose.Schema({
  macAddress: { type: String, required: true },
  deviceID: { type: String, required: true },
  type: { type: String, required: true },
  currentPatient: { type: String, required: false },
});

// Modelo para dispositivos
const Device = mongoose.model('Device', deviceSchema);

export default Device; // Exporta o modelo
