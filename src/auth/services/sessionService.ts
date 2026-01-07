import { cookies } from "next/headers";
import { AuthResponse } from "../authTypes";

const COOKIE_KEY = "auth_session";

// Server-side: pega o cookie
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

// Server-side: salva o cookie (usado no server action)
export async function setSession(authData: AuthResponse) {
  const cookieStore = cookies();
  (await cookieStore).set(COOKIE_KEY, JSON.stringify(authData), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: authData.expiresIn,
  });
}

// Client-side: remover
export function clearSession() {
  if (typeof window !== "undefined") {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0`;
  }
}
