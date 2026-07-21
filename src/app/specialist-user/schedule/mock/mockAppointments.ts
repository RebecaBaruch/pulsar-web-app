import { AppointmentData } from '../types';

// Helper to keep dates dynamic relative to today's date if needed
const todayStr = new Date().toISOString().split('T')[0];

export const mockAppointments: AppointmentData[] = [
  {
    id: "1",
    patientName: "Ana Silva",
    type: "Terapia Individual",
    date: "2026-06-23",
    startTime: "09:00",
    durationMinutes: 50,
    phone: "5511912345678",
    email: "ana.silva@outlook.com",
  },
  {
    id: "2",
    patientName: "Daniel Oliveira",
    type: "Terapia Individual",
    date: "2026-06-24",
    startTime: "09:00",
    durationMinutes: 50,
    phone: "5511987654321",
    email: "daniel.oliveira@gmail.com",
  },
  {
    id: "3",
    patientName: "Fernando Lima",
    type: "Terapia Individual",
    date: todayStr, // Today
    startTime: "10:00",
    durationMinutes: 50,
    phone: "5513998018161",
    email: "fernando.lima@outlook.com",
  },
  {
    id: "4",
    patientName: "Beatriz Mello",
    type: "Terapia de Casal",
    date: todayStr, // Today - Testing multiple appointments on the same day
    startTime: "11:00",
    durationMinutes: 80,
    phone: "5511977654321",
    email: "beatriz.mello@yahoo.com.br",
  },
  {
    id: "5",
    patientName: "Carlos Henrique",
    type: "Avaliação Psicológica",
    date: "2026-06-25",
    startTime: "14:00",
    durationMinutes: 50,
    phone: "5521996543210",
    email: "carlos.henrique@hotmail.com",
  },
  {
    id: "6",
    patientName: "Juliana Costa",
    type: "Terapia Individual",
    date: "2026-06-26",
    startTime: "16:00",
    durationMinutes: 50,
    phone: "5511933445566",
    email: "ju.costa@live.com",
  },
  {
    id: "7",
    patientName: "Ricardo Augusto",
    type: "Terapia Individual",
    date: todayStr, // Today - Evening session to test real-time scrolling boundaries
    startTime: "19:00",
    durationMinutes: 50,
    phone: "5513981223344",
    email: "ricardo.augusto@outlook.com",
  },
  {
    id: "8",
    patientName: "Mariana Souza",
    type: "Terapia de Casal",
    date: "2026-06-27",
    startTime: "09:00",
    durationMinutes: 80,
    phone: "5511922334455",
    email: "mariana.souza@gmail.com",
  }
];