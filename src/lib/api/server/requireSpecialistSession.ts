import { AuthResponse } from "@/auth/authTypes";
import { getSessionCookie } from "@/auth/services/sessionService";

export async function requireSpecialistSession(): Promise<AuthResponse | null> {
  const session = (await getSessionCookie()) as AuthResponse | null;
  if (!session?.accessToken || !session.user) return null;
  if (session.user.role !== "SPECIALIST") return null;
  return session;
}
