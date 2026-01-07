"use client";

import React from "react";
import ResetPasswordView from "../view/index.view";
import { validatePassword } from "@/utils/inputs-validation";
import { passwordService } from "@/auth/services/passwordService";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function ResetPasswordController() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const [validationErrors, setValidationErrors] = React.useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

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

    const passErr = validateMainPassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword);

    if (passErr || confirmErr) {
      return;
    }

    try {
      const token = "mock-token-do-link";

      await passwordService.resetPassword({
        token,
        newPassword: password,
      });

      window.location.href = RoutesUrls.USER_TYPE; // Aqui você deve redirecionar
    } catch (err) {
      console.error("Erro ao redefinir senha:", err);
    }
  };

  return (
    <ResetPasswordView
      password={password}
      confirmPassword={confirmPassword}
      validationErrors={validationErrors}
      onPasswordChange={onPasswordChange}
      onConfirmPasswordChange={onConfirmPasswordChange}
      isDisabled={disabled}
      onSubmit={onSubmit}
    />
  );
}
