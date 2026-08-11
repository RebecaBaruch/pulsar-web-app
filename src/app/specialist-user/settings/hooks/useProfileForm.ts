import { useState, useMemo } from "react";

export interface ProfileFormData {
  // personal data
  avatarUrl: string;
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  // address data
  cep: string;
  neighborhood: string;
  street: string;
  city: string;
  uf: string;
}

export const useProfileForm = (initialData: ProfileFormData) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [shouldValidate, setShouldValidate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  }, [formData, initialData]);

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(initialData);
    setShouldValidate(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShouldValidate(true);

    setIsSubmitting(true);
    try {
      console.log("Submetendo formulário:", formData);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isDirty,
    shouldValidate,
    isSubmitting,
    handleChange,
    handleReset,
    handleSubmit,
  };
};