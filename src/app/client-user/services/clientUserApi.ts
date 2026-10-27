import type {
  BackendSpecialistDetails,
  CreatePaymentRequest,
  PaymentProcessedResponse,
  ScheduleSessionRequest,
  ScheduleSessionResponse,
} from "@/types/backend";
import type { LocalUser } from "../profile/hooks/useAutoSaveProfileForm";
import type { NextSessionCardProps } from "../sessions/components/NextSessionsList/NextSessionCard";
import type { HistorySessionCardProps } from "../sessions/components/HistorySessionsList/HistorySessionCard";
import type { PaymentMethod } from "../checkout/components/PaymentOptions";

type MeResponse = {
  user: LocalUser;
};

type SessionsListResponse = {
  nextSessions: NextSessionCardProps[];
  historySessions: HistorySessionCardProps[];
};

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return data?.error ?? data?.message ?? res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function fetchClientProfile(): Promise<LocalUser | null> {
  const res = await fetch("/api/me", { cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as MeResponse;
  return data.user ?? null;
}

export async function patchClientProfile(form: LocalUser): Promise<LocalUser> {
  const res = await fetch("/api/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  const data = (await res.json()) as MeResponse;
  return data.user;
}

export async function fetchClientSessions(): Promise<SessionsListResponse> {
  const res = await fetch("/api/sessions", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  return res.json();
}

export async function scheduleSession(
  body: Omit<ScheduleSessionRequest, "clientId">,
): Promise<ScheduleSessionResponse> {
  const res = await fetch("/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  return res.json();
}

export async function fetchSpecialistDetails(
  specialistId: string,
): Promise<BackendSpecialistDetails | null> {
  const res = await fetch(`/api/specialists/${specialistId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

function toBackendPaymentMethod(method: PaymentMethod): CreatePaymentRequest["paymentMethod"] {
  switch (method) {
    case "pix":
      return "PIX";
    case "boleto":
      return "BOLETO";
    case "card":
    default:
      return "CREDIT_CARD";
  }
}

export async function createAndProcessPayment(input: {
  sessionId: string;
  specialistId: string;
  price: number;
  discount: number;
  paymentMethod: PaymentMethod;
}): Promise<PaymentProcessedResponse> {
  const createRes = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: input.sessionId,
      specialistId: input.specialistId,
      price: input.price,
      discount: input.discount,
      paymentMethod: toBackendPaymentMethod(input.paymentMethod),
    }),
  });

  if (!createRes.ok) {
    throw new Error(await parseError(createRes));
  }

  const created = (await createRes.json()) as { paymentId: string };
  const processRes = await fetch(
    `/api/payments/${created.paymentId}/process`,
    { method: "POST" },
  );

  if (!processRes.ok) {
    throw new Error(await parseError(processRes));
  }

  return processRes.json();
}
