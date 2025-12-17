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
    <section className="flex w-screen min-h-screen justify-center lg:items-center pt-20 lg:p-4">
      <div className="flex flex-col w-full p-6 md:p-15 lg:py-10 lg:px-6 lg:max-w-lg gap-15 md:gap-8 lg:gap-10 lg:bg-white md:rounded-xl lg:shadow-md">
        <img
          src="/images/horizontal-logo.png"
          alt="Logo da Pulsar"
          className="lg:w-[150px] w-[150px]"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-black">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg md:text-md lg:text-md text-gray-darkest">
            Acesse sua conta para continuar cuidando do que realmente importa:
            você.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-col gap-6 w-full">
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

              <div className="flex flex-col gap-3 items-end">
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

                <a
                  href="/"
                  className="text-blue lg:text-xs font-semibold underline"
                >
                  Esqueci minha senha
                </a>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              text="Próximo"
              isDisabled={isDisabled}
            />
            <span className="text-center lg:text-base 2xl:text text-lg">
              Ainda não possui uma conta?{" "}
              <a href="/login" className="text-blue font-semibold underline">
                Cadastre-se
              </a>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
