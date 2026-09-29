import { cookies } from "next/headers";
import { AuthResponse } from "../authTypes";

export const AUTH_SESSION_KEY = "auth_session";

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
