import { getSessionCookie } from "@/auth/services/sessionService";

export function getBackendUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return url.replace(/\/$/, "");
}

export async function backendFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const session = await getSessionCookie();
  const token = session?.accessToken as string | undefined;

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${getBackendUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

export async function readBackendError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;
    return JSON.stringify(data);
  } catch {
    return res.statusText || "Erro desconhecido";
  }
}
