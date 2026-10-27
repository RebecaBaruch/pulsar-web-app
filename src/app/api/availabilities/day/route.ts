import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSpecialistSession } from "@/lib/api/server/requireSpecialistSession";

export async function PATCH(req: Request) {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const res = await backendFetch("/api/availabilities", {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH availability day", error);
    return NextResponse.json(
      { error: "Erro ao atualizar dia" },
      { status: 500 },
    );
  }
}
