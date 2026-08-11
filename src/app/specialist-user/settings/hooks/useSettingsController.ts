import { useState } from "react";
import { SettingsTabType } from "../components/SettingsTabs";
import { ProfileFormData } from "./useProfileForm";
import { ProfileDetailsData } from "./useProfileDetailsForm";

// Mock for the "Personal Profile" tab
const initialProfileMock: ProfileFormData = {
  avatarUrl: "https://github.com/shadcn.png",
  name: "Alex Machado",
  cpf: "526.649.258-90",
  birthDate: "2003-08-11",
  email: "rebecabaruch@outlook.com",
  phone: "(13) 9981-8161",
  cep: "11900-000",
  neighborhood: "Bairro Exemplo",
  street: "Av. Nome da Rua",
  city: "Registro",
  uf: "SP",
};

// Mock for the "Profile Details" tab
const initialProfileDetailsMock: ProfileDetailsData = {
  role: "Psicólogo Clínico",

  code: "CRP 14/9236",
  price: "R$ 90,00",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis interdum tortur ut facilisis. Fusce in diam purus. Curabitur eu tortor id sapien aliquet finibus at gravida sem. Aliquam lacus justo, sollicitudin vitae orci eget, placerat vehicula mauris. Duis sed tempus urna efficitur.",
  videoUrl: "https://www.youtube.com/watch?v=FLVBxq7KQMI",
  approach: "Ex.: TCC",
  specialties: [
    "Ansiedade",
    "Depressão",
    "Relacionamentos",
    "Timidez",
    "Inteligência emocional",
    "Liderança",
    "Vocação",
    "Maternidade / Paternidade",
  ],
  education: "• Curso, Instituição, ano.",
  detailedDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae ligula a tellus euismod hendrerit ac ac ex. Praesent pharetra rutrum lorem, et efficitur lectus ornare in. Aliquam ornare, dolor eget dignissim scelerisque, diam turpis sodales tortor, a aliquet sapien metus quis felis.",
};

export const useSettingsController = () => {
  const [activeTab, setActiveTab] = useState<SettingsTabType>("personal");
  const [profileData] = useState<ProfileFormData>(initialProfileMock);
  const [profileDetailsData] = useState<ProfileDetailsData>(
    initialProfileDetailsMock,
  );

  return {
    activeTab,
    setActiveTab,
    profileData,
    profileDetailsData,
  };
};
