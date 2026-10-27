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

function specialistAvatar(details?: BackendSpecialistDetails): string {
  const b64 = details?.presentation?.base64Image;
  if (b64?.startsWith("data:")) return b64;
  if (b64 && b64.length > 20) return `data:image/jpeg;base64,${b64}`;
  const name = encodeURIComponent(details?.name ?? "Especialista");
  return `${PLACEHOLDER_AVATAR}${name}`;
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
    const status = session.status ?? "CONFIRMED";
    const isPast = start.getTime() < now.getTime();
    const isHistory =
      isPast ||
      status === "COMPLETED" ||
      status === "CANCELLED";

    const base = {
      specialistId: session.specialistId,
      profilePic: specialistAvatar(details),
      specialistName: details?.name ?? "Especialista",
      specialistType: specialistTypeLabel(details?.specialistType),
      credentialCode: details?.registrationNumber ?? "CRP —",
      specialistWpp: "",
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
  if (Array.isArray(data)) {
    return data.map(normalizeSession).filter(Boolean) as BackendSession[];
  }
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const content = obj.content ?? obj.sessions ?? obj.items;
    if (Array.isArray(content)) {
      return content.map(normalizeSession).filter(Boolean) as BackendSession[];
    }
    const single = normalizeSession(obj);
    if (single) return [single];
  }
  return [];
}

function normalizeSession(raw: unknown): BackendSession | null {
  if (!raw || typeof raw !== "object") return null;
  const s = raw as Record<string, unknown>;
  const sessionId = String(s.sessionId ?? s.id ?? "");
  const specialistId = String(s.specialistId ?? "");
  const clientId = String(s.clientId ?? "");
  const startTime = String(s.startTime ?? "");
  const endTime = String(s.endTime ?? "");
  if (!sessionId || !specialistId || !startTime) return null;
  return {
    sessionId,
    specialistId,
    clientId,
    startTime,
    endTime: endTime || startTime,
    status: s.status as BackendSession["status"],
  };
}
