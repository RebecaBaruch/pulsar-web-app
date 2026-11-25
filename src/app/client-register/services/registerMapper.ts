import type { BackendClientRegistrationRequest } from "@/types/backend";
import { cepToStorage } from "@/utils/cep-br";
import { formatCpfBr } from "@/utils/cpf-br";
import { normalizeRelationshipDegree } from "@/utils/relate-degree-values";
import type { RegisterData } from "../context/RegisterContext";

function phoneDigits(countryCode: string, phone: string): string {
  const code = countryCode.replace(/\D/g, "");
  const local = phone.replace(/\D/g, "");
  return `${code}${local}`;
}

function buildStreet(address: RegisterData["address"]): string {
  const base = address.street.trim();
  const numberPart =
    !address.noNumber && address.number.trim()
      ? `, ${address.number.trim()}`
      : "";
  const complementPart = address.complement.trim()
    ? ` - ${address.complement.trim()}`
    : "";
  return `${base}${numberPart}${complementPart}`;
}

/** Monta o body de `POST /api/auth/register` a partir do wizard de cadastro. */
export function registerDataToBackendRequest(
  data: RegisterData,
): BackendClientRegistrationRequest {
  const relationshipDegree = normalizeRelationshipDegree(
    data.emergency.relationship,
  );

  return {
    name: data.personal.name.trim(),
    cpf: formatCpfBr(data.personal.cpf),
    telephone: phoneDigits(data.personal.countryCode, data.personal.phone),
    email: data.email.trim(),
    password: data.security.password,
    role: "CLIENT",
    dateOfBirth: data.personal.birthdate.trim().slice(0, 10),
    address: {
      street: buildStreet(data.address),
      city: data.address.city.trim(),
      state: data.address.state.trim().toUpperCase(),
      zipCode: cepToStorage(data.address.zipCode),
      neighbourhood: data.address.district.trim(),
    },
    emergencyContact: {
      name: data.emergency.contactName.trim(),
      phoneNumber: phoneDigits(
        data.emergency.countryCode,
        data.emergency.phone,
      ),
      ...(relationshipDegree ? { relationshipDegree } : {}),
    },
  };
}