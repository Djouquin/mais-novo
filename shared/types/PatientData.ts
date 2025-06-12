export interface PatientData {
  name: string;
  respiratoryRate: number;
  bloodPressure: number;
  heartRate: number;
  temperature: number;
  conscience: string;
  spo2: number;
  time: string; //descobrir como funciona timestamp -> string
  device: string;
  battery: number;
  MEWS?: number; //calculado em LatestData
}
