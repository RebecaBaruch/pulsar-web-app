"use client";
import React from "react";
import ForgotPasswordView from "../view/index.view";
import { passwordService } from "@/auth/services/passwordService";

export default function ForgotPasswordController() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await passwordService.requestReset(email);
      setSent(true);
    } catch {
      setSent(true);
    }
  };

  return (
    <ForgotPasswordView
      email={email}
      sent={sent}
      error={error}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
    />
  );
}
