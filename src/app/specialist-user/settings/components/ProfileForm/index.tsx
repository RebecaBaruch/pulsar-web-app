import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLocationDot,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import InputField from "@/components/InputField";
import { useProfileForm, ProfileFormData } from "../../hooks/useProfileForm";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import Image from "next/image";

interface ProfileFormProps {
  initialData: ProfileFormData;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const {
    formData,
    isDirty,
    shouldValidate,
    isSubmitting,
    handleChange,
    handleReset,
    handleSubmit,
  } = useProfileForm(initialData);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-4xl space-y-6"
    >
      {/* Profile pic */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={formData.avatarUrl || "/placeholder-avatar.png"}
            alt="Foto de Perfil"
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-gray-900">
            Foto de perfil
          </h4>
          <p className="text-xs text-gray-500">JP ou PNG. Máx. 5MB.</p>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 border border-blue text-blue bg-blue-20 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faUpload} className="text-xs" />
            Upload
          </button>
        </div>
      </div>

      {/* Personal data */}
      <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white space-y-4">
        <div className="flex items-start gap-2.5 mb-2">
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-700 text-sm mt-0.5"
          />
          <div>
            <h3 className="text-sm font-bold text-gray-900">Dados pessoais</h3>
            <p className="text-xs text-gray-500">
              Seus dados pessoais e de contato.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputField
            label="Nome"
            placeholder="Seu nome"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
            required
            shouldValidate={shouldValidate}
            className="sm:col-span-2 md:col-span-1"
          />
          <InputField
            label="CPF"
            type="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(val) => handleChange("cpf", val)}
            required
            shouldValidate={shouldValidate}
          />
          <InputField
            label="Data de nascimento"
            type="date"
            skipTypeValidation
            value={formData.birthDate}
            onChange={(val) => handleChange("birthDate", val)}
            required
            shouldValidate={shouldValidate}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            required
            shouldValidate={shouldValidate}
          />
          <InputField
            label="Telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
            required
            shouldValidate={shouldValidate}
          />
        </div>
      </div>

      {/* Address for Billing */}
      <div className={`border border-gray-200 rounded-lg p-4 sm:p-5 bg-white space-y-4 ${isDirty ? "mb-24" : ""}`}>
        <div className="flex items-start gap-2.5 mb-2">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-gray-700 text-sm mt-0.5"
          />
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Endereço para faturamento
            </h3>
            <p className="text-xs text-gray-500">
              Seus dados pessoais e de contato.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="CEP"
            placeholder="00000-000"
            value={formData.cep}
            onChange={(val) => handleChange("cep", val)}
            required
            shouldValidate={shouldValidate}
          />
          <InputField
            label="Bairro"
            placeholder="Bairro"
            value={formData.neighborhood}
            onChange={(val) => handleChange("neighborhood", val)}
            required
            shouldValidate={shouldValidate}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-4">
          <InputField
            label="Rua"
            placeholder="Av. Nome da Rua"
            value={formData.street}
            onChange={(val) => handleChange("street", val)}
            required
            shouldValidate={shouldValidate}
            className="sm:col-span-6 md:col-span-6"
          />
          <InputField
            label="Cidade"
            placeholder="Cidade"
            value={formData.city}
            onChange={(val) => handleChange("city", val)}
            required
            shouldValidate={shouldValidate}
            className="sm:col-span-4 md:col-span-4"
          />
          <InputField
            label="UF"
            placeholder="SP"
            value={formData.uf}
            onChange={(val) => handleChange("uf", val)}
            required
            shouldValidate={shouldValidate}
            className="sm:col-span-2 md:col-span-2"
          />
        </div>
      </div>

      {isDirty && (
        <div className="fixed bottom-0 right-0 left-0 lg:left-52 z-30 border-t border-gray-200 p-4 lg:px-12 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] bg-white flex items-center justify-end gap-3 transition-all">
          <div className="flex flex-col md:flex-row w-full lg:w-fit gap-2 md:gap-4 items-center lg:justify-end">
            <div className="w-full lg:w-fit order-1 md:order-2">
              <PrimaryButton
                type="submit"
                text={isSubmitting ? "Salvando..." : "Salvar alterações"}
                isDisabled={isSubmitting}
              />
            </div>

            <div className="w-full lg:w-fit order-2 md:order-1">
              <SecondaryButton
                type="button"
                text="Cancelar"
                onClick={handleReset}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
