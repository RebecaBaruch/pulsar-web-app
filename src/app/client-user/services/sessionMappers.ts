import type { BackendSession, BackendSpecialistDetails } from "@/types/backend";
import { specialistTypeLabel } from "@/utils/specialistTypeLabel";
import {
  formatSessionDatePt,
  formatSessionTimePt,
} from "@/utils/sessionSchedule";
import type { NextSessionCardProps } from "../sessions/components/NextSessionsList/NextSessionCard";
import type { HistorySessionCardProps } from "../sessions/components/HistorySessionsList/HistorySessionCard";

const PLACEHOLDER_AVATAR =
  "https://ui-avatars.com/api/?background=2563eb&color=fff&name=";

const SESSION_LIST_KEYS = [
  "content",
  "sessions",
  "items",
  "upcomingSessions",
  "futureSessions",
  "nextSessions",
  "pastSessions",
  "historySessions",
] as const;

function specialistAvatar(details?: BackendSpecialistDetails): string {
  const b64 = details?.presentation?.base64Image;
  if (b64?.startsWith("data:")) return b64;
  if (b64 && b64.length > 20) return `data:image/jpeg;base64,${b64}`;
  const name = encodeURIComponent(details?.name ?? "Especialista");
  return `${PLACEHOLDER_AVATAR}${name}`;
}

function specialistWhatsApp(details?: BackendSpecialistDetails): string {
  const raw = details?.telephone ?? details?.phone ?? "";
  return raw.replace(/\D/g, "");
}

function readNestedId(
  value: unknown,
  ...fields: string[]
): string {
  if (!value || typeof value !== "object") return "";
  const obj = value as Record<string, unknown>;
  for (const field of fields) {
    const v = obj[field];
    if (v != null && v !== "") return String(v);
  }
  return "";
}

export function extractSessionsRawList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];

  const obj = data as Record<string, unknown>;
  const merged: unknown[] = [];
  let found = false;

  for (const key of SESSION_LIST_KEYS) {
    const value = obj[key];
    if (Array.isArray(value)) {
      merged.push(...value);
      found = true;
    }
  }

  if (found) return merged;

  const single = normalizeSession(obj);
  return single ? [obj] : [];
}

export function extractEmbeddedSpecialist(
  raw: unknown,
): BackendSpecialistDetails | null {
  if (!raw || typeof raw !== "object") return null;
  const s = raw as Record<string, unknown>;
  const nested =
    s.specialist ?? s.specialistUser ?? s.professional ?? s.specialistDetails;

  if (!nested || typeof nested !== "object") return null;
  const specialist = nested as Record<string, unknown>;
  const id = readNestedId(specialist, "id", "specialistId", "userId");
  if (!id) return null;

  const name = typeof specialist.name === "string" ? specialist.name : "";
  return {
    id,
    name,
    telephone:
      readNestedId(specialist, "telephone", "phone", "phoneNumber") || undefined,
    phone:
      readNestedId(specialist, "phone", "telephone", "phoneNumber") || undefined,
    registrationNumber:
      typeof specialist.registrationNumber === "string"
        ? specialist.registrationNumber
        : undefined,
    specialistType:
      specialist.specialistType as BackendSpecialistDetails["specialistType"],
    presentation:
      specialist.presentation as BackendSpecialistDetails["presentation"],
    city: typeof specialist.city === "string" ? specialist.city : undefined,
    state: typeof specialist.state === "string" ? specialist.state : undefined,
  };
}

export function buildSpecialistMapFromRawSessions(
  rawList: unknown[],
): Map<string, BackendSpecialistDetails> {
  const map = new Map<string, BackendSpecialistDetails>();
  for (const raw of rawList) {
    const embedded = extractEmbeddedSpecialist(raw);
    if (embedded?.id) map.set(embedded.id, embedded);
  }
  return map;
}

export function mapSessionToCards(
  sessions: BackendSession[],
  specialistById: Map<string, BackendSpecialistDetails>,
  now = new Date(),
): {
  nextSessions: NextSessionCardProps[];
  historySessions: HistorySessionCardProps[];
} {
  const sorted = [...sessions].sort(
    (a, b) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  const nextSessions: NextSessionCardProps[] = [];
  const historySessions: HistorySessionCardProps[] = [];

  for (const session of sorted) {
    const start = new Date(session.startTime);
    const details = specialistById.get(session.specialistId);
    const status = String(session.status ?? "CONFIRMED").toUpperCase() as BackendSession["status"];
    const isPast = start.getTime() < now.getTime();
    const isHistory =
      isPast || status === "COMPLETED" || status === "CANCELLED";

    const base = {
      sessionId: session.sessionId,
      specialistId: session.specialistId,
      profilePic: specialistAvatar(details),
      specialistName: details?.name ?? "Especialista",
      specialistType: specialistTypeLabel(details?.specialistType),
      credentialCode: details?.registrationNumber ?? "CRP —",
      specialistWpp: specialistWhatsApp(details),
      sessionDate: formatSessionDatePt(session.startTime),
      sessionTime: formatSessionTimePt(session.startTime),
      startTimeIso: session.startTime,
    };

    if (isHistory) {
      historySessions.push(base);
    } else if (
      status === "CONFIRMED" ||
      status === "AWAITING_PAYMENT" ||
      status === "SCHEDULING"
    ) {
      nextSessions.push({ ...base, isPriority: nextSessions.length === 0 });
    }
  }

  return { nextSessions, historySessions };
}

export function parseSessionsPayload(data: unknown): BackendSession[] {
  return extractSessionsRawList(data)
    .map(normalizeSession)
    .filter(Boolean) as BackendSession[];
}

function normalizeSession(raw: unknown): BackendSession | null {
  if (!raw || typeof raw !== "object") return null;
  const s = raw as Record<string, unknown>;

  const sessionId = readNestedId(s, "sessionId", "id");
  const specialistId =
    readNestedId(s, "specialistId", "professionalId") ||
    readNestedId(s.specialist, "id", "specialistId") ||
    readNestedId(s.specialistUser, "id", "specialistId") ||
    readNestedId(s.professional, "id", "specialistId");
  const clientId =
    readNestedId(s, "clientId", "patientId") ||
    readNestedId(s.client, "id", "clientId") ||
    readNestedId(s.clientUser, "id", "clientId");

  const startRaw =
    s.startTime ??
    s.startsAt ??
    s.startAt ??
    s.start ??
    s.scheduledStart ??
    s.scheduledAt;
  const endRaw =
    s.endTime ?? s.endsAt ?? s.endAt ?? s.end ?? s.scheduledEnd;
  const startTime = startRaw != null ? String(startRaw) : "";
  const endTime = endRaw != null ? String(endRaw) : "";

  if (!sessionId || !specialistId || !startTime) return null;

  const statusRaw = s.status;
  const status =
    typeof statusRaw === "string"
      ? (statusRaw.toUpperCase() as BackendSession["status"])
      : undefined;

  return {
    sessionId,
    specialistId,
    clientId,
    startTime,
    endTime: endTime || startTime,
    status,
  };
}