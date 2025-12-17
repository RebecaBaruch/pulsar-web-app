"use client";

import React from "react";
import LoginFormView from "../view/index.view";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function LoginFormController() {
  const router = useRouter();
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
        router.replace(RoutesUrls.CLIENT_HOME);
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
