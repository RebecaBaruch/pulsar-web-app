"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useAuth } from "@/auth/useAuth";

interface UseLoginOptions {
  onSuccess?: () => void;
  redirectOnSuccess?: boolean;
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(RoutesUrls.AUTH_SIGNIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Login response status:", res.status);
      const data = await res.json();
      console.log("Login response data:", data);

      if (!res.ok) {
        console.error(
          "Login failed with status:",
          res.status,
          "Error:",
          data?.error,
        );
        throw new Error(`${data?.error || "Invalid credentials"}`);
      }

      if (!data?.ok) {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid response");
      }

      await refreshUser();

      if (options?.onSuccess) {
        options.onSuccess();
        return;
      }

      if (options?.redirectOnSuccess !== false) {
        let redirectUrl = sessionStorage.getItem("redirectAfterLogin");

        if (!redirectUrl) {
          if (data.user?.role === "SPECIALIST") {
            redirectUrl = RoutesUrls.SPECIALIST_HOME;
          } else {
            redirectUrl = RoutesUrls.CLIENT_HOME;
          }
        }

        sessionStorage.removeItem("redirectAfterLogin");
        router.replace(redirectUrl);
      }
    } catch {
      setError("Email ou senha inválidos");
      throw new Error("LOGIN_FAILED");
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}
