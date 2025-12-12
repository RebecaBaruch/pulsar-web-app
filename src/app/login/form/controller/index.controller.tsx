"use client";

import React from "react";
import LoginFormView from "../view/index.view";
import { authService } from "@/auth/services/authService";
import { setSession } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { AuthSession } from "@/auth/authTypes";

export default function LoginFormController() {
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userType, setUserType] = React.useState<
    "client" | "specialist" | null
  >(null);

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const type = sessionStorage.getItem("login_user_type") as
      | "client"
      | "specialist"
      | null;

    if (!type) {
      router.replace("/login/user-type");
      return;
    }

    setUserType(type);
    setReady(true);
  }, [router]);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setErrors((p) => ({ ...p, username: "" }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((p) => ({ ...p, password: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType) return;

    const newErrors = { username: "", password: "" };
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = "Digite seu usuário.";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Digite sua senha.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const auth = await authService.login({
        username,
        password,
        userType,
      });

      const session: AuthSession = {
        token: auth.token,
        type: auth.type,
        user: auth.user ?? {
          id: "unknown",
          name: "Usuário",
          email: "",
          type: auth.type,
        },
      };

      await setSession(session);

      router.push(
        session.type === "client"
          ? RoutesUrls.CLIENT_HOME
          : RoutesUrls.SPECIALIST_HOME
      );
    } catch (err: any) {
      setErrors((p) => ({
        ...p,
        password: err.message || "Erro ao fazer login",
      }));
    }
  };

  const isDisabled = !username || !password;

  if (!ready) return null;

  return (
    <LoginFormView
      username={username}
      password={password}
      errors={errors}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
    />
  );
}
