import { NextResponse } from "next/server";
import { AuthUser } from "@/auth/authTypes";
import { getSessionCookie, setSession } from "@/auth/services/sessionService";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import {
  localUserToUpdatePayload,
  profileToLocalUser,
} from "@/app/client-user/services/profileMapper";
import type { BackendClientProfile } from "@/types/backend";
import type { LocalUser } from "@/app/client-user/profile/hooks/useAutoSaveProfileForm";

async function fetchBackendProfile(): Promise<BackendClientProfile | null> {
  const res = await backendFetch("/api/users/me");
  if (!res.ok) return null;
  return (await res.json()) as BackendClientProfile;
}

function toAuthUser(sessionUser: AuthUser, profile: LocalUser): AuthUser {
  return {
    id: sessionUser.id,
    role: sessionUser.role,
    name: profile.name ?? sessionUser.name,
    email: profile.email ?? sessionUser.email,
    avatarUrl: sessionUser.avatarUrl,
  };
}

export async function GET() {
  const session = await getSessionCookie();

  if (!session?.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const profile = session.accessToken
      ? await fetchBackendProfile()
      : null;

    const user = profileToLocalUser(session.user, profile);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/me", error);
    return NextResponse.json({ user: session.user });
  }
}

export async function PATCH(req: Request) {
  const session = await getSessionCookie();

  if (!session?.user || !session.accessToken) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (session.user.role !== "CLIENT" && session.user.role !== "SPECIALIST") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  try {
    const form = (await req.json()) as LocalUser;
    const payload = localUserToUpdatePayload(form);

    const res = await backendFetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    const profile = await fetchBackendProfile();
    const user = profileToLocalUser(session.user, profile);

    const updatedSession = {
      ...session,
      user: toAuthUser(session.user, user),
    };
    await setSession(updatedSession);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("PATCH /api/me", error);
    return NextResponse.json(
      { error: "Erro ao atualizar perfil" },
      { status: 500 },
    );
  }
}
