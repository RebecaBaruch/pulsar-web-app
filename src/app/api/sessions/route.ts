import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireClientSession } from "@/lib/api/server/requireClientSession";
import { fetchClientSessionsFromBackend } from "@/lib/api/server/clientSessions";
import type { ScheduleSessionRequest } from "@/types/backend";

export async function GET() {
  const session = await requireClientSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const data = await fetchClientSessionsFromBackend();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/sessions", error);
    return NextResponse.json(
      { error: "Erro ao carregar sessões" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await requireClientSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Omit<
      ScheduleSessionRequest,
      "clientId"
    >;

    if (!body.specialistId || !body.startTime || !body.endTime) {
      return NextResponse.json(
        { error: "Dados de agendamento incompletos" },
        { status: 400 },
      );
    }

    const payload: ScheduleSessionRequest = {
      ...body,
      clientId: session.user.id,
    };

    const res = await backendFetch("/api/sessions", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/sessions", error);
    return NextResponse.json(
      { error: "Erro ao agendar sessão" },
      { status: 500 },
    );
  }
}
