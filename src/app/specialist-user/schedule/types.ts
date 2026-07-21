export interface AppointmentData {
  id: string;
  patientName: string;
  type: string;
  date: string; // Ex: "2026-05-13"
  startTime: string; // Ex: "09:00"
  durationMinutes: number;
  phone: string; // Ex: "+55 11 91234-5678"
  email: string;
}

export type CalendarViewMode = 'semana' | 'dia';