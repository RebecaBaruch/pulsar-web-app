import { AuthCredentials, AuthResponse } from "../authTypes";
import { AuthError } from "../errors/AuthError";

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    //  if (credentials.username !== "teste" || credentials.password !== "123") {
    //   throw new AuthError("Credenciais inválidas", 401);
    // }

    // return {
    //   token: "mock-token-123",
    //   type: credentials.userType,
    //   user: {
    //     id: "1",
    //     name: "Usuário Mock",
    //     email: "mock@teste.com",
    //     type: credentials.userType,
    //   },
    // };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new AuthError("Credenciais inválidas", res.status);
      }

      return res.json();
    } catch (e: any) {
      throw new AuthError(e.message);
    }
  },
};
