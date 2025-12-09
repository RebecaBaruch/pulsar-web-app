// src/app/register/components/WelcomeStep.tsx

"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField";
import React from "react";

type WelcomeStepProps = {
  onNext: () => void;
};

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col gap-15 lg:gap-5 2xl:gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-lg 2xl:text-xl font-bold text-black">
          Bem-vindo à Pulsar!
        </h1>
        <p className="lg:text-xs 2xl:text-sm text-lg text-gray-darkest">
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
        />
        <div className="flex flex-col justify-center items-center gap-15 mt-3">
          <div className='flex flex-col gap-4 w-full'>
            <PrimaryButton type="submit" text="Próximo" onClick={onNext} />

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
          <span className="lg:text-xs 2xl:text text-lg">
            Já possui uma conta?{" "}
            <a href="/login" className="text-blue font-semibold underline">
              Entrar
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
