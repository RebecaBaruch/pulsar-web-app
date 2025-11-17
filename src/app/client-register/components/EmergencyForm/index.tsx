"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import InputField from "@/components/InputField";
import SelectInput from "@/components/SelectInput";
import { relationshipOptions } from "@/utils/relate-degree-values";

type EmergencyFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function EmergencyForm({ onNext, onBack }: EmergencyFormProps) {
  const [countryCode, setCountryCode] = React.useState("+55");
  const [relationship, setRelationship] = React.useState("");

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
        <h1 className="text-2xl font-bold text-black">Contato de emergência</h1>
        <p>
          Em caso de emergência, entraremos em contato com alguém que você
          confia.
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <InputField
            label="Nome do contato de emergência"
            placeholder="Digite o nome do contato"
          />

          <SelectInput
            label="Parentesco do contato de emergência"
            value={relationship}
            options={relationshipOptions}
            onChange={setRelationship}
          />

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
        <div className="flex flex-col justify-center items-center gap-4 mt-3">
          <PrimaryButton text="Próximo" onClick={onNext} />
          <SecondaryButton text="Voltar" onClick={onBack} />
        </div>
      </div>
    </div>
  );
}
