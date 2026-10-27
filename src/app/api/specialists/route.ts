import { NextRequest, NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSession } from "@/lib/api/server/requireSession";

export async function GET(req: NextRequest) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json(
      { error: "Faça login para ver especialistas" },
      { status: 401 },
    );
  }

  const { searchParams } = req.nextUrl;
  const query = searchParams.toString();
  const path = query ? `/api/specialists?${query}` : "/api/specialists";

  try {
    const res = await backendFetch(path);
    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/specialists", error);
    return NextResponse.json(
      { error: "Erro ao listar especialistas" },
      { status: 500 },
    );
  }
}
