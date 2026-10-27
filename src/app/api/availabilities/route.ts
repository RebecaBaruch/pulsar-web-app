import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireSpecialistSession } from "@/lib/api/server/requireSpecialistSession";

export async function GET() {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const res = await backendFetch("/api/availabilities");
    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }
    return NextResponse.json(await res.json());
  } catch (error) {
    console.error("GET availabilities", error);
    return NextResponse.json(
      { error: "Erro ao carregar disponibilidades" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await requireSpecialistSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const payload = {
      ...body,
      specialistId: body.specialistId ?? session.user.id,
    };

    const res = await backendFetch("/api/availabilities", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    return NextResponse.json(await res.json(), { status: 201 });
  } catch (error) {
    console.error("POST availabilities", error);
    return NextResponse.json(
      { error: "Erro ao criar disponibilidade" },
      { status: 500 },
    );
  }
}
