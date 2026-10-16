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
    <div className="flex w-full flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-bold text-black sm:text-2xl lg:text-xl">
          Bem-vindo à Pulsar!
        </h1>
        <p className="text-sm text-gray-darkest">
          Dê o primeiro passo para uma vida com mais equilíbrio, cuidado e
          bem-estar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <div className="mt-1 flex flex-col items-center gap-4">
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

          <p className="text-center text-sm text-gray-darkest">
            Já possui uma conta?{" "}
            <a
              href={RoutesUrls.LOGIN}
              className="font-medium text-blue underline"
            >
              Entrar
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
