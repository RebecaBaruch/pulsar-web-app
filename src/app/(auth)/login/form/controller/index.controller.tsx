"use client";

import React from "react";
import LoginFormView from "../view/index.view";
import { useLogin } from "@/auth/hooks/useLogin";

export default function LoginFormController() {
  const { login, loading, error } = useLogin();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const userType = (sessionStorage.getItem("userType") as "CLIENT" | "SPECIALIST");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <LoginFormView
      email={email}
      password={password}
      errors={{ email: "", password: error ?? "" }}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      userType={userType}
      isDisabled={loading}
    />
  );
}
