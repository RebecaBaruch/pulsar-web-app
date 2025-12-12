"use server";

import { cookies } from "next/headers";
import { AuthSession } from "@/auth/authTypes";

const SESSION_COOKIE = "pulsar_session";

export async function setSession(session: AuthSession) {
  const cookieStore = await cookies();

  const encoded = encodeURIComponent(JSON.stringify(session));

  cookieStore.set(SESSION_COOKIE, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) return null;

  try {
    const decoded = decodeURIComponent(raw);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
