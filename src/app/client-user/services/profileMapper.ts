import { AuthUser } from "@/auth/authTypes";
import { LocalUser } from "../profile/profile-types";
import type {
  BackendAddressResponse,
  BackendClientProfile,
  BackendClientProfilePatch,
  BackendEmergencyContact,
} from "@/types/backend";
import {
  cepToStorage,
  formatCepBr,
  isCepComplete,
} from "@/utils/cep-br";
import {
  cpfToStorage,
  formatCpfBr,
  isCpfComplete,
} from "@/utils/cpf-br";
import { validateProfileForm } from "../profile/profile-form-validation";
import type { ProfileFormFieldKey } from "../profile/profile-form-validation";
import { normalizeRelationshipDegree } from "@/utils/relate-degree-values";
import {
  formatPhoneIntlBr,
  isPhoneIntlBrComplete,
  phoneIntlBrToStorage,
} from "@/utils/phone-intl-br";

function pickNonEmpty(...values: (string | undefined | null)[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function readProfileString(
  source: Record<string, unknown> | undefined,
  ...keys: string[]
): string {
  if (!source) return "";
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && !Number.isNaN(value)) {
      return String(value);
    }
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function readBirthday(profile: BackendClientProfile | null): string | undefined {
  const raw = readProfileString(
    profile as unknown as Record<string, unknown> | undefined,
    "birthday",
    "dateOfBirth",
    "birthDate",
  );
  return raw ? raw.slice(0, 10) : undefined;
}

function unwrapBackendProfileBody(raw: unknown): Record<string, unknown> | null {
  if (raw == null || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const data = record.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data as Record<string, unknown>;
  }
  return record;
}

function mapAddressResponse(raw: unknown): BackendAddressResponse | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const address = raw as Record<string, unknown>;

  const street = readProfileString(address, "street");
  const city = readProfileString(address, "city");
  const state = readProfileString(address, "state");
  const zipcode = readProfileString(address, "zipcode");
  const neighbourhood = readProfileString(address, "neighbourhood");

  if (!street && !city && !state && !zipcode && !neighbourhood) {
    return undefined;
  }

  return { street, city, state, zipcode, neighbourhood };
}

function mapEmergencyContact(raw: unknown): BackendEmergencyContact | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const emergency = raw as Record<string, unknown>;

  const name = readProfileString(emergency, "name");
  const phoneNumber = readProfileString(emergency, "phoneNumber");
  const relationshipDegree = normalizeRelationshipDegree(
    readProfileString(emergency, "relationshipDegree"),
  );

  if (!name && !phoneNumber && !relationshipDegree) return undefined;

  return {
    name,
    phoneNumber,
    relationshipDegree: relationshipDegree || undefined,
  };
}

/** Lê o corpo do backend sem renomear campos. */
export function parseBackendClientProfile(
  raw: unknown,
): BackendClientProfile | null {
  const source = unwrapBackendProfileBody(raw);
  if (!source) return null;

  const profile: BackendClientProfile = {
    name: readProfileString(source, "name") || undefined,
    email: readProfileString(source, "email") || undefined,
    cpf: readProfileString(source, "cpf") || undefined,
    telephone: readProfileString(source, "telephone") || undefined,
    birthday: readProfileString(source, "birthday") || undefined,
  };

  if (source.addressResponse) {
    profile.addressResponse = mapAddressResponse(source.addressResponse);
  }

  if (source.emergencyContact) {
    profile.emergencyContact = mapEmergencyContact(source.emergencyContact);
  }

  const hasScalar = Boolean(
    profile.name ||
      profile.email ||
      profile.cpf ||
      profile.telephone ||
      profile.birthday,
  );
  const hasNested = Boolean(profile.addressResponse || profile.emergencyContact);

  return hasScalar || hasNested ? profile : null;
}

export function mergeProfileWithAuth(
  profile: LocalUser | null | undefined,
  authUser: AuthUser | null | undefined,
): LocalUser | undefined {
  const id = profile?.id ?? authUser?.id;
  if (!id) return undefined;

  return {
    ...(authUser ?? {}),
    ...profile,
    id,
    name: pickNonEmpty(profile?.name, authUser?.name),
    email: pickNonEmpty(profile?.email, authUser?.email),
    role: profile?.role ?? authUser?.role ?? "CLIENT",
    avatarUrl: profile?.avatarUrl ?? authUser?.avatarUrl ?? undefined,
  };
}

/** Adapta o contrato do backend ao estado do formulário (somente leitura → UI). */
export function profileToLocalUser(
  sessionUser: AuthUser,
  profile: BackendClientProfile | null,
): LocalUser {
  const address = profile?.addressResponse;

  return {
    id: sessionUser.id,
    name: pickNonEmpty(profile?.name, sessionUser.name),
    email: pickNonEmpty(profile?.email, sessionUser.email),
    role: sessionUser.role,
    avatarUrl: sessionUser.avatarUrl,
    cpf: profile?.cpf ? formatCpfBr(profile.cpf) : undefined,
    phone: profile?.telephone ? formatPhoneIntlBr(profile.telephone) : undefined,
    birthDate: readBirthday(profile),
    emergencyName: profile?.emergencyContact?.name,
    emergencyPhone: profile?.emergencyContact?.phoneNumber
      ? formatPhoneIntlBr(profile.emergencyContact.phoneNumber)
      : undefined,
    emergencyRelation:
      normalizeRelationshipDegree(
        profile?.emergencyContact?.relationshipDegree,
      ) || undefined,
    cep: address?.zipcode ? formatCepBr(address.zipcode) : undefined,
    street: address?.street,
    neighborhood: address?.neighbourhood,
    city: address?.city,
    uf: address?.state,
  };
}

function fieldIsValid(
  errors: Partial<Record<ProfileFormFieldKey, string>>,
  key: ProfileFormFieldKey,
): boolean {
  return !errors[key];
}

/** Monta o body do PATCH com os nomes esperados pelo backend Java. */
export function localUserToUpdatePayload(
  form: LocalUser,
): BackendClientProfilePatch {
  const errors = validateProfileForm(form);
  const payload: BackendClientProfilePatch = {};

  if (form.name?.trim() && fieldIsValid(errors, "name")) {
    payload.name = form.name.trim();
  }
  if (form.email?.trim() && fieldIsValid(errors, "email")) {
    payload.email = form.email.trim();
  }
  if (
    form.cpf?.trim() &&
    fieldIsValid(errors, "cpf") &&
    isCpfComplete(form.cpf)
  ) {
    payload.cpf = cpfToStorage(form.cpf);
  }
  if (
    form.phone?.trim() &&
    fieldIsValid(errors, "phone") &&
    isPhoneIntlBrComplete(form.phone)
  ) {
    payload.telephone = phoneIntlBrToStorage(form.phone);
  }
  if (form.birthDate?.trim()) {
    payload.birthday = form.birthDate.trim().slice(0, 10);
  }

  const hasAddressValue =
    form.cep?.trim() ||
    form.street?.trim() ||
    form.city?.trim() ||
    form.uf?.trim() ||
    form.neighborhood?.trim();

  const addressKeys = [
    "cep",
    "street",
    "neighborhood",
    "city",
    "uf",
  ] as const satisfies readonly ProfileFormFieldKey[];
  const addressValid = addressKeys.every((key) => fieldIsValid(errors, key));

  const zipcode =
    form.cep?.trim() && isCepComplete(form.cep)
      ? cepToStorage(form.cep)
      : undefined;

  if (hasAddressValue && addressValid) {
    payload.addressResponse = {
      street: form.street?.trim() ?? "",
      city: form.city?.trim() ?? "",
      state: form.uf?.trim().toUpperCase() ?? "",
      zipcode: zipcode ?? "",
      neighbourhood: form.neighborhood?.trim() ?? "",
    };
  }

  const hasEmergencyValue =
    form.emergencyName?.trim() ||
    form.emergencyPhone?.trim() ||
    form.emergencyRelation?.trim();

  const emergencyKeys = [
    "emergencyName",
    "emergencyPhone",
    "emergencyRelation",
  ] as const satisfies readonly ProfileFormFieldKey[];
  const emergencyValid = emergencyKeys.every((key) => fieldIsValid(errors, key));

  if (hasEmergencyValue && emergencyValid) {
    const emergencyPhoneNumber =
      form.emergencyPhone?.trim() && isPhoneIntlBrComplete(form.emergencyPhone)
        ? phoneIntlBrToStorage(form.emergencyPhone)
        : "";
    const relationshipDegree = normalizeRelationshipDegree(
      form.emergencyRelation,
    );

    payload.emergencyContact = {
      name: form.emergencyName?.trim() ?? "",
      phoneNumber: emergencyPhoneNumber,
      ...(relationshipDegree ? { relationshipDegree } : {}),
    };
  }

  return payload;
}

/** Detecta body já no formato Java (sem campos exclusivos do formulário). */
export function isBackendClientProfilePatch(
  body: unknown,
): body is BackendClientProfilePatch {
  if (!body || typeof body !== "object") return false;
  const record = body as Record<string, unknown>;
  return (
    !("phone" in record) &&
    !("cep" in record) &&
    !("emergencyPhone" in record) &&
    !("emergencyRelation" in record)
  );
}

/** Converte body do backend → campos do formulário para validação de máscaras. */
export function backendPatchToLocalUser(
  patch: BackendClientProfilePatch,
): LocalUser {
  const address = patch.addressResponse;
  return {
    name: patch.name,
    email: patch.email,
    cpf: patch.cpf,
    phone: patch.telephone,
    birthDate: patch.birthday,
    cep: address?.zipcode,
    street: address?.street,
    neighborhood: address?.neighbourhood,
    city: address?.city,
    uf: address?.state,
    emergencyName: patch.emergencyContact?.name,
    emergencyPhone: patch.emergencyContact?.phoneNumber,
    emergencyRelation: patch.emergencyContact?.relationshipDegree,
  };
}

export function coerceProfileUpdateBody(body: unknown): LocalUser {
  if (isBackendClientProfilePatch(body)) {
    return backendPatchToLocalUser(body);
  }
  return (body ?? {}) as LocalUser;
}
