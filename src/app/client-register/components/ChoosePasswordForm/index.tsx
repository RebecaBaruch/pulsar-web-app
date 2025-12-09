"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
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
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black">Defina a sua senha</h1>
        <p className="text-lg lg:text-xs 2xl:text-sm">
          A senha deve ter pelo menos 8 caracteres, com letras, números e um
          caractere especial.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
