import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSession } from "@/lib/api/server/requireSession";

export async function PUT(req: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const res = await backendFetch("/api/sessions/reschedule", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (error) {
    console.error("PUT reschedule", error);
    return NextResponse.json(
      { error: "Erro ao reagendar sessão" },
      { status: 500 },
    );
  }
}
