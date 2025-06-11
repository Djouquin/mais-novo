import { Router } from "express";
import mock from "../../mock.json"; // quando oficial, virá do BD
import type { PatientData } from "../../../shared/types/PatientData";
const mockTyped = mock as PatientData[];// deixa adicionar a propriedade MEWS ao mock (mas não escreve nele)

const router = Router();
//rota para fazer o calculo e display dos dados do BD

router.get("/", async (req, res) => {
  mockTyped.forEach((paciente, index) => {
    //calcula e soma todos os valores da tabela para o MEWS
    paciente.MEWS =
      calculatePoints(
        paciente.respiratoryRate,
        intervalosMews.respiratoryRate,
      ) +
      calculatePoints(paciente.bloodPressure, intervalosMews.bloodPressure) +
      calculatePoints(paciente.heartRate, intervalosMews.heartRate) +
      calculatePoints(paciente.temperature, intervalosMews.temperature) +
      calculatePoints(paciente.conscience, intervalosMews.conscience);
  });
  res.json(mockTyped); //substituir pelo mongo/sql
});

export default router;

const intervalosMews: {
  heartRate: [number | null, number | null][];
  respiratoryRate: [number | null, number | null][];
  bloodPressure: [number | null, number | null][];
  temperature: [number | null, number | null][];
  conscience: (string | null)[];
} = {
  heartRate: [
    [null, 40],
    [41, 50],
    [null, null],
    [51, 100],
    [101, 110],
    [111, 119],
    [120, null],
  ],
  respiratoryRate: [
    [null, null],
    [null, 9],
    [null, null],
    [10, 18],
    [19, 25],
    [26, 29],
    [30, null],
  ],
  bloodPressure: [
    [null, 70],
    [71, 80],
    [81, 100],
    [101, 179],
    [null, null],
    [180, 199],
    [200, null],
  ],
  temperature: [
    [null, null],
    [null, 35],
    [null, null],
    [35.1, 37.7],
    [37.8, 38.9],
    [39, null],
    [null, null],
  ],
  conscience: [null, null, null, "A", "V", "P", "U"],
};

function calculatePoints(
  valor: number | string,
  intervalos: [null | number, null | number][] | (string | null)[],
): number {
  if (valor == null) return 0;

  for (let i = 0; i < 7; i++) {
    const intervalo = intervalos[i];

    if (Array.isArray(intervalo)) {
      // para intervalos numericos
      const [min, max] = intervalo;

      if (min == null && max == null) continue;

      if (
        typeof valor === "number" &&
        (min == null || valor >= min) &&
        (max == null || valor <= max)
      ) {
        return Math.abs(i - 3);
      }
    } else {
      //para conceito
      if (intervalo === valor) return Math.abs(i - 3);
    }
  }
  return 0;
}

function getColorBattery(value: any, timestamp: any) {}
