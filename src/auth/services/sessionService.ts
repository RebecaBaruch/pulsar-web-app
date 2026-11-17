import { cookies } from "next/headers";
import { AuthResponse } from "../authTypes";

export const AUTH_SESSION_KEY = "auth_session";

type SessionWithToken = {
  accessToken?: string;
  token?: string;
};

/** JWT armazenado no cookie — alguns logins do backend enviam só `token`. */
export function getSessionAccessToken(
  session: SessionWithToken | null | undefined,
): string | undefined {
  if (!session) return undefined;
  const token = session.accessToken ?? session.token;
  return typeof token === "string" && token.trim() ? token.trim() : undefined;
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_SESSION_KEY)?.value ?? null;
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export async function setSession(authData: AuthResponse) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_SESSION_KEY, JSON.stringify(authData), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: authData.expiresIn,
  });
}

export function clearSession() {
  if (typeof window !== "undefined") {
    document.cookie = `${AUTH_SESSION_KEY}=; path=/; max-age=0`;
  }
}
