import { tokenService } from "../services/tokenService";

export function authGuard() {
  const token = tokenService.getAccess();
  return Boolean(token);
}
