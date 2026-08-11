// components/Forms/ProfileDetailsForm.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faListCheck,
  faLink,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import SelectInput from "@/components/SelectInput";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import {
  useProfileDetailsForm,
  ProfileDetailsData,
} from "../../hooks/useProfileDetailsForm";
import {
  formatProfessionalCode,
  ROLE_CODE_CONFIG,
} from "@/utils/input-formatting";

interface ProfileDetailsFormProps {
  initialData: ProfileDetailsData;
}

const ROLE_OPTIONS = [
  { value: "Psicólogo Clínico", label: "Psicólogo Clínico" },
  { value: "Psiquiatra", label: "Psiquiatra" },
  { value: "Terapeuta", label: "Terapeuta" },
  { value: "Educador físico", label: "Educador físico" },
  { value: "Nutricionista", label: "Nutricionista" },
  { value: "Assessor Financeiro", label: "Assessor Financeiro" },
];

export const ProfileDetailsForm: React.FC<ProfileDetailsFormProps> = ({
  initialData,
}) => {
  const {
    formData,
    newSpecialty,
    isDirty,
    isSubmitting,
    setNewSpecialty,
    handleChange,
    handleAddSpecialty,
    handleRemoveSpecialty,
    handleReset,
    handleSubmit,
  } = useProfileDetailsForm(initialData);

  // manipulates the role change and reformats the professional code if necessary
  const handleRoleChange = (newRole: string) => {
    handleChange("role", newRole);

    if (formData.code) {
      const updatedCode = formatProfessionalCode(formData.code, newRole);
      handleChange("code", updatedCode);
    }
  };

  // manipulates the professional code input and formats it according to the selected role
  const handleCodeChange = (rawCode: string) => {
    const formatted = formatProfessionalCode(rawCode, formData.role);
    handleChange("code", formatted);
  };

  // defines the placeholder for the professional code input based on the selected role
  const codePlaceholder =
    formData.role && ROLE_CODE_CONFIG[formData.role]
      ? ROLE_CODE_CONFIG[formData.role].placeholder
      : "Selecione uma atuação";

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-4xl space-y-6 ${isDirty ? "pb-24" : ""}`}
    >
      <div>
        <h2 className="text-base font-bold text-gray-900">
          Detalhes do perfil de atendimento
        </h2>
        <p className="text-xs text-gray-500">
          As informações abaixo serão exibidas para seus pacientes.
        </p>
      </div>

      {/* Block 1: Presentation */}
      <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white space-y-4">
        <div className="flex items-start gap-2.5 mb-2">
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-700 text-xs mt-0.5"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Apresentação
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          {/* Custom Select Input */}
          <SelectInput
            label="Atuação"
            options={ROLE_OPTIONS}
            value={formData.role}
            placeholder="Selecione a atuação"
            onChange={(val) => handleRoleChange(val as string)}
          />

          {/* code input */}
          <InputField
            label="Código profissional"
            placeholder={codePlaceholder}
            value={formData.code}
            onChange={handleCodeChange}
            isDisabled={!formData.role} // disable if no role is selected
          />

          <InputField
            label="Preço por consulta"
            placeholder="R$ 00,00"
            value={formData.price}
            onChange={(val) => handleChange("price", val)}
          />
        </div>

        <TextareaField
          label="Sobre (resumo)"
          placeholder="Escreva um breve resumo sobre você..."
          maxLength={500}
          value={formData.summary}
          onChange={(val) => handleChange("summary", val)}
        />

        {/* Video with link icon */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">
            Vídeo de apresentação
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FontAwesomeIcon icon={faLink} className="text-xs" />
            </span>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.videoUrl}
              onChange={(e) => handleChange("videoUrl", e.target.value)}
              className="w-full pl-8 p-3 text-xs text-blue-600 underline border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-lightest"
            />
          </div>
        </div>
      </div>

      {/* Block 2: Details of the Specialist */}
      <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white space-y-4">
        <div className="flex items-start gap-2.5 mb-2">
          <FontAwesomeIcon
            icon={faListCheck}
            className="text-gray-700 text-xs mt-0.5"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Detalhes do especialista
            </h3>
          </div>
        </div>

        <InputField
          label="Abordagem"
          placeholder="Ex.: TCC"
          value={formData.approach}
          onChange={(val) => handleChange("approach", val)}
        />

        {/* Add specialties */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Especialidades
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex.: Ansiedade"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSpecialty();
                }
              }}
              className="flex-1 p-3 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-lightest"
            />
            <div>
              <PrimaryButton
                text="Adicionar"
                icon={faPlus}
                onClick={handleAddSpecialty}
              />
            </div>
          </div>

          {/* Tags / Chips of specialties */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {formData.specialties.map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 hover:text-blue-900 text-blue text-xs font-medium border border-blue-100"
              >
                {spec}
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialty(spec)}
                  className="cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-[11px]" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <TextareaField
          label="Formação"
          placeholder="• Curso, Instituição, ano."
          maxLength={1000}
          rows={3}
          value={formData.education}
          onChange={(val) => handleChange("education", val)}
        />

        <TextareaField
          label="Descrição detalhada"
          placeholder="Escreva detalhes sobre sua trajetória e metodologia..."
          maxLength={1000}
          rows={5}
          value={formData.detailedDescription}
          onChange={(val) => handleChange("detailedDescription", val)}
        />
      </div>

      {/* Fixed Action Bar */}
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
