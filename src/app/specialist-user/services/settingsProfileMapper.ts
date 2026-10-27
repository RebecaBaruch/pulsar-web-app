import { AuthUser } from "@/auth/authTypes";
import { specialistTypeLabel } from "@/utils/specialistTypeLabel";
import type { ProfileFormData } from "../settings/hooks/useProfileForm";
import type { ProfileDetailsData } from "../settings/hooks/useProfileDetailsForm";

export type BackendSpecialistProfile = {
  name?: string;
  email?: string;
  telephone?: string;
  cpf?: string;
  birthday?: string;
  specialistType?: string;
  education?: string[];
  clinicalSpecialties?: string[];
  therapeuticApproaches?: string[];
  addressResponse?: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    neighbourhood?: string;
  };
  presentation?: {
    about?: string;
    personalDescription?: string;
    presentationVideoUrl?: string;
  };
};

export function mapSpecialistSettings(
  profile: BackendSpecialistProfile,
  details: Record<string, unknown>,
  sessionUser: AuthUser,
): { profile: ProfileFormData; details: ProfileDetailsData } {
  const address = profile.addressResponse;
  const presentation = profile.presentation ?? {};
  const priceValue = details.price;

  const price =
    typeof priceValue === "number"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(priceValue)
      : "R$ —";

  return {
    profile: {
      avatarUrl: sessionUser.avatarUrl ?? "",
      name: profile.name ?? sessionUser.name,
      cpf: profile.cpf ?? "",
      birthDate: profile.birthday?.slice(0, 10) ?? "",
      email: profile.email ?? sessionUser.email,
      phone: profile.telephone ?? "",
      cep: address?.zipcode ?? "",
      neighborhood: address?.neighbourhood ?? "",
      street: address?.street ?? "",
      city: address?.city ?? "",
      uf: address?.state ?? "",
    },
    details: {
      role: specialistTypeLabel(
        (profile.specialistType ??
          details.specialistType) as string | undefined,
      ),
      code: String(details.registrationNumber ?? ""),
      price,
      summary: String(presentation.about ?? ""),
      videoUrl: String(presentation.presentationVideoUrl ?? ""),
      approach: (profile.therapeuticApproaches ?? []).join(", "),
      specialties: profile.clinicalSpecialties ?? [],
      education: (profile.education ?? []).join("\n"),
      detailedDescription: String(presentation.personalDescription ?? ""),
    },
  };
}
