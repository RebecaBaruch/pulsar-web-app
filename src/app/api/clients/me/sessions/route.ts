import { NextResponse } from "next/server";
import { requireClientSession } from "@/lib/api/server/requireClientSession";
import {
  ClientSessionsFetchError,
  fetchClientSessionsFromBackend,
} from "@/lib/api/server/clientSessions";

export async function GET() {
  const session = await requireClientSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const data = await fetchClientSessionsFromBackend();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ClientSessionsFetchError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("GET /api/clients/me/sessions", error);
    return NextResponse.json(
      { error: "Erro ao carregar sessões" },
      { status: 500 },
    );
  }
}
