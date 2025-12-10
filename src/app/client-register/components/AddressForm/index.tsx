"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import InputField from "@/components/InputField";

import { formatCEP } from "@/utils/input-formatting";
import { isRequired, validateCEP } from "@/utils/inputs-validation";

import { useRegister } from "../../context/RegisterContext";

type AddressFormProps = {
  onNext: () => void;
  onBack: () => void;
};

interface FieldErrors {
  zipCode?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export default function AddressForm({ onNext, onBack }: AddressFormProps) {
  const { data, updateNested } = useRegister();
  const address = data.address;

  const formRef = React.useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = React.useState<FieldErrors>(
    {}
  );

  const isComplementRequired = address.noNumber;

  const handleValidationChange = (
    field: keyof FieldErrors,
    error: string | undefined
  ) => {
    setValidationErrors((prev) => ({ ...prev, [field]: error }));
  };

  const isFormValid = React.useMemo(() => {
    const hasErrors = Object.values(validationErrors).some(Boolean);

    const filled =
      address.zipCode.trim() !== "" &&
      address.countryName.trim() !== "" &&
      address.state.trim() !== "" &&
      address.city.trim() !== "" &&
      address.district.trim() !== "" &&
      address.street.trim() !== "";

    const numberOk = address.noNumber || address.number.trim() !== "";
    const complementOk =
      !isComplementRequired || address.complement.trim() !== "";

    return !hasErrors && filled && numberOk && complementOk;
  }, [validationErrors, address, isComplementRequired]);

  const handleSubmit = () => {
    formRef.current?.reportValidity();

    if (isComplementRequired && !address.complement.trim()) {
      handleValidationChange("complement", isRequired(address.complement));
    }

    if (isFormValid) {
      onNext();
    } else {
      console.log("Formulário de Endereço inválido:", validationErrors);
    }
  };

  return (
    <div className="flex flex-col gap-12 mb-10">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black">Endereço</h1>
        <p className="text-lg lg:text-xs 2xl:text-sm">
          Nos diga onde você está. Essas informações nos ajudam a oferecer um
          atendimento mais completo.
        </p>
      </div>

      {/* Formulário */}
      <div className="flex flex-col gap-6">
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6"
        >
          {/* CEP + País */}
          <div className="flex w-full flex-row gap-4">
            <InputField
              className="w-full"
              label="Código postal"
              type="text"
              placeholder="XXXXX-XXX"
              value={address.zipCode}
              onChange={(v) =>
                updateNested("address", { zipCode: formatCEP(v) })
              }
              required
              customValidator={validateCEP}
              onValidationChange={(err) =>
                handleValidationChange("zipCode", err)
              }
              errorMessage={validationErrors.zipCode}
            />

            <CountryCodeSelect
              mode="country"
              label="País"
              value={address.countryName}
              onChange={(v) => updateNested("address", { countryName: v })}
            />
          </div>

          {/* Estado */}
          <InputField
            label="Estado/Província"
            placeholder="Digite o estado/província"
            value={address.state}
            onChange={(v) => updateNested("address", { state: v })}
            required
            onValidationChange={(err) => handleValidationChange("state", err)}
            errorMessage={validationErrors.state}
          />

          {/* Cidade */}
          <InputField
            label="Cidade"
            type="text"
            placeholder="Digite a cidade"
            value={address.city}
            onChange={(v) => updateNested("address", { city: v })}
            required
            onValidationChange={(err) => handleValidationChange("city", err)}
            errorMessage={validationErrors.city}
          />

          {/* Distrito */}
          <InputField
            label="Bairro/Distrito"
            type="text"
            placeholder="Digite o bairro/distrito"
            value={address.district}
            onChange={(v) => updateNested("address", { district: v })}
            required
            onValidationChange={(err) =>
              handleValidationChange("district", err)
            }
            errorMessage={validationErrors.district}
          />

          <div className="flex flex-col gap-3 items-end w-full">
            <div className="flex w-full flex-row gap-4">
              <InputField
                className="flex-4/5"
                label="Rua"
                type="text"
                placeholder="Digite a rua"
                value={address.street}
                onChange={(v) => updateNested("address", { street: v })}
                required
                onValidationChange={(err) =>
                  handleValidationChange("street", err)
                }
                errorMessage={validationErrors.street}
              />

              <InputField
                className="flex-1/5"
                label="N°"
                type="number"
                placeholder="XXX"
                value={address.number}
                onChange={(v) => updateNested("address", { number: v })}
                isDisabled={address.noNumber}
                required={!address.noNumber}
                onValidationChange={(err) =>
                  handleValidationChange("number", err)
                }
                errorMessage={validationErrors.number}
              />
            </div>

            <CustomCheckbox
              label="Endereço sem número"
              checked={address.noNumber}
              onChange={(checked) => {
                updateNested("address", { noNumber: checked });

                handleValidationChange("number", undefined);

                if (checked) {
                  handleValidationChange(
                    "complement",
                    isRequired(address.complement)
                  );
                } else {
                  handleValidationChange("complement", undefined);
                }
              }}
            />
          </div>

          <InputField
            label={`Complemento ${isComplementRequired ? "" : "(opcional)"}`}
            type="text"
            placeholder="Digite o complemento"
            value={address.complement}
            onChange={(v) => updateNested("address", { complement: v })}
            required={isComplementRequired}
            onValidationChange={(err) =>
              handleValidationChange("complement", err)
            }
            errorMessage={validationErrors.complement}
          />
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
