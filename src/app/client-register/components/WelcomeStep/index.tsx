// src/app/register/components/WelcomeStep.tsx

"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";
import { useRegister } from "../../context/RegisterContext";

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
    <div className="flex flex-row w-full">
      <div className="flex flex-col gap-15 md:gap-8 lg:gap-10 xl:gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl 2xl:text-xl font-bold text-black">
            Bem-vindo à Pulsar!
          </h1>
          <p className="text-lg lg:text-2xl 2xl:text-sm text-gray-darkest">
            Dê o primeiro passo para uma vida com mais equilíbrio, cuidado e
            bem-estar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 lg:gap-2.5 2xl:gap-5"
        >
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

          <div className="flex flex-col justify-center items-center gap-15 mt-3">
            <div className="flex flex-col gap-4 w-full">
              <PrimaryButton
                type="submit"
                text="Próximo"
                isDisabled={!isFormValid && submitted}
              />

              <p className="text-sm lg:text-xs 2xl:text-sm text-center text-gray-dark">
                Ao fazer a inscrição, você aceita os{" "}
                <span className="underline cursor-pointer">
                  Termos de Serviço
                </span>{" "}
                e concorda com a{" "}
                <span className="underline cursor-pointer">
                  Política de Privacidade
                </span>{" "}
                da Pulsar.
              </p>
            </div>

            <span className="lg:text-base 2xl:text text-lg">
              Já possui uma conta?{" "}
              <a href="/login" className="text-blue font-semibold underline">
                Entrar
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
