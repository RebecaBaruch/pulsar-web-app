import { NextResponse } from "next/server";
import { getBackendUrl, readBackendError } from "@/lib/api/server/backendClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body?.token === "string" ? body.token.trim() : "";
    const newPassword =
      typeof body?.newPassword === "string" ? body.newPassword : "";

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token e nova senha são obrigatórios" },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${getBackendUrl()}/api/auth/reset-password/confirm`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const message = await readBackendError(res);
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/auth/reset-password/confirm", error);
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 },
    );
  }
}
