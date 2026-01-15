"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { tokenService } from "@/auth/services/tokenService";
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

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      if (!data?.ok || !data?.accessToken) {
        throw new Error("Invalid response");
      }

      tokenService.save({
        token: data.accessToken,
        user: data.user,
      });

      await refreshUser();

      if (options?.onSuccess) {
        options.onSuccess();
        return;
      }

      if (options?.redirectOnSuccess !== false) {
        const redirectUrl =
          sessionStorage.getItem("redirectAfterLogin") ??
          RoutesUrls.CLIENT_HOME;

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
