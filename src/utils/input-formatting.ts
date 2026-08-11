// src/utils/input-formatting.ts

const cleanNumber = (value: string | undefined): string => {
  return value ? value.replace(/\D/g, "") : "";
};

export const formatCpf = (value: string | undefined): string => {
  const cleaned = cleanNumber(value).slice(0, 11);

  return cleaned
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const formatPhone = (value: string | undefined): string => {
  const cleaned = cleanNumber(value).substring(0, 11); // Max 11 digitos
  if (cleaned.length > 10) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
  if (cleaned.length > 6) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }
  if (cleaned.length > 2) {
    return cleaned.replace(/^(\d{2})(\d+)$/, "($1) $2");
  }
  return cleaned;
};

export const formatCEP = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");

  const cep = numericValue.substring(0, 8);

  if (cep.length === 8) {
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  }

  return cep;
};

// src/utils/input-formatting.ts

export const ROLE_CODE_CONFIG: Record<
  string,
  { prefix: string; placeholder: string }
> = {
  "Psicólogo Clínico": { prefix: "CRP", placeholder: "CRP 00/0000" },
  "Psiquiatra": { prefix: "CRM", placeholder: "CRM 000000" },
  "Nutricionista": { prefix: "CRN", placeholder: "CRN 00000" },
  "Educador físico": { prefix: "CREF", placeholder: "CREF 000000-G/UF" },
  "Terapeuta": { prefix: "CRTH", placeholder: "CRTH 000000" },
  "Assessor Financeiro": { prefix: "ANCORD", placeholder: "ANCORD 0000000" },
};

export const formatProfessionalCode = (value: string, role?: string): string => {
  if (!value) return "";
  if (!role || !ROLE_CODE_CONFIG[role]) return value;

  const { prefix } = ROLE_CODE_CONFIG[role];

  let raw = value.toUpperCase();
  Object.values(ROLE_CODE_CONFIG).forEach((config) => {
    raw = raw.replace(config.prefix, "");
  });

  const clean = raw.replace(/[^0-9/-]/g, "").trim();

  if (!clean) return "";

  switch (role) {
    case "Psicólogo Clínico": {
      const digitsOnly = clean.replace(/\D/g, "");
      if (!digitsOnly) return `${prefix} `;
      if (digitsOnly.length <= 2) return `${prefix} ${digitsOnly}`;
      return `${prefix} ${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 8)}`;
    }

    default:
      return `${prefix} ${clean}`;
  }
};