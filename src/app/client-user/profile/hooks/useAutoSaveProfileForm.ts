"use client";

import * as React from "react";
import { toast } from "sonner";
import { AuthUser } from "@/auth/authTypes";

export type LocalUser = Partial<AuthUser> & {
  cpf?: string;
  birthDate?: string;
  phone?: string;
  emergencyName?: string;
  emergencyRelation?: string;
  emergencyPhone?: string;
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  billingPhone?: string;
};

type Params = {
  initialData?: LocalUser;
  onUserUpdated?: (user: AuthUser) => void;
  debounceMs?: number;

  // UX
  spinnerDelayMs?: number; // tempo pra aparecer
  spinnerMinVisibleMs?: number; // tempo mínimo depois que apareceu
  savedVisibleMs?: number;
  toastCooldownMs?: number;
};

export function useAutoSaveProfileForm({
  initialData,
  onUserUpdated,
  debounceMs = 900,
  spinnerDelayMs = 250,
  spinnerMinVisibleMs = 450,
  savedVisibleMs = 2000,
  toastCooldownMs = 8000,
}: Params) {
  const [form, setForm] = React.useState<LocalUser>(initialData ?? {});
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const saveTimerRef = React.useRef<number | null>(null);
  const savedTimerRef = React.useRef<number | null>(null);
  const spinnerTimerRef = React.useRef<number | null>(null);

  const lastRequestIdRef = React.useRef(0);
  const lastToastAtRef = React.useRef(0);

  // evita salvar sem mudanças
  const lastSavedHashRef = React.useRef<string>("");

  // guarda o último payload que estava no debounce
  const lastScheduledPayloadRef = React.useRef<LocalUser | null>(null);

  // controla spinner UX
  const spinnerShownAtRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (initialData) {
      const merged = { ...initialData };
      setForm((f) => ({ ...f, ...merged }));
      lastSavedHashRef.current = JSON.stringify(merged);
    }
  }, [initialData]);

  React.useEffect(() => {
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
      if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
      if (spinnerTimerRef.current) window.clearTimeout(spinnerTimerRef.current);
    };
  }, []);

  const showSavedState = React.useCallback(() => {
    setSaved(true);

    if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);

    savedTimerRef.current = window.setTimeout(() => {
      setSaved(false);
    }, savedVisibleMs);
  }, [savedVisibleMs]);

  const showSuccessToast = React.useCallback(() => {
    const now = Date.now();
    if (now - lastToastAtRef.current < toastCooldownMs) return;

    lastToastAtRef.current = now;
    toast.success("Dados salvos automaticamente!");
  }, [toastCooldownMs]);

  const save = React.useCallback(
    async (payload?: LocalUser) => {
      const toSave = payload ?? form;

      // DIRTY CHECK (não salva se não mudou)
      const nextHash = JSON.stringify(toSave);
      if (nextHash === lastSavedHashRef.current) return;

      const requestId = ++lastRequestIdRef.current;

      setSaved(false);

      // spinner: só aparece depois de um delay
      spinnerShownAtRef.current = null;

      if (spinnerTimerRef.current) window.clearTimeout(spinnerTimerRef.current);
      spinnerTimerRef.current = window.setTimeout(() => {
        if (requestId === lastRequestIdRef.current) {
          spinnerShownAtRef.current = Date.now();
          setSaving(true);
        }
      }, spinnerDelayMs);

      try {
        const res = await fetch("/api/me", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toSave),
        });

        if (requestId !== lastRequestIdRef.current) return;

        if (!res.ok) {
          if (spinnerTimerRef.current) window.clearTimeout(spinnerTimerRef.current);
          setSaving(false);
          toast.error("Não foi possível salvar seus dados.");
          return;
        }

        const data = await res.json();

        if (data?.user) {
          onUserUpdated?.(data.user);
        }

        // marcou como salvo com sucesso
        lastSavedHashRef.current = nextHash;

        // se o spinner apareceu, segura ele um tempo mínimo
        if (spinnerTimerRef.current) window.clearTimeout(spinnerTimerRef.current);

        const shownAt = spinnerShownAtRef.current;
        if (shownAt) {
          const visibleFor = Date.now() - shownAt;
          if (visibleFor < spinnerMinVisibleMs) {
            await new Promise((r) =>
              setTimeout(r, spinnerMinVisibleMs - visibleFor)
            );
          }
        }

        setSaving(false);
        showSavedState();
        showSuccessToast();
      } catch (err) {
        if (requestId !== lastRequestIdRef.current) return;

        console.error("Error saving profile", err);

        if (spinnerTimerRef.current) window.clearTimeout(spinnerTimerRef.current);
        setSaving(false);

        toast.error("Erro ao salvar. Verifique sua conexão.");
      }
    },
    [
      form,
      onUserUpdated,
      showSavedState,
      showSuccessToast,
      spinnerDelayMs,
      spinnerMinVisibleMs,
    ]
  );

  const scheduleSave = React.useCallback(
    (next: LocalUser) => {
      lastScheduledPayloadRef.current = next;

      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = window.setTimeout(() => save(next), debounceMs);
    },
    [debounceMs, save]
  );

  const handleChange = React.useCallback(
    (key: keyof LocalUser, value: string) => {
      const next = { ...form, [key]: value };
      setForm(next);
      scheduleSave(next);
    },
    [form, scheduleSave]
  );

  const handleBlur = React.useCallback(() => {
    // se tinha debounce pendente, cancela
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    // blur salva exatamente o último payload agendado (evita duplicar)
    const payload = lastScheduledPayloadRef.current ?? form;

    lastScheduledPayloadRef.current = null;
    save(payload);
  }, [form, save]);

  return {
    form,
    setForm,
    saving,
    saved,
    handleChange,
    handleBlur,
    saveNow: () => save(form),
  };
}
