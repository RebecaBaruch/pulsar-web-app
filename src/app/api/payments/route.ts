import { NextResponse } from "next/server";
import { backendFetch, readBackendError } from "@/lib/api/server/backendClient";
import { requireClientSession } from "@/lib/api/server/requireClientSession";
import type { CreatePaymentRequest } from "@/types/backend";

export async function POST(req: Request) {
  const session = await requireClientSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Omit<
      CreatePaymentRequest,
      "clientId"
    >;

    if (
      !body.sessionId ||
      !body.specialistId ||
      body.price == null ||
      !body.paymentMethod
    ) {
      return NextResponse.json(
        { error: "Dados de pagamento incompletos" },
        { status: 400 },
      );
    }

    const payload: CreatePaymentRequest = {
      sessionId: body.sessionId,
      specialistId: body.specialistId,
      clientId: session.user.id,
      price: Number(body.price),
      discount: Number(body.discount ?? 0),
      paymentMethod: body.paymentMethod,
    };

    const res = await backendFetch("/api/payments", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: await readBackendError(res) },
        { status: res.status },
      );
    }

    const raw = await res.text();
    let paymentId: string | undefined;

    try {
      const parsed = JSON.parse(raw);
      paymentId =
        typeof parsed === "string"
          ? parsed
          : (parsed.paymentId ?? parsed.id ?? parsed);
    } catch {
      paymentId = raw.replace(/"/g, "").trim();
    }

    if (!paymentId) {
      return NextResponse.json(
        { error: "Resposta de pagamento inválida" },
        { status: 502 },
      );
    }

    return NextResponse.json({ paymentId });
  } catch (error) {
    console.error("POST /api/payments", error);
    return NextResponse.json(
      { error: "Erro ao criar pagamento" },
      { status: 500 },
    );
  }
}
