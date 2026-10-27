import { format } from "date-fns";
import { mapCalendarToAppointments } from "./calendarMapper";
import { mapDashboardResponse } from "./dashboardMapper";
import {
  mapAvailabilitiesToWeek,
  mapBlocksResponse,
} from "./availabilityMapper";
import type { AppointmentData } from "../schedule/types";
import type { DayAvailability } from "../availability/types";
import type { ProfileFormData } from "../settings/hooks/useProfileForm";
import type { ProfileDetailsData } from "../settings/hooks/useProfileDetailsForm";
import { buildSessionWindow } from "@/utils/sessionSchedule";
import {
  daysUntil,
  formatSessionDatePt,
  formatSessionTimePt,
} from "@/utils/sessionSchedule";

export type SpecialistNextSession = {
  profilePictureUrl?: string;
  name: string;
  description: string;
  phoneNumber: string;
  daysCount: number;
  sessionDate: string;
  sessionTime: string;
};

function appointmentStartIso(appointment: AppointmentData): string {
  const time =
    appointment.startTime.length === 5
      ? `${appointment.startTime}:00`
      : appointment.startTime;
  return `${appointment.date}T${time}`;
}

export function pickNextAppointment(
  appointments: AppointmentData[],
  now = new Date(),
): AppointmentData | null {
  const upcoming = appointments
    .map((item) => ({
      item,
      start: new Date(appointmentStartIso(item)),
    }))
    .filter(({ start }) => !Number.isNaN(start.getTime()) && start >= now)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return upcoming[0]?.item ?? null;
}

export function mapAppointmentToNextSession(
  appointment: AppointmentData,
): SpecialistNextSession {
  const startIso = appointmentStartIso(appointment);
  return {
    name: appointment.patientName,
    description: appointment.type || "Sessão",
    phoneNumber: appointment.phone.replace(/\D/g, "") || appointment.phone,
    daysCount: daysUntil(startIso),
    sessionDate: formatSessionDatePt(startIso),
    sessionTime: formatSessionTimePt(startIso),
  };
}

export async function fetchNextSpecialistSession(): Promise<SpecialistNextSession | null> {
  const appointments = await fetchSpecialistCalendar({
    viewMode: "semana",
    referenceDate: new Date(),
  });
  const next = pickNextAppointment(appointments);
  return next ? mapAppointmentToNextSession(next) : null;
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return data?.error ?? data?.message ?? res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function fetchSpecialistDashboard() {
  const res = await fetch("/api/specialists/me/dashboard", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  return mapDashboardResponse(data);
}

export async function fetchSpecialistCalendar(input: {
  viewMode: "semana" | "dia";
  referenceDate: Date;
}): Promise<AppointmentData[]> {
  const view = input.viewMode === "dia" ? "DAY" : "WEEK";
  const date = format(input.referenceDate, "yyyy-MM-dd");
  const res = await fetch(
    `/api/specialists/me/calendar?view=${view}&date=${date}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  return mapCalendarToAppointments(data);
}

export async function cancelSpecialistSession(sessionId: string) {
  const res = await fetch(`/api/sessions/${sessionId}/cancel`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function rescheduleSpecialistSession(input: {
  sessionId: string;
  date: string;
  time: string;
}) {
  const { startTime, endTime } = buildSessionWindow(input.date, input.time);
  const res = await fetch("/api/sessions/reschedule", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: input.sessionId,
      startTime,
      endTime,
    }),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function fetchWeeklyAvailabilities(): Promise<DayAvailability[]> {
  const res = await fetch("/api/availabilities", { cache: "no-store" });
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  return mapAvailabilitiesToWeek(data);
}

export async function patchAvailabilityDay(
  dayOfWeek: string,
  enabled: boolean,
) {
  const res = await fetch("/api/availabilities/day", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dayOfWeek, enabled }),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function upsertAvailabilityRange(input: {
  backendId?: string;
  dayOfWeek: string;
  start: string;
  end: string;
}) {
  if (input.backendId) {
    const res = await fetch(`/api/availabilities/${input.backendId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startTime: input.start,
        endTime: input.end,
      }),
    });
    if (!res.ok) throw new Error(await parseError(res));
    return;
  }

  const res = await fetch("/api/availabilities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dayOfWeek: input.dayOfWeek,
      startTime: input.start,
      endTime: input.end,
    }),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function deleteAvailability(id: string) {
  const res = await fetch(`/api/availabilities/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function fetchAvailabilityBlocks() {
  const res = await fetch("/api/availabilities/blocks", { cache: "no-store" });
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  return mapBlocksResponse(data);
}

export async function createAvailabilityBlock(body: Record<string, unknown>) {
  const res = await fetch("/api/availabilities/blocks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function deleteAvailabilityBlock(id: string) {
  const res = await fetch(`/api/availabilities/blocks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export type SpecialistSettingsPayload = {
  profile: ProfileFormData;
  details: ProfileDetailsData;
};

export async function fetchSpecialistSettings(): Promise<SpecialistSettingsPayload> {
  const res = await fetch("/api/specialists/me/profile", { cache: "no-store" });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function saveSpecialistPersonalProfile(
  profile: ProfileFormData,
): Promise<void> {
  const res = await fetch("/api/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      cep: profile.cep,
      street: profile.street,
      neighborhood: profile.neighborhood,
      city: profile.city,
      uf: profile.uf,
    }),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function changeSpecialistPassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  const res = await fetch("/api/users/me/password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await parseError(res));
}
