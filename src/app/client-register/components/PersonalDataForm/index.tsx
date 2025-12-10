"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import InputField from "@/components/InputField";
import { formatCpf, formatPhone } from "@/utils/input-formatting";
import { validateCpf, validatePhone } from "@/utils/inputs-validation";
import React from "react";

type PersonalDataFormProps = {
  onNext: () => void;
  onBack: () => void;
};

interface FieldErrors {
  name?: string;
  cpf?: string;
  birthdate?: string;
  phone?: string;
}

export default function PersonalDataForm({
  onNext,
  onBack,
}: PersonalDataFormProps) {
  const [name, setName] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+55");

  const [validationErrors, setValidationErrors] = React.useState<FieldErrors>({});
  
  const isFormValid = React.useMemo(() => {
    const hasErrors = Object.values(validationErrors).some((error) => !!error);

    const allRequiredFieldsFilled =
      name.trim() !== "" &&
      cpf.trim() !== "" &&
      birthdate.trim() !== "" &&
      phone.trim() !== "";

    return !hasErrors && allRequiredFieldsFilled; 
  }, [validationErrors, name, cpf, birthdate, phone]);


  const handleValidationChange = (
    fieldName: keyof FieldErrors,
    error: string | undefined
  ) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formRef.current) {
        formRef.current.reportValidity();
    }
    
    if (isFormValid) {
        onNext();
    } else {
        console.log("Formulário inválido. Erros:", validationErrors);
    }
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
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 lg:gap-5 2xl:gap-5"
        >
          <InputField
            label="Nome completo"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={setName}
            required={true}
            onValidationChange={(error) =>
              handleValidationChange("name", error)
            }
            errorMessage={validationErrors.name}
          />

          <div className="flex w-full flex-row gap-4">
            <InputField
              className="w-full"
              label="CPF"
              type="text"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(newValue) => setCpf(formatCpf(newValue))}
              required={true}
              customValidator={validateCpf}
              onValidationChange={(error) =>
                handleValidationChange("cpf", error)
              }
              errorMessage={validationErrors.cpf}
            />
            <InputField
              className="w-full"
              label="Data de nascimento"
              type="date"
              value={birthdate}
              onChange={setBirthdate}
              required={true}
              onValidationChange={(error) =>
                handleValidationChange("birthdate", error)
              }
              errorMessage={validationErrors.birthdate}
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
              placeholder="(XX) XXXXX-XXXX"
              value={phone}
              onChange={(newValue) => setPhone(formatPhone(newValue))}
              required={true}
              customValidator={validatePhone}
              onValidationChange={(error) =>
                handleValidationChange("phone", error)
              }
              errorMessage={validationErrors.phone}
            />
          </div>
        </form>
        <div className="flex flex-col justify-center items-center gap-3 mt-3">
          <PrimaryButton
            type="submit"
            text="Próximo"
            onClick={() => handleSubmit}
            isDisabled={!isFormValid}
          />
          <SecondaryButton text="Voltar" onClick={onBack} />
        </div>
      </div>
    </div>
  );
}