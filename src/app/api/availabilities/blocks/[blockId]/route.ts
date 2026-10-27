import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSpecialistSession } from "@/lib/api/server/requireSpecialistSession";

type Params = { params: Promise<{ blockId: string }> };

export async function DELETE(_req: Request, { params }: Params) {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { blockId } = await params;

  try {
    const res = await backendFetch(`/api/availabilities/blocks/${blockId}`, {
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
    console.error("DELETE availability block", error);
    return NextResponse.json(
      { error: "Erro ao remover bloqueio" },
      { status: 500 },
    );
  }
}
