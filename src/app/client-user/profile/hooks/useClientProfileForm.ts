"use client";

import * as React from "react";
import { toast } from "sonner";
import type { AuthUser } from "@/auth/authTypes";
import { formatCepBr } from "@/utils/cep-br";
import { formatCpfBr } from "@/utils/cpf-br";
import { normalizeRelationshipDegree } from "@/utils/relate-degree-values";
import { formatPhoneIntlBr } from "@/utils/phone-intl-br";
import { patchClientProfile } from "../../services/clientUserApi";
import type { LocalUser } from "../profile-types";
import {
  formatProfileFieldInput,
  isProfileFormFieldKey,
  profileFormCanSave,
  validateProfileField,
  validateProfileForm,
  type ProfileFormFieldKey,
} from "../profile-form-validation";

export type { LocalUser } from "../profile-types";

function formatMaskedFields(data: LocalUser): LocalUser {
  const next = { ...data };
  if (next.phone?.trim()) {
    next.phone = formatPhoneIntlBr(next.phone);
  }
  if (next.emergencyPhone?.trim()) {
    next.emergencyPhone = formatPhoneIntlBr(next.emergencyPhone);
  }
  if (next.cep?.trim()) {
    next.cep = formatCepBr(next.cep);
  }
  if (next.cpf?.trim()) {
    next.cpf = formatCpfBr(next.cpf);
  }
  if (next.uf?.trim()) {
    next.uf = next.uf.trim().toUpperCase().slice(0, 2);
  }
  if (next.emergencyRelation?.trim()) {
    const normalized = normalizeRelationshipDegree(next.emergencyRelation);
    next.emergencyRelation = normalized || next.emergencyRelation;
  }
  return next;
}

function toAuthUser(profile: LocalUser, fallbackRole?: AuthUser["role"]): AuthUser | null {
  if (!profile.id) return null;

  return {
    id: profile.id,
    name: profile.name ?? "",
    email: profile.email ?? "",
    role: profile.role ?? fallbackRole ?? "CLIENT",
    avatarUrl: profile.avatarUrl,
  };
}

type Params = {
  initialData?: LocalUser;
  onUserUpdated?: (user: AuthUser) => void;
};

export function useClientProfileForm({ initialData, onUserUpdated }: Params) {
  const [form, setForm] = React.useState<LocalUser>(initialData ?? {});
  const [savedForm, setSavedForm] = React.useState<LocalUser>(initialData ?? {});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formKey, setFormKey] = React.useState(0);
  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<ProfileFormFieldKey, string>>
  >({});

  React.useEffect(() => {
    if (!initialData?.id) return;

    const merged = formatMaskedFields({ ...initialData });
    setForm(merged);
    setSavedForm(merged);
    setFieldErrors({});
  }, [initialData]);

  const isDirty = React.useMemo(
    () => JSON.stringify(form) !== JSON.stringify(savedForm),
    [form, savedForm],
  );

  const handleChange = React.useCallback(
    (key: keyof LocalUser, value: string) => {
      const formatted = isProfileFormFieldKey(key)
        ? formatProfileFieldInput(key, value)
        : value;

      setForm((prev) => ({ ...prev, [key]: formatted }));

      if (isProfileFormFieldKey(key)) {
        const err = validateProfileField(key, formatted);
        setFieldErrors((prev) => {
          const copy = { ...prev };
          if (err) copy[key] = err;
          else delete copy[key];
          return copy;
        });
      }
    },
    [],
  );

  const handleReset = React.useCallback(() => {
    if (isSubmitting) return;
    setForm(savedForm);
    setFieldErrors({});
    setFormKey((key) => key + 1);
  }, [isSubmitting, savedForm]);

  const handleSubmit = React.useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (isSubmitting) return;

      const errors = validateProfileForm(form);
      setFieldErrors(errors);

      if (!profileFormCanSave(form)) {
        toast.error("Corrija os campos destacados antes de salvar.");
        return;
      }

      if (!isDirty) return;

      setIsSubmitting(true);
      try {
        const updated = await patchClientProfile(form);
        const next = formatMaskedFields(updated ?? form);

        setForm(next);
        setSavedForm(next);
        setFieldErrors({});
        setFormKey((key) => key + 1);

        const authUser = toAuthUser(next, form.role);
        if (authUser) onUserUpdated?.(authUser);

        toast.success("Dados salvos com sucesso!");
      } catch (err) {
        console.error("Error saving profile", err);
        const message =
          err instanceof Error && err.message
            ? err.message
            : "Não foi possível salvar agora. Tente novamente mais tarde.";
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, isDirty, isSubmitting, onUserUpdated],
  );

  return {
    form,
    formKey,
    isDirty,
    isSubmitting,
    fieldErrors,
    handleChange,
    handleReset,
    handleSubmit,
  };
}
