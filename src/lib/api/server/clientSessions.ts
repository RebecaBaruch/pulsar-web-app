import { backendFetch, readBackendError } from "./backendClient";
import {
  parseSessionsPayload,
  mapSessionToCards,
  extractSessionsRawList,
  buildSpecialistMapFromRawSessions,
} from "@/app/client-user/services/sessionMappers";
import type { BackendSpecialistDetails } from "@/types/backend";

/** Ordem de tentativa até o pulsar-api expor listagem do cliente de forma estável. */
const SESSION_LIST_PATHS = [
  "/api/sessions/client/me",
  "/api/sessions/me",
  "/api/clients/me/sessions",
] as const;

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
  let sawAuthFailure = false;
  let notFoundCount = 0;
  const backendFailures: string[] = [];

  for (const path of SESSION_LIST_PATHS) {
    const res = await backendFetch(path);

    if (res.status === 404) {
      notFoundCount++;
      continue;
    }
    if (res.status === 401 || res.status === 403) {
      sawAuthFailure = true;
      continue;
    }
    if (!res.ok) {
      backendFailures.push(
        `${path}: ${res.status} ${await readBackendError(res)}`,
      );
      continue;
    }

    const data = await res.json();
    const rawList = extractSessionsRawList(data);
    const sessions = parseSessionsPayload(data);

    if (sessions.length === 0 && path !== SESSION_LIST_PATHS.at(-1)) {
      continue;
    }

    return mapSessionsToCardsResponse(sessions, rawList);
  }

  if (sawAuthFailure && notFoundCount === SESSION_LIST_PATHS.length) {
    throw new ClientSessionsFetchError(
      "Sessão expirada ou sem permissão.",
      401,
    );
  }

  if (notFoundCount === SESSION_LIST_PATHS.length) {
    throw new ClientSessionsFetchError(
      "O servidor ainda não expõe a listagem de sessões do cliente.",
      503,
    );
  }

  if (backendFailures.length > 0) {
    throw new ClientSessionsFetchError(
      "Não foi possível carregar suas sessões no servidor.",
      502,
    );
  }

  if (sawAuthFailure) {
    throw new ClientSessionsFetchError(
      "Sessão expirada ou sem permissão.",
      401,
    );
  }

  throw new ClientSessionsFetchError(
    "Não foi possível carregar suas sessões.",
    503,
  );
}

async function mapSessionsToCardsResponse(
  sessions: ReturnType<typeof parseSessionsPayload>,
  rawList: unknown[],
) {
  const specialistById = buildSpecialistMapFromRawSessions(rawList);
  const missingIds = [...new Set(sessions.map((s) => s.specialistId))].filter(
    (id) => !specialistById.has(id),
  );

  const fetched = await fetchSpecialistsMap(missingIds);
  for (const [id, details] of fetched) {
    specialistById.set(id, details);
  }

  return mapSessionToCards(sessions, specialistById);
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