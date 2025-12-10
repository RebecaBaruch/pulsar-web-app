// src/utils/validation.ts
export type ValidationResult = string | undefined;

export type Validator = (value: string | undefined) => ValidationResult;

const cleanNumber = (value: string | undefined): string => {
  return value ? value.replace(/\D/g, "") : "";
};

export const isRequired: Validator = (value) => {
  if (!value || value.trim() === "") {
    return "Campo obrigatório.";
  }
  return undefined;
};

export const validateEmail: Validator = (value) => {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Formato de e-mail inválido.";
  }
  return undefined;
};

export const validatePassword: Validator = (value) => {
  if (!value) {
    return undefined;
  }

  if (value.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres.";
  }

  const passwordRegex = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-+_])[A-Za-z\d!@#$%^&*()-+_]{8,}$/
  );

  if (!passwordRegex.test(value)) {
    return "A senha deve conter letras, números e um caractere especial (ex: !, @, #, $).";
  }

  return undefined;
};

export const validateNumber: Validator = (value) => {
  if (value && isNaN(Number(value))) {
    return "Deve ser um número válido.";
  }
  return undefined;
};

export const validateCpf: Validator = (value) => {
  const cpf = cleanNumber(value);

  if (!cpf) return undefined;

  if (cpf.length !== 11) {
    return "O CPF deve ter 11 dígitos.";
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return "CPF inválido (sequência repetida).";
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return "CPF inválido.";
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return "CPF inválido.";
  }

  return undefined;
};

export const validatePhone: Validator = (value) => {
  const phone = cleanNumber(value);

  if (!phone) return undefined;

  if (!/^\d{10,11}$/.test(phone)) {
    return "Telefone deve ter 10 ou 11 dígitos (com DDD).";
  }

  return undefined;
};

export const runValidators = (
  value: string | undefined,
  validators: Validator[]
): ValidationResult => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return undefined;
};

export const validateCEP: Validator = (value) => {
  if (!value) {
    return undefined;
  }

  const digits = String(value).replace(/\D/g, "");

  if (digits.length < 8) {
    return "O CEP deve ter 8 dígitos.";
  }

  if (!/^\d{5}-?\d{3}$/.test(value)) {
    return "Formato de CEP inválido.";
  }

  return undefined;
};
