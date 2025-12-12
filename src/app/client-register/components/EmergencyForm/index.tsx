"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import InputField from "@/components/InputField";
import SelectInput from "@/components/SelectInput";
import { relationshipOptions } from "@/utils/relate-degree-values";
import { formatPhone } from "@/utils/input-formatting";
import { validatePhone, isRequired } from "@/utils/inputs-validation";
import { useRegister } from "../../context/RegisterContext";

type EmergencyFormProps = {
  onNext: () => void;
  onBack: () => void;
};

interface FieldErrors {
  contactName?: string;
  relationship?: string;
  phone?: string;
}

export default function EmergencyForm({ onNext, onBack }: EmergencyFormProps) {
  const { data, updateNested } = useRegister();

  const formRef = React.useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = React.useState<FieldErrors>(
    {}
  );

  const emergency = data.emergency;

  const isFormValid = React.useMemo(() => {
    const hasErrors = Object.values(validationErrors).some(Boolean);

    const requiredFilled =
      emergency.contactName.trim() !== "" &&
      emergency.relationship.trim() !== "" &&
      emergency.phone.trim() !== "";

    return !hasErrors && requiredFilled;
  }, [validationErrors, emergency]);

  const handleValidationChange = (
    field: keyof FieldErrors,
    error: string | undefined
  ) => {
    setValidationErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    formRef.current?.reportValidity();

    if (isFormValid) {
      onNext();
    } else {
      console.log("Formulário de Emergência inválido:", validationErrors);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-xl lg:text-2xl font-bold text-black">
          Contato de emergência
        </h1>
        <p className="text-lg md:text-base lg:text-md">
          Em caso de emergência, entraremos em contato com alguém que você
          confia.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6"
        >
          <InputField
            label="Nome do contato de emergência"
            placeholder="Digite o nome do contato"
            value={emergency.contactName}
            onChange={(v) => updateNested("emergency", { contactName: v })}
            required
            onValidationChange={(err) =>
              handleValidationChange("contactName", err)
            }
            errorMessage={validationErrors.contactName}
          />

          {/* Parentesco */}
          <SelectInput
            label="Parentesco do contato de emergência"
            value={emergency.relationship}
            options={relationshipOptions}
            onChange={(v) => updateNested("emergency", { relationship: v })}
            required
            customValidator={isRequired}
            onValidationChange={(err) =>
              handleValidationChange("relationship", err)
            }
            errorMessage={validationErrors.relationship}
          />

          {/* Telefone */}
          <div className="flex w-full flex-row gap-4">
            <CountryCodeSelect
              width="fit"
              label="Código do país"
              value={emergency.countryCode}
              onChange={(v) => updateNested("emergency", { countryCode: v })}
            />

            <InputField
              className="w-full"
              label="Número de telefone"
              type="tel"
              placeholder="(XX) XXXXX-XXXX"
              value={emergency.phone}
              onChange={(v) =>
                updateNested("emergency", { phone: formatPhone(v) })
              }
              required
              customValidator={validatePhone}
              onValidationChange={(err) => handleValidationChange("phone", err)}
              errorMessage={validationErrors.phone}
            />
          </div>
        </form>

        <div className="flex flex-col justify-center items-center gap-4 mt-3">
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
