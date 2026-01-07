"use client";

import React from "react";
import LoginFormView from "../view/index.view";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { tokenService } from "@/auth/services/tokenService";
import { useAuth } from "@/auth/useAuth";

export default function LoginFormController() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(RoutesUrls.AUTH_SIGNIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciais inválidas");

      const data = await res.json();

      if (data.ok) {
        // Store token and user in sessionStorage
        tokenService.save({
          token: data.accessToken,
          user: data.user,
        });

        // Immediately sync AuthProvider state
        try {
          await refreshUser();
        } catch {}

        // Check if there's a redirect URL saved in sessionStorage
        const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
          sessionStorage.removeItem("redirectAfterLogin");
          router.replace(redirectUrl);
        } else {
          router.replace(RoutesUrls.CLIENT_HOME);
        }
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  }

  return (
    <LoginFormView
      email={email}
      password={password}
      errors={{ email: "", password: "" }}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      isDisabled={false}
    />
  );
}
