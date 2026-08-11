import { useState, useEffect, useMemo } from "react";

export interface ProfileDetailsData {
  role: string;
  code: string;
  price: string;
  summary: string;
  videoUrl: string;
  approach: string;
  specialties: string[];
  education: string;
  detailedDescription: string;
}

export const useProfileDetailsForm = (initialData: ProfileDetailsData) => {
  const [formData, setFormData] = useState<ProfileDetailsData>(initialData);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Verify if the form data has changed compared to the initial data
  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  }, [formData, initialData]);

  const handleChange = <K extends keyof ProfileDetailsData>(
    field: K,
    value: ProfileDetailsData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Logic for Adding Specialty
  const handleAddSpecialty = () => {
    const trimmed = newSpecialty.trim();
    if (trimmed && !formData.specialties.includes(trimmed)) {
      handleChange("specialties", [...formData.specialties, trimmed]);
      setNewSpecialty("");
    }
  };

  // Logic for Removing Specialty
  const handleRemoveSpecialty = (itemToRemove: string) => {
    handleChange(
      "specialties",
      formData.specialties.filter((item) => item !== itemToRemove)
    );
  };

  const handleReset = () => {
    setFormData(initialData);
    setNewSpecialty("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulation of API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Dados salvos:", formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};