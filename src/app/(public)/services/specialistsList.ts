import type { SpecialistType } from "../find-specialist/components/SpecialistCard/type";
import type { BackendSpecialistDetails } from "@/types/backend";
import { mapBackendListItem } from "./specialistMapper";

type BackendListItem = Parameters<typeof mapBackendListItem>[0];

export function parseSpecialistsListResponse(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.content)) return record.content;
    if (Array.isArray(record.data)) return record.data;
    if (Array.isArray(record.items)) return record.items;
  }
  return [];
}

function normalizeListItem(raw: unknown): BackendListItem | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const id = String(r.id ?? r.specialistId ?? r.userId ?? "").trim();
  const name = String(r.name ?? "").trim();
  if (!id || !name) return null;

  const presentation = r.presentation as
    | BackendSpecialistDetails["presentation"]
    | undefined;

  return {
    id,
    name,
    city: typeof r.city === "string" ? r.city : undefined,
    state: typeof r.state === "string" ? r.state : undefined,
    price: typeof r.price === "number" ? r.price : undefined,
    sessionsCompleted:
      typeof r.sessionsCompleted === "number" ? r.sessionsCompleted : undefined,
    specialistType: r.specialistType as BackendListItem["specialistType"],
    presentation,
  };
}

export function specialistsFromApiPayload(data: unknown): SpecialistType[] {
  return parseSpecialistsListResponse(data)
    .map(normalizeListItem)
    .filter((item): item is BackendListItem => item != null)
    .map(mapBackendListItem);
}