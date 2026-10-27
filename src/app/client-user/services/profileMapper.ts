import { AuthUser } from "@/auth/authTypes";
import { LocalUser } from "../profile/hooks/useAutoSaveProfileForm";
import type { BackendClientProfile } from "@/types/backend";

export function profileToLocalUser(
  sessionUser: AuthUser,
  profile: BackendClientProfile | null,
): LocalUser {
  const address = profile?.addressResponse;
  return {
    id: sessionUser.id,
    name: profile?.name ?? sessionUser.name,
    email: profile?.email ?? sessionUser.email,
    role: sessionUser.role,
    avatarUrl: sessionUser.avatarUrl,
    cpf: profile?.cpf,
    phone: profile?.telephone,
    birthDate: profile?.birthday?.slice(0, 10),
    emergencyName: profile?.emergencyContact?.name,
    emergencyPhone: profile?.emergencyContact?.phoneNumber,
    emergencyRelation: profile?.emergencyContact?.relationshipDegree,
    cep: address?.zipcode,
    street: address?.street,
    neighborhood: address?.neighbourhood,
    city: address?.city,
    uf: address?.state,
  };
}

export function localUserToUpdatePayload(form: LocalUser) {
  const payload: Record<string, unknown> = {};

  if (form.name) payload.name = form.name;
  if (form.email) payload.email = form.email;
  if (form.phone) payload.phone = form.phone;

  if (
    form.street ||
    form.city ||
    form.uf ||
    form.cep ||
    form.neighborhood
  ) {
    payload.address = {
      street: form.street ?? "",
      city: form.city ?? "",
      state: form.uf ?? "",
      zipCode: form.cep ?? "",
      neighbourhood: form.neighborhood ?? "",
    };
  }

  if (form.emergencyName || form.emergencyPhone || form.emergencyRelation) {
    payload.emergencyContact = {
      name: form.emergencyName ?? "",
      phoneNumber: form.emergencyPhone ?? "",
      relationshipDegree: form.emergencyRelation ?? "OUTRO",
    };
  }

  return payload;
}
