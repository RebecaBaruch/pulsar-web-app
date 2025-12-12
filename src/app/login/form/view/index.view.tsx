"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";

type Props = {
  username: string;
  password: string;
  errors: { username: string; password: string };
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
};

export default function LoginFormView({
  username,
  password,
  errors,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  isDisabled,
}: Props) {
  return (
    <div className="flex flex-col w-full md:w-3/4 lg:w-fit gap-15 md:gap-8 lg:gap-10 xl:gap-12">
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
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <InputField
            label="CPF, e-mail ou telefone"
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={(value) => onUsernameChange(value)}
            required
            errorMessage={errors.username}
            error={!!errors.username}
          />

          <InputField
            label="Senha"
            type="password"
            placeholder="Digite a sua senha"
            value={password}
            onChange={(value) => onPasswordChange(value)}
            required
            errorMessage={errors.password}
            error={!!errors.password}
          />

          <PrimaryButton type="submit" text="Próximo" isDisabled={isDisabled} />
        </form>
      </div>
    </div>
  );
}
