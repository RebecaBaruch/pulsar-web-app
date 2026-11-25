import { NextResponse } from "next/server";
import { AuthUser } from "@/auth/authTypes";
import {
  getSessionAccessToken,
  getSessionCookie,
  setSession,
} from "@/auth/services/sessionService";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import {
  coerceProfileUpdateBody,
  isBackendClientProfilePatch,
  localUserToUpdatePayload,
  mergeCpfFromUserIdentity,
  parseBackendClientProfile,
  profileToLocalUser,
} from "@/app/client-user/services/profileMapper";
import type { BackendClientProfile } from "@/types/backend";
import type { LocalUser } from "@/app/client-user/profile/profile-types";
import {
  profileFormCanSave,
  validateProfileForm,
} from "@/app/client-user/profile/profile-form-validation";

async function fetchBackendProfile(
  userId: string,
): Promise<BackendClientProfile | null> {
  const res = await backendFetch("/api/users/me");
  if (!res.ok) return null;
  const json: unknown = await res.json();
  let profile = parseBackendClientProfile(json);

  if (!profile?.cpf?.trim() && userId) {
    const userRes = await backendFetch(`/api/users/${userId}`);
    if (userRes.ok) {
      profile = mergeCpfFromUserIdentity(profile, await userRes.json());
    }
  }

  return profile;
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

  if (!session?.user || !getSessionAccessToken(session)) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const profile = await fetchBackendProfile(session.user.id);
    const user = profileToLocalUser(session.user, profile);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/me", error);
    return NextResponse.json({ user: session.user });
  }
}

export async function PATCH(req: Request) {
  const session = await getSessionCookie();

  if (!session?.user || !getSessionAccessToken(session)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (session.user.role !== "CLIENT" && session.user.role !== "SPECIALIST") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  try {
    const body: unknown = await req.json();
    const form = coerceProfileUpdateBody(body);

    const fieldErrors = validateProfileForm(form);
    if (!profileFormCanSave(form)) {
      const firstError =
        Object.values(fieldErrors).find(Boolean) ??
        "Corrija os campos destacados antes de salvar.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const payload = isBackendClientProfilePatch(body)
      ? body
      : localUserToUpdatePayload(form);

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { error: "Nenhum dado válido para atualizar." },
        { status: 400 },
      );
    }

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

    const profile = await fetchBackendProfile(session.user.id);
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
