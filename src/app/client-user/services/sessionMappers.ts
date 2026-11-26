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
  "history",
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

function asUnknownArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function isClientSessionsResponse(
  data: unknown,
): data is { futureSessions?: unknown; history?: unknown } {
  return (
    !!data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    ("futureSessions" in data || "history" in data)
  );
}

export function extractClientSessionLists(data: unknown): {
  future: unknown[];
  history: unknown[];
} {
  if (isClientSessionsResponse(data)) {
    return {
      future: asUnknownArray(data.futureSessions),
      history: asUnknownArray(data.history),
    };
  }

  return { future: extractSessionsRawList(data), history: [] };
}

export function extractSessionsRawList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];

  const obj = data as Record<string, unknown>;

  if (isClientSessionsResponse(obj)) {
    return [
      ...asUnknownArray(obj.futureSessions),
      ...asUnknownArray(obj.history),
    ];
  }

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

  if (nested && typeof nested === "object") {
    const specialist = nested as Record<string, unknown>;
    const nestedId = readNestedId(specialist, "id", "specialistId", "userId");
    if (nestedId) {
      const name = typeof specialist.name === "string" ? specialist.name : "";
      return {
        id: nestedId,
        name,
        telephone:
          readNestedId(specialist, "telephone", "phone", "phoneNumber") ||
          undefined,
        phone:
          readNestedId(specialist, "phone", "telephone", "phoneNumber") ||
          undefined,
        registrationNumber:
          typeof specialist.registrationNumber === "string"
            ? specialist.registrationNumber
            : undefined,
        specialistType:
          specialist.specialistType as BackendSpecialistDetails["specialistType"],
        presentation:
          specialist.presentation as BackendSpecialistDetails["presentation"],
        city: typeof specialist.city === "string" ? specialist.city : undefined,
        state:
          typeof specialist.state === "string" ? specialist.state : undefined,
      };
    }
  }

  const id = readNestedId(s, "specialistId");
  const name = typeof s.specialistName === "string" ? s.specialistName : "";
  if (!id || !name) return null;

  return {
    id,
    name,
    registrationNumber:
      typeof s.registrationNumber === "string"
        ? s.registrationNumber
        : undefined,
    specialistType:
      s.specialistType as BackendSpecialistDetails["specialistType"],
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

function toCardBase(
  session: BackendSession,
  details?: BackendSpecialistDetails,
) {
  return {
    sessionId: session.sessionId,
    specialistId: session.specialistId,
    profilePic: specialistAvatar(details),
    specialistName: details?.name || session.specialistName || "Especialista",
    specialistType: specialistTypeLabel(
      details?.specialistType ?? session.specialistType,
    ),
    credentialCode:
      details?.registrationNumber || session.registrationNumber || "CRP —",
    specialistWpp: specialistWhatsApp(details),
    sessionDate: formatSessionDatePt(session.startTime),
    sessionTime: formatSessionTimePt(session.startTime),
    startTimeIso: session.startTime,
  };
}

export function mapSplitSessionsToCards(
  futureSessions: BackendSession[],
  historySessionsRaw: BackendSession[],
  specialistById: Map<string, BackendSpecialistDetails>,
): {
  nextSessions: NextSessionCardProps[];
  historySessions: HistorySessionCardProps[];
} {
  const nextSessions = futureSessions.map((session, index) => ({
    ...toCardBase(session, specialistById.get(session.specialistId)),
    isPriority: index === 0,
  }));

  const historySessions = historySessionsRaw.map((session) =>
    toCardBase(session, specialistById.get(session.specialistId)),
  );

  return { nextSessions, historySessions };
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

    const base = toCardBase(session, details);

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

export function mapClientSessionsPayload(
  data: unknown,
  specialistById: Map<string, BackendSpecialistDetails>,
): {
  nextSessions: NextSessionCardProps[];
  historySessions: HistorySessionCardProps[];
} {
  if (isClientSessionsResponse(data)) {
    const { future, history } = extractClientSessionLists(data);
    return mapSplitSessionsToCards(
      future.map(normalizeSession).filter(Boolean) as BackendSession[],
      history.map(normalizeSession).filter(Boolean) as BackendSession[],
      specialistById,
    );
  }

  return mapSessionToCards(parseSessionsPayload(data), specialistById);
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
    specialistName:
      typeof s.specialistName === "string" ? s.specialistName : undefined,
    registrationNumber:
      typeof s.registrationNumber === "string"
        ? s.registrationNumber
        : undefined,
    specialistType:
      typeof s.specialistType === "string"
        ? (s.specialistType as BackendSession["specialistType"])
        : undefined,
  };
}