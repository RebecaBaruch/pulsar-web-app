import { backendFetch } from "./backendClient";
import {
  parseSessionsPayload,
  mapSessionToCards,
} from "@/app/client-user/services/sessionMappers";
import type { BackendSpecialistDetails } from "@/types/backend";

const SESSION_LIST_PATHS = [
  "/api/sessions/client/me",
  "/api/sessions/me",
  "/api/clients/me/sessions",
];

export async function fetchClientSessionsFromBackend() {
  for (const path of SESSION_LIST_PATHS) {
    const res = await backendFetch(path);
    if (res.status === 404) continue;
    if (!res.ok) continue;

    const data = await res.json();
    const sessions = parseSessionsPayload(data);
    if (sessions.length === 0 && path !== SESSION_LIST_PATHS.at(-1)) {
      continue;
    }

    const specialistIds = [...new Set(sessions.map((s) => s.specialistId))];
    const specialistById = await fetchSpecialistsMap(specialistIds);
    return mapSessionToCards(sessions, specialistById);
  }

  return { nextSessions: [], historySessions: [] };
}

async function fetchSpecialistsMap(
  ids: string[],
): Promise<Map<string, BackendSpecialistDetails>> {
  const map = new Map<string, BackendSpecialistDetails>();
  if (ids.length === 0) return map;

  const results = await Promise.all(
    ids.map(async (id) => {
      const res = await backendFetch(`/api/specialists/${id}`);
      if (!res.ok) return null;
      const data = (await res.json()) as BackendSpecialistDetails;
      return { id, data };
    }),
  );

  for (const item of results) {
    if (item?.data) map.set(item.id, item.data);
  }

  return map;
}
