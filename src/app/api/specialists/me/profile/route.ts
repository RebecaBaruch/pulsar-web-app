import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSpecialistSession } from "@/lib/api/server/requireSpecialistSession";
import {
  mapSpecialistSettings,
  type BackendSpecialistProfile,
} from "@/app/specialist-user/services/settingsProfileMapper";

export async function GET() {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const profileRes = await backendFetch("/api/users/me");
    if (!profileRes.ok) {
      return NextResponse.json(
        { error: await readBackendError(profileRes) },
        { status: profileRes.status },
      );
    }
    const profile = (await profileRes.json()) as BackendSpecialistProfile;

    let detailsExtra: Record<string, unknown> = {};
    const detailsRes = await backendFetch(
      `/api/specialists/${session.user.id}`,
    );
    if (detailsRes.ok) {
      detailsExtra = await detailsRes.json();
    }

    return NextResponse.json(
      mapSpecialistSettings(profile, detailsExtra, session.user),
    );
  } catch (error) {
    console.error("GET specialist profile settings", error);
    return NextResponse.json(
      { error: "Erro ao carregar perfil" },
      { status: 500 },
    );
  }
}
