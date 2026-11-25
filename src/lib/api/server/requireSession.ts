import { AuthResponse } from "@/auth/authTypes";
import {
  getSessionAccessToken,
  getSessionCookie,
} from "@/auth/services/sessionService";

/** Authenticated session (any role) with a valid access token. */
export async function requireSession(): Promise<AuthResponse | null> {
  const session = (await getSessionCookie()) as AuthResponse | null;
  if (!session?.user || !getSessionAccessToken(session)) return null;
  return session;
}
