/**
 * Telefone Brasil com DDI: +55 11 98765-4321 (celular) ou +55 11 3333-4444 (fixo).
 */

export function phoneDigitsOnly(value: string | undefined): string {
  return value ? value.replace(/\D/g, "") : "";
}

/** Normaliza para até 13 dígitos (55 + DDD + assinante). */
export function normalizeBrazilPhoneDigits(value: string | undefined): string {
  let digits = phoneDigitsOnly(value);
  if (!digits) return "";

  if (digits.startsWith("0")) {
    digits = digits.replace(/^0+/, "");
  }

  if (!digits.startsWith("55") && digits.length <= 11) {
    digits = `55${digits}`;
  }

  return digits.slice(0, 13);
}

function formatSubscriberNumber(subscriber: string): string {
  if (!subscriber) return "";

  const isMobile =
    subscriber[0] === "9" || subscriber.length > 8;
  const maxLen = isMobile ? 9 : 8;
  const num = subscriber.slice(0, maxLen);

  if (num.length <= 4) return num;

  if (isMobile) {
    if (num.length <= 5) return num;
    return `${num.slice(0, 5)}-${num.slice(5)}`;
  }

  return `${num.slice(0, 4)}-${num.slice(4)}`;
}

/** Exibe no input; aceita valor cru do banco (só dígitos). */
export function formatPhoneIntlBr(value: string | undefined): string {
  const digits = normalizeBrazilPhoneDigits(value);
  if (!digits) return "";

  if (digits.length <= 2) {
    return `+${digits}`;
  }

  const ddd = digits.slice(2, 4);
  const subscriber = digits.slice(4);

  let out = "+55";
  if (digits.length > 2) {
    out += ` ${ddd}`;
  }
  if (subscriber) {
    out += ` ${formatSubscriberNumber(subscriber)}`;
  }

  return out;
}

export function isPhoneIntlBrComplete(value: string | undefined): boolean {
  if (!value?.trim()) return true;

  const digits = normalizeBrazilPhoneDigits(value);
  if (digits.length === 13) {
    const local = digits.slice(4);
    return local.length === 9 && local[0] === "9";
  }
  if (digits.length === 12) {
    const local = digits.slice(4);
    // 12 dígitos com nono dígito inicial 9 ainda é celular incompleto
    if (local[0] === "9") return false;
    return local.length === 8;
  }
  return false;
}

export type PhoneIntlBrValidation = string | undefined;

export function validatePhoneIntlBr(
  value: string | undefined,
): PhoneIntlBrValidation {
  if (!value?.trim()) return undefined;

  const digits = normalizeBrazilPhoneDigits(value);

  if (digits.length <= 2) {
    return "Informe o DDD e o número.";
  }
  if (digits.length < 12) {
    return "Número incompleto. Ex.: +55 11 98765-4321.";
  }
  if (digits.length === 12) {
    const local = digits.slice(4);
    if (local[0] === "9") {
      return "Número incompleto. Ex.: +55 11 98765-4321.";
    }
    return undefined;
  }
  if (digits.length === 13) {
    const local = digits.slice(4);
    if (local[0] !== "9") {
      return "Celular deve começar com 9 após o DDD.";
    }
    return undefined;
  }

  return "Número inválido.";
}

export function phoneIntlBrToStorage(value: string | undefined): string {
  return normalizeBrazilPhoneDigits(value);
}