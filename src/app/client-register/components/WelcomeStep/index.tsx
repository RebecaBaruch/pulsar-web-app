"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";
import { useRegister } from "../../context/RegisterContext";
import { RoutesUrls } from "@/utils/enum/routes-url";

type WelcomeStepProps = {
  onNext: () => void;
};

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  const { data, update } = useRegister();

  const [emailValidationError, setEmailValidationError] = React.useState<
    string | undefined
  >(undefined);
  const [submitted, setSubmitted] = React.useState(false);

  const isFormValid = !emailValidationError && data.email.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (isFormValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black md:text-3xl lg:text-xl">
          Bem-vindo à Pulsar!
        </h1>
        <p className="text-sm text-gray-darkest md:text-xs">
          Dê o primeiro passo para uma vida com mais equilíbrio, cuidado e
          bem-estar.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex w-full flex-col gap-4">
            <InputField
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              value={data.email}
              onChange={(v) => update({ email: v })}
              required
              shouldValidate={submitted}
              onValidationChange={setEmailValidationError}
              errorMessage={submitted ? emailValidationError : undefined}
            />
          </div>

          <PrimaryButton
            type="submit"
            text="Próximo"
            isDisabled={!isFormValid && submitted}
          />

          <p className="text-center text-xs text-gray-dark">
            Ao fazer a inscrição, você aceita os{" "}
            <span className="cursor-pointer underline">Termos de Serviço</span>{" "}
            e concorda com a{" "}
            <span className="cursor-pointer underline">
              Política de Privacidade
            </span>{" "}
            da Pulsar.
          </p>

          <div className="text-center text-xs">
            Já possui uma conta?{" "}
            <a
              href={RoutesUrls.LOGIN}
              className="font-medium text-blue underline"
            >
              Entrar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
