import { AuthResponse } from "@/auth/authTypes";
import { getSessionCookie } from "@/auth/services/sessionService";

export async function requireClientSession(): Promise<AuthResponse | null> {
  const session = (await getSessionCookie()) as AuthResponse | null;
  if (!session?.accessToken || !session.user) return null;
  if (session.user.role !== "CLIENT") return null;
  return session;
}
