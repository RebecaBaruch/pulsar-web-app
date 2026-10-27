import { format, parseISO } from "date-fns";
import { AppointmentData } from "../schedule/types";

function extractArray(data: unknown, keys: string[]): unknown[] {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];
  const obj = data as Record<string, unknown>;
  for (const key of keys) {
    const value = obj[key];
    if (Array.isArray(value)) return value;
  }
  return [];
}

function parseStartFields(raw: Record<string, unknown>): {
  date: string;
  startTime: string;
  durationMinutes: number;
} | null {
  const startRaw = raw.startTime ?? raw.start ?? raw.scheduledStart;
  if (!startRaw) return null;

  const endRaw = raw.endTime ?? raw.end ?? raw.scheduledEnd;

  try {
    const start =
      typeof startRaw === "string" && startRaw.includes("T")
        ? parseISO(startRaw)
        : new Date(String(startRaw));
    if (Number.isNaN(start.getTime())) return null;

    let durationMinutes = 50;
    if (endRaw) {
      const end =
        typeof endRaw === "string" && String(endRaw).includes("T")
          ? parseISO(String(endRaw))
          : new Date(String(endRaw));
      if (!Number.isNaN(end.getTime())) {
        durationMinutes = Math.max(
          15,
          Math.round((end.getTime() - start.getTime()) / 60_000),
        );
      }
    } else if (raw.durationMinutes != null) {
      durationMinutes = Number(raw.durationMinutes);
    }

    return {
      date: format(start, "yyyy-MM-dd"),
      startTime: format(start, "HH:mm"),
      durationMinutes,
    };
  } catch {
    return null;
  }
}

function readClientName(raw: Record<string, unknown>): string {
  const client = raw.client ?? raw.clientUser ?? raw.patient ?? raw.user;
  if (client && typeof client === "object") {
    const c = client as Record<string, unknown>;
    if (typeof c.name === "string") return c.name;
  }
  if (typeof raw.clientName === "string") return raw.clientName;
  if (typeof raw.patientName === "string") return raw.patientName;
  return "Cliente";
}

function readContact(raw: Record<string, unknown>): { phone: string; email: string } {
  const client = raw.client ?? raw.clientUser ?? raw.patient;
  if (client && typeof client === "object") {
    const c = client as Record<string, unknown>;
    return {
      phone: String(c.telephone ?? c.phone ?? c.phoneNumber ?? ""),
      email: String(c.email ?? ""),
    };
  }
  return {
    phone: String(raw.clientPhone ?? raw.phone ?? ""),
    email: String(raw.clientEmail ?? raw.email ?? ""),
  };
}

function normalizeAppointment(raw: unknown): AppointmentData | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const id = String(item.sessionId ?? item.id ?? "");
  if (!id) return null;

  const when = parseStartFields(item);
  if (!when) return null;

  const contact = readContact(item);
  const status = String(item.status ?? "").toUpperCase();
  if (status === "CANCELLED") return null;

  return {
    id,
    patientName: readClientName(item),
    type: String(item.type ?? item.sessionType ?? "Sessão"),
    date: when.date,
    startTime: when.startTime,
    durationMinutes: when.durationMinutes,
    phone: contact.phone,
    email: contact.email,
  };
}

export function mapCalendarToAppointments(data: unknown): AppointmentData[] {
  const list = extractArray(data, [
    "sessions",
    "appointments",
    "events",
    "items",
    "content",
    "calendarEntries",
  ]);

  const mapped = list
    .map(normalizeAppointment)
    .filter(Boolean) as AppointmentData[];

  if (mapped.length > 0) return mapped;

  const single = normalizeAppointment(data);
  return single ? [single] : [];
}
