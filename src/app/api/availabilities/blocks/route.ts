import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSpecialistSession } from "@/lib/api/server/requireSpecialistSession";

export async function GET() {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const res = await backendFetch("/api/availabilities/blocks");
    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }
    return NextResponse.json(await res.json());
  } catch (error) {
    console.error("GET availability blocks", error);
    return NextResponse.json(
      { error: "Erro ao carregar bloqueios" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const res = await backendFetch("/api/availabilities/blocks", {
      method: "POST",
      body: JSON.stringify({
        ...body,
        specialistId: body.specialistId ?? session.user.id,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    return NextResponse.json(await res.json(), { status: 201 });
  } catch (error) {
    console.error("POST availability block", error);
    return NextResponse.json(
      { error: "Erro ao criar bloqueio" },
      { status: 500 },
    );
  }
}
