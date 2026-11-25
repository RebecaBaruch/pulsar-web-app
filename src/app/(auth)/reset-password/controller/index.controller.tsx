"use client";

import React from "react";
import ResetPasswordView from "../view/index.view";
import { validatePassword } from "@/utils/inputs-validation";
import { passwordService } from "@/auth/services/passwordService";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type ResetPasswordControllerProps = {
  tokenFromPath?: string;
};

export default function ResetPasswordController({
  tokenFromPath,
}: ResetPasswordControllerProps) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = tokenFromPath || searchParams.get("token") || "";

  React.useEffect(() => {
    if (!token) {
      router.replace(RoutesUrls.FORGOT_PASSWORD);
    }
  }, [token, router]);

  const validateMainPassword = (value: string) => {
    const err = !value
      ? "Informe a nova senha."
      : validatePassword(value);
    setValidationErrors((prev) => ({ ...prev, password: err }));
    return err;
  };

  const validateConfirmPassword = (
    value: string,
    currentPassword = password,
  ) => {
    let err: string | undefined;

    if (!value) {
      err = "Confirme sua senha.";
    } else if (value !== currentPassword) {
      err = "As senhas não coincidem.";
    }

    setValidationErrors((prev) => ({ ...prev, confirmPassword: err }));
    return err;
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
    validateMainPassword(value);

    if (confirmPassword.length > 0) {
      validateConfirmPassword(confirmPassword, value);
    }
  };

  const onConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const isPasswordValid =
    password.length > 0 && validatePassword(password) === undefined;
  const isConfirmValid =
    confirmPassword.length > 0 && confirmPassword === password;
  const isDisabled =
    loading ||
    !isPasswordValid ||
    !isConfirmValid ||
    !!validationErrors.password ||
    !!validationErrors.confirmPassword;

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    const passErr = validateMainPassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword);
    if (passErr || confirmErr) {
      return;
    }

    if (!token) {
      router.push(RoutesUrls.FORGOT_PASSWORD);
      return;
    }

    setLoading(true);
    try {
      await passwordService.resetPassword({ token, newPassword: password });
      toast.success("Senha atualizada com sucesso!");
      router.push(RoutesUrls.USER_TYPE);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao redefinir senha.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <ResetPasswordView
      password={password}
      confirmPassword={confirmPassword}
      validationErrors={validationErrors}
      onPasswordChange={onPasswordChange}
      onConfirmPasswordChange={onConfirmPasswordChange}
      isDisabled={isDisabled}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
