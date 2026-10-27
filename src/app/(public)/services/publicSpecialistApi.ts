import type { SpecialistType } from "../find-specialist/components/SpecialistCard/type";
import { mapBackendDetails, mapBackendListItem } from "./specialistMapper";

type PagedSpecialists = {
  content?: unknown[];
};

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return data?.error ?? data?.message ?? res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function fetchSpecialistsList(params?: {
  page?: number;
  size?: number;
  specialistType?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<SpecialistType[]> {
  const search = new URLSearchParams();
  if (params?.page != null) search.set("page", String(params.page));
  if (params?.size != null) search.set("size", String(params.size));
  if (params?.specialistType) search.set("specialistType", params.specialistType);
  if (params?.minPrice != null) search.set("minPrice", String(params.minPrice));
  if (params?.maxPrice != null) search.set("maxPrice", String(params.maxPrice));

  const qs = search.toString();
  const res = await fetch(`/api/specialists${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new Error("AUTH_REQUIRED");
  }

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  const data = (await res.json()) as PagedSpecialists | unknown[];
  const content = Array.isArray(data) ? data : (data.content ?? []);
  return content.map((item) => mapBackendListItem(item as Parameters<typeof mapBackendListItem>[0]));
}

export async function fetchSpecialistById(
  specialistId: string,
): Promise<SpecialistType | null> {
  const res = await fetch(`/api/specialists/${specialistId}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  const data = await res.json();
  return mapBackendDetails(data);
}

export async function fetchAvailabilityDates(
  specialistId: string,
  year: number,
  month: number,
): Promise<string[]> {
  const res = await fetch(
    `/api/specialists/${specialistId}/availability?year=${year}&month=${month + 1}`,
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.dates ?? []);
}

export async function fetchAvailabilityTimes(
  specialistId: string,
  dateISO: string,
): Promise<string[]> {
  const res = await fetch(
    `/api/specialists/${specialistId}/availability/${dateISO}`,
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  const data = await res.json();
  if (Array.isArray(data)) {
    return data.filter(Boolean);
  }
  if (Array.isArray(data?.times)) {
    return data.times;
  }
  if (Array.isArray(data?.slots)) {
    return data.slots
      .filter((slot: { isBooked?: boolean }) => !slot.isBooked)
      .map((slot: { start?: string }) =>
        slot.start ? slot.start.slice(0, 5) : "",
      )
      .filter(Boolean);
  }
  return [];
}
