"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import InputField from "@/components/InputField";
import { formatCpf, formatPhone } from "@/utils/input-formatting";
import { validateCpf, validatePhone } from "@/utils/inputs-validation";
import React from "react";
import { useRegister } from "../../context/RegisterContext";

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
  const { data, updateNested } = useRegister();

  const [validationErrors, setValidationErrors] = React.useState<FieldErrors>(
    {}
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  const isFormValid = React.useMemo(() => {
    const hasErrors = Object.values(validationErrors).some(Boolean);

    const allRequiredFieldsFilled =
      data.personal.name.trim() !== "" &&
      data.personal.cpf.trim() !== "" &&
      data.personal.birthdate.trim() !== "" &&
      data.personal.phone.trim() !== "";

    return !hasErrors && allRequiredFieldsFilled;
  }, [validationErrors, data]);

  const handleValidationChange = (
    fieldName: keyof FieldErrors,
    error: string | undefined
  ) => {
    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = () => {
    if (formRef.current) formRef.current.reportValidity();

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
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6 lg:gap-5 2xl:gap-5"
        >
          <InputField
            label="Nome completo"
            placeholder="Digite seu nome completo"
            value={data.personal.name}
            onChange={(v) => updateNested("personal", { name: v })}
            required
            onValidationChange={(err) => handleValidationChange("name", err)}
            errorMessage={validationErrors.name}
          />

          <div className="flex w-full flex-row gap-4">
            <InputField
              className="w-full"
              label="CPF"
              type="text"
              placeholder="Digite seu CPF"
              value={data.personal.cpf}
              onChange={(v) =>
                updateNested("personal", { cpf: formatCpf(v) })
              }
              required
              customValidator={validateCpf}
              onValidationChange={(err) => handleValidationChange("cpf", err)}
              errorMessage={validationErrors.cpf}
            />

            <InputField
              className="w-full"
              label="Data de nascimento"
              type="date"
              value={data.personal.birthdate}
              onChange={(v) =>
                updateNested("personal", { birthdate: v })
              }
              required
              onValidationChange={(err) =>
                handleValidationChange("birthdate", err)
              }
              errorMessage={validationErrors.birthdate}
            />
          </div>

          <div className="flex w-full flex-row gap-4">
            <CountryCodeSelect
              width="fit"
              label="Código do país"
              value={data.personal.countryCode}
              onChange={(v) =>
                updateNested("personal", { countryCode: v })
              }
            />

            <InputField
              className="w-full"
              label="Número de telefone"
              type="tel"
              placeholder="(XX) XXXXX-XXXX"
              value={data.personal.phone}
              onChange={(v) =>
                updateNested("personal", { phone: formatPhone(v) })
              }
              required
              customValidator={validatePhone}
              onValidationChange={(err) => handleValidationChange("phone", err)}
              errorMessage={validationErrors.phone}
            />
          </div>
        </form>

        <div className="flex flex-col justify-center items-center gap-3 mt-3">
          <PrimaryButton
            type="submit"
            text="Próximo"
            onClick={handleSubmit}
            isDisabled={!isFormValid}
          />
          <SecondaryButton text="Voltar" onClick={onBack} />
        </div>
      </div>
    </div>
  );
}
