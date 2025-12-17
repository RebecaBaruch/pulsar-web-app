"use server";

import { authService } from "../services/authService";
import { setSession } from "../services/sessionService";
import { AuthCredentials } from "../authTypes";

export async function loginAction(credentials: AuthCredentials) {
  const response = await authService.login(credentials);

  setSession({
    token: response.token,
    type: response.type,
    user: response.user,
  });

  return { ok: true };
}
