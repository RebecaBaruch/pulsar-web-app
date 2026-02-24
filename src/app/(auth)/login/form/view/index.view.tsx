"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";

type Props = {
  email: string;
  password: string;
  errors: { email: string; password: string };
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
};

export default function LoginFormView({
  email,
  password,
  errors,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isDisabled,
}: Props) {
  return (
    <section className="flex w-screen min-h-screen justify-center lg:items-start pt-8">
      <div className="mx-auto flex flex-col p-4 lg:py-10 lg:max-w-[350px] gap-8">
        <img
          src="/images/horizontal-logo.png"
          alt="Logo da Pulsar"
          className="w-[100px]"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-xl font-bold text-black">
            Bem-vindo de volta!
          </h1>
          <p className="text-sm md:text-xs text-gray-darkest">
            Acesse sua conta para continuar cuidando do que realmente importa:
            você.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-col gap-4 w-full">
              <InputField
                label="CPF, e-mail ou telefone"
                type="text"
                placeholder="Digite seu usuário"
                value={email}
                onChange={(value) => onEmailChange(value)}
                required
                errorMessage={errors.email}
                error={!!errors.email}
              />

              <div className="flex flex-col gap-2 items-end">
                <InputField
                  className="w-full"
                  label="Senha"
                  type="password"
                  placeholder="Digite a sua senha"
                  value={password}
                  onChange={(value) => onPasswordChange(value)}
                  required
                  errorMessage={errors.password}
                  error={!!errors.password}
                />

                <a href="/" className="text-blue text-xs font-medium underline">
                  Esqueci minha senha
                </a>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              text="Login"
              isDisabled={isDisabled}
            />
            <span className="text-center text-xs">
              Ainda não possui uma conta?{" "}
              <a href="/login" className="text-blue font-medium underline">
                Cadastre-se
              </a>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
