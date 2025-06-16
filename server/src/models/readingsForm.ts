import mongoose from 'mongoose'

// Esquema para dados do formulario
const formularioSchema = new mongoose.Schema({
    patientID: { type: String, required: true },  
    timestamp: { type: Number, required: true },
    respRate: { type: Number, required: false },
    bloodRate: { type: Number, required: false },
    temperature: { type: Number, required: false },
    conscience: { type: String, required: false },
    spo2Form: { type: Number, required: false },
    heartRateForm: { type: Number, required: false },
});

formularioSchema.index({ patientID: 1, timestamp: -1 });  // Índice para otimização

// Modelo para pacientes
const Formulario = mongoose.model('Form', formularioSchema);

export default Formulario;