import { AppointmentData } from "../types";

const currentDate =  new Date();

export const mockAppointments: AppointmentData[] = [
  {
    id: "1",
    patientName: "Ana Silva",
    type: "Terapia Individual",
    date: "2026-06-23",
    startTime: "09:00",
    durationMinutes: 50,
    phone: "+55 11 91234-5678",
    email: "ana@email.com",
  },
  {
    id: "2",
    patientName: "Daniel Oliveira",
    type: "Terapia Individual",
    date: "2026-06-24",
    startTime: "09:00",
    durationMinutes: 50,
    phone: "+55 11 98765-4321",
    email: "daniel@email.com",
  },
  {
    id: "3",
    patientName: "Fernando Lima Lima",
    type: "Terapia Individual",
    date: currentDate.toISOString().split("T")[0], // Data atual
    startTime: "10:00",
    durationMinutes: 50,
    phone: "+55 11 99876-5432",
    email: "fernando@email.com",
  },
];