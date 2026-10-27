import { AuthUser } from "@/auth/authTypes";
import { specialistTypeLabel } from "@/utils/specialistTypeLabel";
import type { BackendSpecialistDetails } from "@/types/backend";
import type { ProfileFormData } from "../settings/hooks/useProfileForm";
import type { ProfileDetailsData } from "../settings/hooks/useProfileDetailsForm";

export type BackendSpecialistProfile = {
  name?: string;
  email?: string;
  telephone?: string;
  phone?: string;
  cpf?: string;
  birthday?: string;
  dateOfBirth?: string;
  birthDate?: string;
  specialistType?: string;
  education?: string[];
  clinicalSpecialties?: string[];
  therapeuticApproaches?: string[];
  addressResponse?: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    zipCode?: string;
    neighbourhood?: string;
  };
  presentation?: {
    about?: string;
    personalDescription?: string;
    presentationVideoUrl?: string;
    base64Image?: string;
    academicHistory?: string[];
    specializations?: string[];
    therapeuticApproaches?: string[];
  };
};

function readString(source: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function readBirthday(profile: BackendSpecialistProfile): string {
  const raw =
    profile.birthday ?? profile.dateOfBirth ?? profile.birthDate ?? "";
  return raw ? raw.slice(0, 10) : "";
}

function resolveAvatarUrl(
  sessionUser: AuthUser,
  profile: BackendSpecialistProfile,
  details: BackendSpecialistDetails | Record<string, unknown>,
): string {
  if (sessionUser.avatarUrl?.trim()) return sessionUser.avatarUrl.trim();

  const presentation =
    profile.presentation ??
    (typeof details === "object" && details && "presentation" in details
      ? (details as BackendSpecialistDetails).presentation
      : undefined);

  const base64 = presentation?.base64Image?.trim();
  if (!base64) return "";
  if (base64.startsWith("data:")) return base64;
  return `data:image/jpeg;base64,${base64}`;
}

export function mapSpecialistSettings(
  profile: BackendSpecialistProfile,
  detailsRaw: Record<string, unknown>,
  sessionUser: AuthUser,
): { profile: ProfileFormData; details: ProfileDetailsData } {
  const details = detailsRaw as BackendSpecialistDetails;
  const address = profile.addressResponse;
  const presentation =
    profile.presentation ?? details.presentation ?? {};
  const priceValue = details.price;

  const price =
    typeof priceValue === "number"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(priceValue)
      : "R$ —";

  const profileRecord = profile as unknown as Record<string, unknown>;
  const phone = readString(profileRecord, "telephone", "phone", "phoneNumber");

  const specialties =
    profile.clinicalSpecialties ??
    presentation.specializations ??
    [];

  const educationItems =
    profile.education ??
    presentation.academicHistory ??
    [];

  const approaches =
    profile.therapeuticApproaches ??
    presentation.therapeuticApproaches ??
    [];

  return {
    profile: {
      avatarUrl: resolveAvatarUrl(sessionUser, profile, details),
      name: profile.name ?? sessionUser.name ?? "",
      cpf: profile.cpf ?? "",
      birthDate: readBirthday(profile),
      email: profile.email ?? sessionUser.email ?? "",
      phone,
      cep: address?.zipcode ?? address?.zipCode ?? "",
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
      approach: approaches.join(", "),
      specialties,
      education: educationItems.join("\n"),
      detailedDescription: String(presentation.personalDescription ?? ""),
    },
  };
}
