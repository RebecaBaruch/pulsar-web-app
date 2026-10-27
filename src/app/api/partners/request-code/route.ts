import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireClientSession } from "@/lib/api/server/requireClientSession";

export async function POST(req: Request) {
  const session = await requireClientSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const email =
      typeof body?.email === "string" ? body.email : session.user.email;

    const res = await backendFetch("/api/partners/request-code", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    const data = await res.text();
    return NextResponse.json({ ok: true, message: data || "Código enviado" });
  } catch (error) {
    console.error("POST partners/request-code", error);
    return NextResponse.json(
      { error: "Erro ao solicitar código do benefício" },
      { status: 500 },
    );
  }
}
