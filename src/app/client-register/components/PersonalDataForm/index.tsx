"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import InputField from "@/components/InputField";
import React from "react";

type PersonalDataFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function PersonalDataForm({ onNext, onBack }: PersonalDataFormProps) {
  const [countryCode, setCountryCode] = React.useState("+55");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col gap-12 lg:gap-5 2xl:gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-lg 2xl:text-xl font-bold text-black">
          Dados pessoais
        </h1>
        <p className="text-lg lg:text-xs 2xl:text-sm">
          Insira os seus dados de identificação e contato.
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:gap-5 2xl:gap-7">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 lg:gap-5 2xl:gap-5"
        >
          <InputField
            label="Nome completo"
            placeholder="Digite seu nome completo"
          />

          <div className="flex w-full flex-row gap-4">
            <InputField
              className="w-full"
              label="CPF"
              type="text"
              placeholder="Digite seu CPF"
            />
            <InputField
              className="w-full"
              label="Data de nascimento"
              type="date"
            />
          </div>

          <div className="flex w-full flex-row gap-4">
            <CountryCodeSelect
              width="fit"
              label="Código do país"
              value={countryCode}
              onChange={setCountryCode}
            />

            <InputField
              className="w-full"
              label="Número de telefone"
              type="tel"
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
        </form>
        <div className="flex flex-col justify-center items-center gap-3 mt-3">
          <PrimaryButton type="submit" text="Próximo" onClick={onNext} />
          <SecondaryButton text="Voltar" onClick={onBack} />
        </div>
      </div>
    </div>
  );
}
