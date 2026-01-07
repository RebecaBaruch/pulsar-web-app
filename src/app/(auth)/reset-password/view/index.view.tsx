"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";
import React from "react";

type ResetPasswordViewProps = {
  password: string;
  confirmPassword: string;
  validationErrors: {
    password?: string;
    confirmPassword?: string;
  };
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
};

export default function ResetPasswordView({
  password,
  confirmPassword,
  validationErrors,
  onPasswordChange,
  onConfirmPasswordChange,
  isDisabled,
  onSubmit,
}: ResetPasswordViewProps) {
  return (
    <section className="flex w-screen min-h-screen justify-center pt-15">
      <div className="flex flex-col w-full p-6 md:p-15 lg:py-10 lg:px-6 lg:max-w-lg gap-10 md:gap-10">
        <img
          src="/images/horizontal-logo.png"
          alt="Logo da Pulsar"
          className="lg:w-[150px] w-[150px]"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-black">
            Redefinir sua senha
          </h1>
          <p className="text-lg md:text-md lg:text-base text-gray-darkest">
            A senha deve conter no mínimo 8 caracteres, incluindo letra
            maiúscula, minúscula, número e pelo menos um caractere especial.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <InputField
              label="Senha"
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={onPasswordChange}
              required
              errorMessage={validationErrors.password}
            />

            <InputField
              label="Confirme a senha"
              type="password"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              required
              customValidator={() => undefined}
              errorMessage={validationErrors.confirmPassword}
              error={!!validationErrors.confirmPassword}
              isSuccess={
                !validationErrors.confirmPassword &&
                confirmPassword.length > 0 &&
                password === confirmPassword
              }
            />

            <div className="flex flex-col justify-center items-center gap-4">
              <PrimaryButton type="submit" text="Redefinir senha" onClick={onSubmit} isDisabled={isDisabled}/>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
