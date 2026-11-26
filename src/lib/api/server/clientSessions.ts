import { backendFetch, readBackendError } from "./backendClient";
import {
  extractSessionsRawList,
  buildSpecialistMapFromRawSessions,
  mapClientSessionsPayload,
  parseSessionsPayload,
} from "@/app/client-user/services/sessionMappers";
import type { BackendSpecialistDetails } from "@/types/backend";

const CLIENT_SESSIONS_PATH = "/api/clients/me/sessions";

export class ClientSessionsFetchError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ClientSessionsFetchError";
  }
}

export async function fetchClientSessionsFromBackend() {
  const res = await backendFetch(CLIENT_SESSIONS_PATH);

  if (res.status === 401 || res.status === 403) {
    throw new ClientSessionsFetchError(
      "Sessão expirada ou sem permissão.",
      401,
    );
  }

  if (!res.ok) {
    throw new ClientSessionsFetchError(
      (await readBackendError(res)) ||
        "Não foi possível carregar suas sessões no servidor.",
      res.status >= 400 && res.status < 600 ? res.status : 502,
    );
  }

  const data = await res.json();
  const rawList = extractSessionsRawList(data);
  const sessions = parseSessionsPayload(data);
  const specialistById = buildSpecialistMapFromRawSessions(rawList);

  const ids = [...new Set(sessions.map((s) => s.specialistId))];
  const fetched = await fetchSpecialistsMap(ids);
  for (const [id, details] of fetched) {
    const existing = specialistById.get(id);
    specialistById.set(id, existing ? { ...existing, ...details } : details);
  }

  return mapClientSessionsPayload(data, specialistById);
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
      const data = (await res.json()) as BackendSpecialistDetails & {
        telephone?: string;
        phone?: string;
      };
      return { id, data };
    }),
  );

  for (const item of results) {
    if (item?.data) map.set(item.id, item.data);
  }

  return map;
}
