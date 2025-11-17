"use client";

import PrimaryButton from "@/components/Buttons/primary-button";
import SecondaryButton from "@/components/Buttons/secondary-button";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import InputField from "@/components/InputField";
import React from "react";

type ChoosePasswordFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function ChoosePasswordForm({
  onNext,
  onBack,
}: ChoosePasswordFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col gap-12">
      <img
        src="/images/horizontal-logo.png"
        alt="Logo da Pulsar"
        width="200px"
      />
      <div>
        <h1 className="text-2xl font-bold text-black">Defina a sua senha</h1>
        <p>
          A senha deve ter pelo menos 8 caracteres, com letras, números e um
          caractere especial.
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <InputField
            label="Senha"
            type="password"
            placeholder="Digite a senha"
          />

          <InputField
            label="Confirme a senha"
            type="password"
            placeholder="Confirme a senha"
          />
        </form>
        <div className="flex flex-col justify-center items-center gap-4 mt-3">
          <PrimaryButton text="Próximo" onClick={onNext} />
          <SecondaryButton text="Voltar" onClick={onBack} />
        </div>
      </div>
    </div>
  );
}
