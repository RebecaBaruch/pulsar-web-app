"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import InputField from "@/components/InputField";
import React from "react";

type AddressFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function AddressForm({ onNext, onBack }: AddressFormProps) {
  const [countryName, setCountryName] = React.useState("brazil");
  const [noNumber, setNoNumber] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="text-2xl font-bold text-black">Endereço</h1>
        <p>
          Nos diga onde você está. Essas informações nos ajudam a oferecer um
          atendimento mais completo.
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex w-full flex-row gap-4">
            <InputField
              className="w-full"
              label="Código postal"
              type="text"
              placeholder="XXXXX-XXX"
            />
            <CountryCodeSelect
              mode="country"
              label="País"
              value={countryName}
              onChange={setCountryName}
            />
          </div>
          <InputField
            label="Estado/Província"
            placeholder="Digite o estado/província"
          />

          <InputField
            label="Cidade"
            type="text"
            placeholder="Digite a cidade"
          />

          <InputField
            label="Bairro/Distrito"
            type="text"
            placeholder="Digite o bairro/distrito"
          />

          <div className="flex flex-col gap-3 items-end w-full">
            <div className="flex w-full flex-row gap-4">
              <InputField
                className="w-full"
                label="Rua"
                type="text"
                placeholder="Digite a rua"
              />

              <InputField
                className="w-full"
                label="N°"
                type="number"
                placeholder="XXX"
              />
            </div>
            <CustomCheckbox
              label="Endereço sem número"
              checked={noNumber}
              onChange={setNoNumber}
            />
          </div>

          <InputField
            label="Complemento (opcional)"
            type="text"
            placeholder="Digite o complemento"
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
