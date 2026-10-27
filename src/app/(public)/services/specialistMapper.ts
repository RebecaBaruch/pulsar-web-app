import type {
  BackendSpecialistDetails,
  SpecialistType as BackendSpecialistTypeEnum,
} from "@/types/backend";
import { specialistTypeLabel } from "@/utils/specialistTypeLabel";
import type { SpecialistType } from "../find-specialist/components/SpecialistCard/type";

type BackendListItem = {
  id: string;
  name: string;
  city?: string;
  state?: string;
  price?: number;
  sessionsCompleted?: number;
  specialistType?: BackendSpecialistTypeEnum;
  presentation?: BackendSpecialistDetails["presentation"];
};

const PLACEHOLDER_AVATAR =
  "https://ui-avatars.com/api/?background=e5e7eb&color=1f2937&name=";

function formatPrice(value?: number): string {
  if (value == null || Number.isNaN(value)) return "R$ —";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function imageFromPresentation(
  presentation?: BackendSpecialistDetails["presentation"],
  name?: string,
): string {
  const b64 = presentation?.base64Image;
  if (b64?.startsWith("data:")) return b64;
  if (b64 && b64.length > 20) return `data:image/jpeg;base64,${b64}`;
  return `${PLACEHOLDER_AVATAR}${encodeURIComponent(name ?? "E")}`;
}

function approachesFromPresentation(
  presentation?: BackendSpecialistDetails["presentation"],
) {
  const items =
    presentation?.therapeuticApproaches ??
    presentation?.specializations ??
    [];
  return items.slice(0, 6).map((label) => ({ label }));
}

export function mapBackendListItem(item: BackendListItem): SpecialistType {
  const presentation = item.presentation;
  const roleLabel = specialistTypeLabel(item.specialistType);
  return {
    id: item.id,
    name: item.name,
    role:
      roleLabel !== "Especialista"
        ? roleLabel
        : (presentation?.about ?? "Especialista"),
    crm: "",
    location: [item.city, item.state].filter(Boolean).join(", "),
    rating: 5,
    specialties: (presentation?.specializations ?? []).map((label) => ({
      label,
    })),
    reviews: item.sessionsCompleted ?? 0,
    approach: approachesFromPresentation(presentation),
    price: formatPrice(item.price),
    imgSrc: imageFromPresentation(presentation, item.name),
    about: presentation?.about,
    education: presentation?.academicHistory ?? [],
    personalDescription: presentation?.personalDescription ?? "",
  };
}

export function mapBackendDetails(
  details: BackendSpecialistDetails,
): SpecialistType {
  const presentation = details.presentation;
  return {
    id: details.id,
    name: details.name,
    role: specialistTypeLabel(details.specialistType),
    crm: details.registrationNumber ?? "",
    location: [details.city, details.state].filter(Boolean).join(", "),
    rating: 5,
    specialties: (presentation?.specializations ?? []).map((label) => ({
      label,
    })),
    reviews: details.sessionsCompleted ?? 0,
    approach: approachesFromPresentation(presentation),
    price: formatPrice(details.price),
    imgSrc: imageFromPresentation(presentation, details.name),
    about: presentation?.about,
    education: presentation?.academicHistory ?? [],
    personalDescription: presentation?.personalDescription ?? "",
  };
}
