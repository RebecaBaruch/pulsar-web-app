import { NextRequest, NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSession } from "@/lib/api/server/requireSession";

type Params = { params: Promise<{ specialistId: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { specialistId } = await params;
  const year = req.nextUrl.searchParams.get("year");
  const month = req.nextUrl.searchParams.get("month");

  const paths = [
    year && month
      ? `/api/specialists/${specialistId}/availability?year=${year}&month=${month}`
      : null,
    `/api/specialists/${specialistId}/availability`,
  ].filter(Boolean) as string[];

  try {
    for (const path of paths) {
      const res = await backendFetch(path);
      if (res.status === 404) continue;
      if (!res.ok) {
        return NextResponse.json(
          { error: await readBackendError(res) },
          { status: res.status },
        );
      }
      const data = await res.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ dates: [] });
  } catch (error) {
    console.error("GET availability month", error);
    return NextResponse.json(
      { error: "Erro ao buscar disponibilidade" },
      { status: 500 },
    );
  }
}
