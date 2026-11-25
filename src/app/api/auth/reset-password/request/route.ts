import { NextResponse } from "next/server";
import { getBackendUrl, readBackendError } from "@/lib/api/server/backendClient";

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const email =
      typeof body === "object" &&
      body !== null &&
      "email" in body &&
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    if (!email) {
      return NextResponse.json(
        { error: "E-mail é obrigatório" },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${getBackendUrl()}/api/auth/reset-password/request`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-store",
      },
    );

    // O backend responde 404 quando o e-mail não existe. Tratamos como sucesso
    // para não revelar se a conta está cadastrada (mensagem genérica da API).
    if (res.status === 404) {
      return NextResponse.json({ ok: true });
    }

    if (!res.ok) {
      const message = await readBackendError(res);
      console.error(
        "POST /api/auth/reset-password/request backend",
        res.status,
        message,
      );
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/auth/reset-password/request", error);
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 },
    );
  }
}
