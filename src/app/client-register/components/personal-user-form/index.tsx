"use client";

import PrimaryButton from "@/components/buttons/primary-button";
import CountryCodeSelect from "@/components/country-code-select";
import InputField from "@/components/input-field";
import React from "react";

type PersonalUserFormProps = {
  onNext: () => void;
};

export default function PersonalUserForm({ onNext }: PersonalUserFormProps) {
  const [countryCode, setCountryCode] = React.useState("+55");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col gap-12 px-6 pt-6">
      <img
        src="/images/horizontal-logo.png"
        alt="Logo da Pulsar"
        width="200px"
      />

      <div>
        <h1 className="text-2xl font-bold text-black">
          Cadastre-se na Pulsar!
        </h1>
        <p>
          Dê o primeiro passo para uma vida com mais equilíbrio, cuidado e
          bem-estar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputField
          label="Nome completo"
          placeholder="Digite seu nome completo"
        />

        <InputField
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
        />

        <div className="flex flex-row gap-4">
          <InputField label="CPF" type="text" placeholder="Digite seu CPF" />
          <InputField label="Data de nascimento" type="date" />
        </div>

        <div className="flex flex-row gap-4">
          <CountryCodeSelect
            width="fit"
            label="Código do país"
            value={countryCode}
            onChange={setCountryCode}
          />

          <InputField
            label="Número de telefone"
            type="tel"
            placeholder="(XXX) XXX-XXXX"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-4 mt-3">
          <PrimaryButton type="submit" text="Próximo" onClick={onNext} />
          <span>
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
