// authService.ts
import { AuthCredentials, AuthResponse } from "../authTypes";

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"; // Update with your backend URL
    const endpoint = `${apiUrl}/api/auth/login`;

    console.log("authService.login - calling backend:", endpoint);
    console.log("authService.login - credentials:", {
      email: credentials.email,
    });

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    console.log("authService.login - response status:", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error("authService.login - error response:", errorData);
      throw new Error("Credenciais inválidas");
    }

    const data = await res.json();
    console.log("authService.login - response data:", data);
    return data;
  },
};
