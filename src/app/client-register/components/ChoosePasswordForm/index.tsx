"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import InputField from "@/components/InputField";
import React, { useMemo } from "react";
import { useLogin } from "@/auth/hooks/useLogin";
import { isRequired } from "@/utils/inputs-validation";
import { useRegister } from "../../context/RegisterContext";
import { registerClient, ClientRegisterApiError } from "../../services/clientRegisterApi";

const REGISTER_STEP_KEY = "register_step";

type ChoosePasswordFormProps = {
  onNext: () => void;
  onBack: () => void;
};

interface FieldErrors {
  password?: string;
  confirmPassword?: string;
}

const validatePasswordMatch = (
  password: string,
  confirm: string
): string | undefined => {
  if (confirm && password !== confirm) {
    return "As senhas não correspondem.";
  }
  return undefined;
};

export default function ChoosePasswordForm({
  onBack,
}: ChoosePasswordFormProps) {
  const { data, updateNested } = useRegister();
  const { login } = useLogin({ redirectOnSuccess: true });

  const password = data.security.password || "";
  const confirmPassword = data.security.confirmPassword || "";

  const [validationErrors, setValidationErrors] = React.useState<FieldErrors>(
    {}
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleValidationChange = (
    field: keyof FieldErrors,
    error: string | undefined
  ) => {
    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateField = (
    field: "password" | "confirmPassword",
    value: string
  ) => {
    if (field === "password") {
      const error = isRequired(value);
      handleValidationChange("password", error);

      if (confirmPassword) {
        const confirmError = validatePasswordMatch(value, confirmPassword);
        handleValidationChange("confirmPassword", confirmError);
      }
    }

    if (field === "confirmPassword") {
      const requiredError = isRequired(value);
      if (requiredError) {
        handleValidationChange("confirmPassword", requiredError);
      } else {
        const matchError = validatePasswordMatch(password, value);
        handleValidationChange("confirmPassword", matchError);
      }
    }
  };

  const isFormValid = useMemo(() => {
    const hasErrors = Object.values(validationErrors).some(Boolean);

    return (
      !hasErrors &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0 &&
      password === confirmPassword
    );
  }, [password, confirmPassword, validationErrors]);

  const handleSubmit = async () => {
    if (!isFormValid || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await registerClient(data);
      try {
        sessionStorage.removeItem(REGISTER_STEP_KEY);
      } catch {
        /* ignore */
      }
      await login(data.email, data.security.password);
    } catch (error) {
      const message =
        error instanceof ClientRegisterApiError
          ? error.message
          : "Não foi possível concluir o cadastro. Tente novamente.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black md:text-3xl lg:text-xl">
          Defina a sua senha
        </h1>
        <p className="text-sm text-gray-darkest md:text-xs">
          A senha deve ter pelo menos 8 caracteres, com letras, números e um
          caractere especial.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex w-full flex-col gap-4">
            <InputField
              label="Senha"
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(v) => {
                updateNested("security", { password: v });
                validateField("password", v);
              }}
              required
              errorMessage={validationErrors.password}
            />

            <InputField
              label="Confirme a senha"
              type="password"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(v) => {
                updateNested("security", { confirmPassword: v });
                validateField("confirmPassword", v);
              }}
              required
              errorMessage={validationErrors.confirmPassword}
              error={!!validationErrors.confirmPassword}
              isSuccess={
                !validationErrors.confirmPassword &&
                confirmPassword.length > 0 &&
                password === confirmPassword
              }
            />
          </div>

          {submitError && (
            <p className="w-full text-center text-sm text-red-600" role="alert">
              {submitError}
            </p>
          )}

          <PrimaryButton
            type="submit"
            text={submitting ? "Criando conta..." : "Concluir cadastro"}
            isDisabled={!isFormValid || submitting}
          />
          <SecondaryButton text="Voltar" onClick={onBack} />
        </form>
      </div>
    </div>
  );
}
