// hooks/usePasswordForm.ts
import { useState } from "react";
import { validatePassword } from "@/utils/inputs-validation";

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialFormState: PasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function usePasswordForm() {
  const [formData, setFormData] = useState<PasswordFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 1. Senha atual digitada
  const isCurrentPasswordEntered = formData.currentPassword.trim().length > 0;

  // 2. Formulário alterado (para o botão Cancelar)
  const isDirty =
    formData.currentPassword !== "" ||
    formData.newPassword !== "" ||
    formData.confirmPassword !== "";

  // 3. Nova senha válida (usando o util de validação que você tem)
  const isNewPasswordValid =
    formData.newPassword.length > 0 &&
    validatePassword(formData.newPassword) === undefined;

  // 4. Confirmação igual
  const doPasswordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.newPassword === formData.confirmPassword;

  // 5. Formulário 100% pronto para salvar
  const isValid =
    isCurrentPasswordEntered && isNewPasswordValid && doPasswordsMatch;

  const handleChange = (field: keyof PasswordFormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "currentPassword" && !value.trim()) {
        updated.newPassword = "";
        updated.confirmPassword = "";
      }
      return updated;
    });

    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setError(null);
    setSuccess(null);
  };

  const validate = (): boolean => {
    if (!isCurrentPasswordEntered) {
      setError("Por favor, informe a sua senha atual.");
      return false;
    }

    const pwdError = validatePassword(formData.newPassword);
    if (pwdError) {
      setError(pwdError);
      return false;
    }

    if (!doPasswordsMatch) {
      setError("A confirmação de senha não confere com a nova senha.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Senha alterada com sucesso!");
      setFormData(initialFormState);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "A senha atual está incorreta. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isDirty,
    isValid,
    isSubmitting,
    isCurrentPasswordEntered,
    error,
    success,
    handleChange,
    handleReset,
    handleSubmit,
  };
}