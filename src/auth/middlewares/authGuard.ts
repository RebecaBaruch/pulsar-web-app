import { tokenService } from "../services/tokenService";

export function authGuard() {
  const token = tokenService.get();
  return Boolean(token);
}
