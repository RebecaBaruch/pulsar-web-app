import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSpecialistSession } from "@/lib/api/server/requireSpecialistSession";

type Params = { params: Promise<{ availabilityId: string }> };

export async function PUT(req: Request, { params }: Params) {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { availabilityId } = await params;

  try {
    const body = await req.json();
    const res = await backendFetch(`/api/availabilities/${availabilityId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    return NextResponse.json(await res.json().catch(() => ({ ok: true })));
  } catch (error) {
    console.error("PUT availability", error);
    return NextResponse.json(
      { error: "Erro ao atualizar disponibilidade" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { availabilityId } = await params;

  try {
    const res = await backendFetch(`/api/availabilities/${availabilityId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE availability", error);
    return NextResponse.json(
      { error: "Erro ao remover disponibilidade" },
      { status: 500 },
    );
  }
}
