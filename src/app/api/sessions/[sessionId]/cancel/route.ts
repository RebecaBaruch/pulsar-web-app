import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSession } from "@/lib/api/server/requireSession";

type Params = { params: Promise<{ sessionId: string }> };

export async function PATCH(_req: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { sessionId } = await params;
  if (!sessionId) {
    return NextResponse.json({ error: "Sessão inválida" }, { status: 400 });
  }

  try {
    const res = await backendFetch(`/api/sessions/${sessionId}/cancel`, {
      method: "PATCH",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH cancel session", error);
    return NextResponse.json(
      { error: "Erro ao cancelar sessão" },
      { status: 500 },
    );
  }
}
