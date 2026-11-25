import { RoutesUrls } from "@/utils/enum/routes-url";

export class PasswordApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "PasswordApiError";
    this.status = status;
  }
}

type ErrorPayload = {
  error?: string;
  message?: string;
  details?: string;
};

async function parseError(res: Response): Promise<ErrorPayload> {
  try {
    const data = (await res.json()) as ErrorPayload;
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function mapRequestError(payload: ErrorPayload, status: number): string {
  const raw = `${payload.error ?? ""} ${payload.message ?? ""} ${payload.details ?? ""}`;

  if (/failed to send password reset email/i.test(raw)) {
    return "Não foi possível enviar o e-mail de recuperação. Tente novamente mais tarde.";
  }

  if (payload.details) {
    return `Não foi possível enviar o e-mail de recuperação (${payload.details}).`;
  }

  if (status === 500 && payload.error) {
    return `Não foi possível enviar o e-mail de recuperação (${payload.error}).`;
  }

  return "Não foi possível enviar o e-mail de recuperação. Tente novamente.";
}

function mapResetError(message: string, status: number): string {
  const lower = message.toLowerCase();

  if (status === 409 || /token/.test(lower)) {
    if (/expired|already been used/.test(lower)) {
      return "Este link expirou ou já foi usado. Solicite uma nova recuperação de senha.";
    }
    return "Este link é inválido. Solicite uma nova recuperação de senha.";
  }

  return "Não foi possível redefinir a senha. Tente novamente.";
}

export const passwordService = {
  async requestReset(email: string) {
    const res = await fetch(RoutesUrls.AUTH_RESET_PASSWORD_REQUEST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const payload = await parseError(res);
      throw new PasswordApiError(mapRequestError(payload, res.status), res.status);
    }
  },

  async resetPassword(data: { token: string; newPassword: string }) {
    const res = await fetch(RoutesUrls.AUTH_RESET_PASSWORD_CONFIRM, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const payload = await parseError(res);
      const message = payload.error ?? payload.message ?? res.statusText;
      throw new PasswordApiError(mapResetError(message, res.status), res.status);
    }
  },
};
