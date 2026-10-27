import type { DayAvailability } from "../availability/types";

const DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

const DAY_LABEL: Record<(typeof DAY_ORDER)[number], string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

type BackendAvailability = {
  id?: string;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
  enabled?: boolean;
};

export type DayAvailabilityExtended = DayAvailability & {
  dayOfWeek: string;
};

function defaultWeek(): DayAvailabilityExtended[] {
  return DAY_ORDER.map((day, index) => ({
    dayName: DAY_LABEL[day],
    dayOfWeek: day,
    enabled: index < 5,
    isOpen: index === 0,
    ranges: [
      {
        id: `default-${day}`,
        start: "09:00",
        end: "17:00",
      },
    ],
  }));
}

function normalizeTime(value?: string): string {
  if (!value) return "09:00";
  if (value.includes("T")) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) {
      return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    }
  }
  return value.slice(0, 5);
}

export function mapAvailabilitiesToWeek(
  data: unknown,
): DayAvailabilityExtended[] {
  const base = defaultWeek();

  const list = Array.isArray(data)
    ? data
    : data && typeof data === "object"
      ? ((data as Record<string, unknown>).content ??
        (data as Record<string, unknown>).availabilities ??
        [])
      : [];

  if (!Array.isArray(list) || list.length === 0) {
    return base;
  }

  const byDay = new Map<string, BackendAvailability[]>();
  for (const raw of list) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as BackendAvailability;
    const day = item.dayOfWeek;
    if (!day) continue;
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day)!.push(item);
  }

  return DAY_ORDER.map((dayKey, index) => {
    const entries = byDay.get(dayKey) ?? [];
    const enabled =
      entries.length > 0
        ? entries.some((e) => e.enabled !== false)
        : index < 5;

    return {
      dayName: DAY_LABEL[dayKey],
      dayOfWeek: dayKey,
      enabled,
      isOpen: index === 0 && enabled,
      ranges:
        entries.length > 0
          ? entries.map((entry, idx) => ({
              id: entry.id ?? `${dayKey}-${idx}`,
              backendId: entry.id,
              start: normalizeTime(entry.startTime),
              end: normalizeTime(entry.endTime),
            }))
          : [
              {
                id: `empty-${dayKey}`,
                start: "09:00",
                end: "17:00",
              },
            ],
    };
  });
}

export function mapBlocksResponse(data: unknown) {
  const list = Array.isArray(data)
    ? data
    : data && typeof data === "object"
      ? ((data as Record<string, unknown>).content ??
        (data as Record<string, unknown>).blocks ??
        [])
      : [];

  if (!Array.isArray(list)) return [];

  const mapped: Array<{
    id: string;
    type: string;
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
    reason: string;
  }> = [];

  for (const [index, raw] of list.entries()) {
    if (!raw || typeof raw !== "object") continue;
    const b = raw as Record<string, unknown>;
    mapped.push({
      id: String(b.id ?? index),
      type: String(b.type ?? "Especifico"),
      startDate: String(b.startDate ?? b.date ?? "").slice(0, 10),
      endDate: String(b.endDate ?? b.startDate ?? b.date ?? "").slice(0, 10),
      startTime: b.startTime ? normalizeTime(String(b.startTime)) : undefined,
      endTime: b.endTime ? normalizeTime(String(b.endTime)) : undefined,
      reason: String(b.reason ?? b.description ?? "Bloqueio"),
    });
  }

  return mapped;
}
