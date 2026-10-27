import { NextRequest, NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSpecialistSession } from "@/lib/api/server/requireSpecialistSession";

export async function GET(req: NextRequest) {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const view = req.nextUrl.searchParams.get("view") ?? "WEEK";
  const date = req.nextUrl.searchParams.get("date");
  const query = new URLSearchParams({ view });
  if (date) query.set("date", date);

  try {
    const res = await backendFetch(
      `/api/specialists/me/calendar?${query.toString()}`,
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }
    return NextResponse.json(await res.json());
  } catch (error) {
    console.error("GET calendar", error);
    return NextResponse.json(
      { error: "Erro ao carregar agenda" },
      { status: 500 },
    );
  }
}
