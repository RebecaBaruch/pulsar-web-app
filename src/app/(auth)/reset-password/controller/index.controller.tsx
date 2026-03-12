"use client";

import React from "react";
import ResetPasswordView from "../view/index.view";
import { validatePassword } from "@/utils/inputs-validation";
import { passwordService } from "@/auth/services/passwordService";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useAuth } from "@/auth/useAuth";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordController() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const validateMainPassword = (value: string) => {
    const err = validatePassword(value);
    setValidationErrors((prev) => ({ ...prev, password: err }));
    return err;
  };

  const validateConfirmPassword = (value: string) => {
    let err: string | undefined;

    if (!value) {
      err = "Confirme sua senha.";
    } else if (value !== password) {
      err = "As senhas não coincidem.";
    }

    setValidationErrors((prev) => ({ ...prev, confirmPassword: err }));
    return err;
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
    validateMainPassword(value);

    if (confirmPassword.length > 0) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const onConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  React.useEffect(() => {
    const noErrors =
      !validationErrors.password &&
      !validationErrors.confirmPassword &&
      validatePassword(password) &&
      password === confirmPassword;

    setDisabled(!noErrors);
  }, [password, confirmPassword, validationErrors]);

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    const passErr = validateMainPassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword);
    if (passErr || confirmErr) {
      setLoading(false);
      return;
    }
    // Get token from URL
    const token = searchParams.get("token");
    try {
      if (token) {
        // Token-based reset (user from email link)
        await passwordService.resetPassword({ token, newPassword: password });
      } else if (isAuthenticated && user) {
        // Authenticated user, mock userId as token
        await passwordService.resetPassword({
          token: user.id,
          newPassword: password,
        });
      } else {
        // Not authenticated and no token, redirect to login
        router.push(RoutesUrls.LOGIN);
        return;
      }
      router.push(RoutesUrls.USER_TYPE);
    } catch (err) {
      setError("Erro ao redefinir senha.");
      console.error("Erro ao redefinir senha:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordView
      password={password}
      confirmPassword={confirmPassword}
      validationErrors={validationErrors}
      onPasswordChange={onPasswordChange}
      onConfirmPasswordChange={onConfirmPasswordChange}
      isDisabled={disabled || loading}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
