import { cookies } from "next/headers";
import { AuthResponse } from "../authTypes";

const COOKIE_KEY = "auth_session";

export async function getSessionCookie() {
  const cookieStore = cookies();
  const session = (await cookieStore).get(COOKIE_KEY)?.value ?? null;
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export async function setSession(authData: AuthResponse) {
  const cookieStore = cookies();
  (await cookieStore).set(COOKIE_KEY, JSON.stringify(authData), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: authData.expiresIn,
  });
}

export function clearSession() {
  if (typeof window !== "undefined") {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0`;
  }
}
