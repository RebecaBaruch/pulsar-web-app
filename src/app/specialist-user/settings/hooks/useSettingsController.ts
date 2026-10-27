import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SettingsTabType } from "../components/SettingsTabs";
import { ProfileFormData } from "./useProfileForm";
import { ProfileDetailsData } from "./useProfileDetailsForm";
import { fetchSpecialistSettings } from "../../services/specialistApi";

const emptyProfile: ProfileFormData = {
  avatarUrl: "",
  name: "",
  cpf: "",
  birthDate: "",
  email: "",
  phone: "",
  cep: "",
  neighborhood: "",
  street: "",
  city: "",
  uf: "",
};

const emptyDetails: ProfileDetailsData = {
  role: "",
  code: "",
  price: "",
  summary: "",
  videoUrl: "",
  approach: "",
  specialties: [],
  education: "",
  detailedDescription: "",
};

export const useSettingsController = () => {
  const [activeTab, setActiveTab] = useState<SettingsTabType>("personal");
  const [profileData, setProfileData] = useState<ProfileFormData>(emptyProfile);
  const [profileDetailsData, setProfileDetailsData] =
    useState<ProfileDetailsData>(emptyDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchSpecialistSettings();
        if (cancelled) return;
        setProfileData(data.profile);
        setProfileDetailsData(data.details);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar suas configurações.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    activeTab,
    setActiveTab,
    profileData,
    profileDetailsData,
    loading,
  };
};
