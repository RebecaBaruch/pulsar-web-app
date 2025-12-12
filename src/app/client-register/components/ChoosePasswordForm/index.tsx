"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import InputField from "@/components/InputField";
import React, { useMemo } from "react";
import { isRequired } from "@/utils/inputs-validation";
import { useRegister } from "../../context/RegisterContext";

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
  onNext,
  onBack,
}: ChoosePasswordFormProps) {
  const { data, updateNested } = useRegister();

  const password = data.security.password || "";
  const confirmPassword = data.security.confirmPassword || "";

  const [validationErrors, setValidationErrors] = React.useState<FieldErrors>(
    {}
  );

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

  const handleSubmit = () => {
    if (!isFormValid) return;
    onNext();
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-xl lg:text-2xl font-bold text-black">
          Defina a sua senha
        </h1>
        <p className="text-lg md:text-base lg:text-md">
          A senha deve ter pelo menos 8 caracteres, com letras, números e um
          caractere especial.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
        </form>

        <div className="flex flex-col justify-center items-center gap-4 mt-3">
          <PrimaryButton
            type="submit"
            text="Próximo"
            onClick={handleSubmit}
            isDisabled={!isFormValid}
          />
          <SecondaryButton text="Voltar" onClick={onBack} />
        </div>
      </div>
    </div>
  );
}
