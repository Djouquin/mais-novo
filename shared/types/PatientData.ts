export interface PatientData {
  name: string;
  respiratoryRate: number;
  bloodPressure: number;
  heartRate: number;
  temperature: number;
  conscience: string;
  spo2: string;
  time: string;
  battery: number;
  MEWS?: number; //calculado em LatestData
  deviceID?:number;
}
