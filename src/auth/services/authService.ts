// authService.ts
import { AuthCredentials, AuthResponse } from "../authTypes";

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/auth/login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("authService.login - error response:", errorData);
      throw new Error("Credenciais inválidas");
    }

    const data = await res.json();
    return data;
  },
};
