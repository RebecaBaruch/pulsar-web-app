"use client";
import React from "react";
import ForgotPasswordView from "../view/index.view";
import { passwordService } from "@/auth/services/passwordService";
import { isRequired, validateEmail } from "@/utils/inputs-validation";

export default function ForgotPasswordController() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = isRequired(email) || validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await passwordService.requestReset(email.trim());
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível enviar o e-mail de recuperação. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordView
      email={email}
      sent={sent}
      error={error}
      isLoading={loading}
      onEmailChange={(value) => {
        setEmail(value);
        if (error) setError("");
      }}
      onSubmit={handleSubmit}
    />
  );
}
