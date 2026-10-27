import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireClientSession } from "@/lib/api/server/requireClientSession";

type Params = { params: Promise<{ specialistId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const session = await requireClientSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { specialistId } = await params;

  try {
    const res = await backendFetch(`/api/specialists/${specialistId}`);
    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET specialist", error);
    return NextResponse.json(
      { error: "Erro ao buscar especialista" },
      { status: 500 },
    );
  }
}
