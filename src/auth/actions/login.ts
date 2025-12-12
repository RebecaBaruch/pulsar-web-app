import { authService } from "../services/authService";
import { setSession } from "@/utils/auth";
import { AuthSession, LoginUserType } from "../authTypes";

export async function loginAction(
  username: string,
  password: string,
  userType: LoginUserType
) {
  const session = await authService.login({
    username,
    password,
    userType,
  });

  if (!session.user) {
    return { ok: false };
  }

  await setSession(session as AuthSession);

  return { ok: true };
}
