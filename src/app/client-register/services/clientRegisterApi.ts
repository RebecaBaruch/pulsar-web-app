import { RoutesUrls } from "@/utils/enum/routes-url";
import type { BackendClientRegistrationResponse } from "@/types/backend";
import type { RegisterData } from "../context/RegisterContext";
import { registerDataToBackendRequest } from "./registerMapper";

export class ClientRegisterApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ClientRegisterApiError";
    this.status = status;
  }
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    const raw = data?.error ?? data?.message ?? res.statusText;
    if (typeof raw !== "string") return res.statusText;

    if (/email or cpf already exists/i.test(raw)) {
      return "E-mail ou CPF já cadastrado.";
    }
    return raw;
  } catch {
    return res.statusText;
  }
}

export async function registerClient(
  data: RegisterData,
): Promise<BackendClientRegistrationResponse> {
  const body = registerDataToBackendRequest(data);
  const res = await fetch(RoutesUrls.AUTH_REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new ClientRegisterApiError(await parseError(res), res.status);
  }

  const payload = (await res.json()) as BackendClientRegistrationResponse & {
    ok?: boolean;
  };

  return { userId: payload.userId };
}