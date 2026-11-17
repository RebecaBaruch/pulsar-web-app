import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";

type Params = {
  params: Promise<{ specialistId: string; date: string }>;
};

export async function GET(_req: Request, { params }: Params) {
  const { specialistId, date } = await params;

  try {
    const res = await backendFetch(
      `/api/specialists/${specialistId}/availability/${date}`,
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET availability day", error);
    return NextResponse.json(
      { error: "Erro ao buscar horários" },
      { status: 500 },
    );
  }
}
