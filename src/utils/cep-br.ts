import { formatCEP } from "./input-formatting";

export function cepDigitsOnly(value: string | undefined): string {
  return value ? value.replace(/\D/g, "").slice(0, 8) : "";
}

/** Exibição: 01000-000 */
export function formatCepBr(value: string | undefined): string {
  if (!value?.trim()) return "";
  return formatCEP(cepDigitsOnly(value));
}

export function isCepComplete(value: string | undefined): boolean {
  if (!value?.trim()) return true;
  return cepDigitsOnly(value).length === 8;
}

export function validateCepBr(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;

  const digits = cepDigitsOnly(value);
  if (digits.length < 8) {
    return "CEP incompleto. Ex.: 01000-000.";
  }
  return undefined;
}

export function cepToStorage(value: string | undefined): string {
  return cepDigitsOnly(value);
}