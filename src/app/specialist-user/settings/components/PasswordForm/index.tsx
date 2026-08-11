// components/Forms/PasswordForm.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { usePasswordForm } from "../../hooks/usePasswordForm";

export const PasswordForm: React.FC = () => {
  const {
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
  } = usePasswordForm();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
      {/* Header da Seção */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faKey}
            className="text-gray-700 text-sm -rotate-45"
          />
          <h2 className="text-base font-bold text-gray-900">Alterar senha</h2>
        </div>
        <p className="text-xs text-gray-500">
          Confirme a sua senha atual e insira uma nova senha para atualizar suas
          credenciais de acesso. A nova senha deve ter no mínimo 8 caracteres,
          contendo 1 número e 1 caractere especial.
        </p>
      </div>

      {/* Inputs grid */}
      <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white space-y-6">
        {/* Feedback messages */}
        {error && (
          <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Senha atual"
            type="password"
            skipTypeValidation={true}
            placeholder="••••••••••••"
            value={formData.currentPassword}
            onChange={(val) => handleChange("currentPassword", val)}
          />

          <InputField
            label="Nova senha"
            type="password"
            showPasswordToggle={true}
            placeholder="••••••••••••"
            value={formData.newPassword}
            isDisabled={!isCurrentPasswordEntered}
            onChange={(val) => handleChange("newPassword", val)}
          />

          <InputField
            label="Confirme a nova senha"
            type="password"
            showPasswordToggle={true}
            placeholder="••••••••••••"
            value={formData.confirmPassword}
            isDisabled={!isCurrentPasswordEntered}
            onChange={(val) => handleChange("confirmPassword", val)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 items-center lg:justify-end">
          <div className="w-full lg:w-fit order-1 md:order-2">
            <PrimaryButton
              type="submit"
              text={isSubmitting ? "Salvando..." : "Salvar alterações"}
              isDisabled={!isValid || isSubmitting}
            />
          </div>

          <div className="w-full lg:w-fit order-2 md:order-1">
            <SecondaryButton
              type="button"
              text="Cancelar"
              onClick={handleReset}
              isDisabled={!isDirty || isSubmitting}
            />
          </div>
        </div>
      </div>
    </form>
  );
};