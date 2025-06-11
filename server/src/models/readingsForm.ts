import mongoose from 'mongoose'

// Esquema para dados do formulario
const formularioSchema = new mongoose.Schema({
    patientID: { type: String, required: true },  
    timestamp: { type: Number, required: true },
    freqResp: { type: Number, required: false },
    pressao: { type: Number, required: false },
    temperatura: { type: Number, required: false },
    nivelConsciencia: { type: String, required: false },
    spo2Formulario: { type: Number, required: false },
    freqCardiacaFormulario: { type: Number, required: false },
});

formularioSchema.index({ patientID: 1, timestamp: -1 });  // Índice para otimização

// Modelo para pacientes
const Formulario = mongoose.model('Formulario', formularioSchema);

module.exports = Formulario; // Exporta o modelo
