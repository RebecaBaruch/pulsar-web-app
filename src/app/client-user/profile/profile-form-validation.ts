import type { LocalUser } from "./profile-types";
import { validateCepBr } from "@/utils/cep-br";
import { validateCpfBr } from "@/utils/cpf-br";
import { validateEmail } from "@/utils/inputs-validation";
import {
  isRelationshipDegree,
  normalizeRelationshipDegree,
} from "@/utils/relate-degree-values";
import { validatePhoneIntlBr } from "@/utils/phone-intl-br";

export const PROFILE_FORM_FIELD_KEYS = [
  "name",
  "email",
  "cpf",
  "phone",
  "emergencyName",
  "emergencyRelation",
  "emergencyPhone",
  "cep",
  "street",
  "neighborhood",
  "city",
  "uf",
] as const;

export type ProfileFormFieldKey = (typeof PROFILE_FORM_FIELD_KEYS)[number];

export function isProfileFormFieldKey(
  key: keyof LocalUser,
): key is ProfileFormFieldKey {
  return (PROFILE_FORM_FIELD_KEYS as readonly string[]).includes(key);
}

function minText(value: string, min = 2): string | undefined {
  if (value.length < min) {
    return `Informe pelo menos ${min} caracteres.`;
  }
  return undefined;
}

export function validateProfileField(
  key: ProfileFormFieldKey,
  rawValue: string | undefined,
): string | undefined {
  const value = rawValue?.trim() ?? "";
  if (!value) return undefined;

  switch (key) {
    case "name":
    case "emergencyName":
      return minText(value);
    case "email":
      return validateEmail(value);
    case "cpf":
      return validateCpfBr(rawValue);
    case "phone":
    case "emergencyPhone":
      return validatePhoneIntlBr(rawValue);
    case "cep":
      return validateCepBr(rawValue);
    case "street":
    case "neighborhood":
    case "city":
      return minText(value);
    case "uf":
      if (!/^[A-Za-z]{2}$/.test(value)) {
        return "UF deve ter 2 letras (ex.: SP).";
      }
      return undefined;
    case "emergencyRelation": {
      const degree = normalizeRelationshipDegree(value);
      if (!isRelationshipDegree(degree)) {
        return "Selecione um parentesco válido.";
      }
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateProfileForm(
  form: LocalUser,
): Partial<Record<ProfileFormFieldKey, string>> {
  const errors: Partial<Record<ProfileFormFieldKey, string>> = {};

  for (const key of PROFILE_FORM_FIELD_KEYS) {
    const err = validateProfileField(key, form[key]);
    if (err) errors[key] = err;
  }

  return errors;
}

export function profileFormCanSave(form: LocalUser): boolean {
  return Object.keys(validateProfileForm(form)).length === 0;
}

export function formatProfileFieldInput(
  key: ProfileFormFieldKey,
  value: string,
): string {
  if (key === "uf") {
    return value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
  }
  return value;
}