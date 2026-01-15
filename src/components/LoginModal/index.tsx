"use client";

import React from "react";
import InputField from "../InputField";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useLogin } from "@/auth/hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login, loading, error } = useLogin({
    onSuccess: onClose,
    redirectOnSuccess: false,
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center lg:items-start pt-8 bg-black/50">
      <div className="mx-auto flex flex-col p-4 lg:py-10 lg:max-w-[350px] gap-8 bg-white rounded-md relative">
        <FontAwesomeIcon
          icon={faClose}
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-darkest"
        />
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

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col gap-4 w-full">
            <InputField
              label="CPF, e-mail ou telefone"
              type="text"
              placeholder="Digite seu usuário"
              value={email}
              onChange={setEmail}
              required
              error={!!error}
            />

            <div className="flex flex-col gap-2 items-end">
              <InputField
                className="w-full"
                label="Senha"
                type="password"
                placeholder="Digite a sua senha"
                value={password}
                onChange={setPassword}
                required
                errorMessage={error ?? ""}
                error={!!error}
              />

              <a href="/" className="text-blue text-xs font-medium underline">
                Esqueci minha senha
              </a>
            </div>
          </div>

          <PrimaryButton type="submit" text="Login" isDisabled={loading} />

          <span className="text-center text-xs">
            Ainda não possui uma conta?{" "}
            <a href="/login" className="text-blue font-medium underline">
              Cadastre-se
            </a>
          </span>
        </form>
      </div>
    </div>
  );
}
