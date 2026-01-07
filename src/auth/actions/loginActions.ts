"use server";

import { authService } from "../services/authService";
import { setSession } from "../services/sessionService";
import { AuthCredentials } from "../authTypes";

export async function loginAction(credentials: AuthCredentials) {
  const response = await authService.login(credentials);

  // Pass the server auth response directly to the session setter
  await setSession(response);

  return { ok: true };
}
