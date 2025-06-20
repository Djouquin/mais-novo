import mongoose, { InferSchemaType } from 'mongoose'

// Esquema para dados do formulario
const formularioSchema = new mongoose.Schema({
    //patientID é o objectId gerado para o paciente na collection dele
    patientID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Patient",
        required: true 
    },  
    timestamp: { type: Number, required: true },
    respRate: { type: Number, required: false },
    bloodPressure: { type: Number, required: false },
    temperature: { type: Number, required: false },
    conscience: { type: String, required: false },
    spo2Form: { type: Number, required: false },
    heartRateForm: { type: Number, required: false },
});

formularioSchema.index({ patientID: 1, timestamp: -1 });  // Índice para otimização

// Modelo para pacientes
const Form = mongoose.model('Form', formularioSchema);

export type IReadingForm = InferSchemaType<typeof formularioSchema>;
export default Form;