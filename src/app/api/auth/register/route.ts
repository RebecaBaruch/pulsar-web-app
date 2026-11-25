import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await backendFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const message = await readBackendError(res);
      return NextResponse.json({ error: message }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, ...data }, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/register", error);
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 },
    );
  }
}