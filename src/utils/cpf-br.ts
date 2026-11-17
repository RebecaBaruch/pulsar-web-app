import { formatCpf } from "./input-formatting";
import { validateCpf } from "./inputs-validation";

export function cpfDigitsOnly(value: string | undefined): string {
  return value ? value.replace(/\D/g, "").slice(0, 11) : "";
}

/** Exibição: 665.025.670-61 */
export function formatCpfBr(value: string | undefined): string {
  if (!value?.trim()) return "";
  return formatCpf(cpfDigitsOnly(value));
}

export function isCpfComplete(value: string | undefined): boolean {
  if (!value?.trim()) return true;
  return validateCpf(value) === undefined && cpfDigitsOnly(value).length === 11;
}

export function validateCpfBr(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;

  const digits = cpfDigitsOnly(value);
  if (digits.length < 11) {
    return "CPF incompleto. Ex.: 665.025.670-61.";
  }

  return validateCpf(value);
}

export function cpfToStorage(value: string | undefined): string {
  return cpfDigitsOnly(value);
}