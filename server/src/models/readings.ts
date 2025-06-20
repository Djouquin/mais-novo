import mongoose, { InferSchemaType } from 'mongoose'

const readingSchema = new mongoose.Schema({
    macAddress: { type: String, required: true },  // Endereço MAC como ID
    timestamp: { type: Number, required: true },   // Timestamp enviado pelo dispositivo
    spo2: { type: Number, required: true },         // Apenas a leitura do oxímetro
    heartRate: { type: Number, required: true },
    battery: { type: Number, required: false },
  });

readingSchema.index({ macAddress: 1, timestamp: -1 });  // Índice para otimização  
const Reading = mongoose.model('Reading', readingSchema);

export type IReading = InferSchemaType<typeof readingSchema>;
export default Reading; // Exporta o modelo