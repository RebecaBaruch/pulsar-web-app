"use client";

import React from "react";
import { useAuth } from "@/auth/useAuth";
import InputField from "@/components/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faPhone,
  faLocationDot,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

import BenefitCard from "./BenefitCard";
import {
  LocalUser,
  useClientProfileForm,
} from "../../hooks/useClientProfileForm";
import LinkButton from "@/components/LinkButton";
import SelectInput from "@/components/SelectInput";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { relationshipDegreeOptions } from "@/utils/relate-degree-values";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { fetchClientProfile } from "../../../services/clientUserApi";
import { mergeProfileWithAuth } from "../../../services/profileMapper";

export default function ProfileForm() {
  const { user, setUser, isAuthenticated, loading: authLoading } = useAuth();
  const [profileLoading, setProfileLoading] = React.useState(true);
  const [initialProfile, setInitialProfile] = React.useState<
    LocalUser | undefined
  >(undefined);

  React.useEffect(() => {
    if (authLoading) return;

    const userId = user?.id;
    if (!userId) {
      setProfileLoading(false);
      return;
    }

    let cancelled = false;
    setProfileLoading(true);

    (async () => {
      try {
        const profile = await fetchClientProfile();
        if (cancelled) return;

        const merged = mergeProfileWithAuth(profile, user);
        if (merged) {
          setInitialProfile(merged);
          setUser?.({
            id: merged.id!,
            name: merged.name ?? "",
            email: merged.email ?? "",
            role: merged.role ?? "CLIENT",
            avatarUrl: merged.avatarUrl,
          });
        } else {
          setInitialProfile({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl ?? undefined,
          });
        }
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.id, setUser]);

  const {
    form,
    formKey,
    isDirty,
    isSubmitting,
    fieldErrors,
    handleChange,
    handleReset,
    handleSubmit,
  } = useClientProfileForm({
    initialData: initialProfile,
    onUserUpdated: (u) => setUser?.(u),
  });

  if (authLoading || profileLoading) {
    return (
      <div className="h-40 animate-pulse rounded-lg bg-gray-light" aria-hidden />
    );
  }

  return (
    <div
      className={`flex flex-col gap-16 text-gray-darkest ${isDirty ? "pb-40 md:pb-24" : ""}`}
    >
      <section key={`personal-${formKey}`} className="flex flex-col items-end gap-6">
        <div className="w-full">
          <div className="flex flex-row items-center gap-2 mb-4">
            <FontAwesomeIcon icon={faUser} size="xs" />
            <h2 className="font-medium">Dados pessoais</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <InputField
                label="Nome"
                value={form.name ?? ""}
                errorMessage={fieldErrors.name}
                onChange={(v) => handleChange("name", v)}
                isDisabled={isSubmitting}
                className="w-full"
              />
            </div>

            <div>
              <InputField
                label="CPF"
                type="cpf"
                placeholder="665.025.670-61"
                value={form.cpf ?? ""}
                errorMessage={fieldErrors.cpf}
                onChange={(v) => handleChange("cpf", v)}
                isDisabled={isSubmitting}
                className="w-full"
              />
            </div>

            <div className="md:col-span-2">
              <InputField
                label="Email"
                type="email"
                value={form.email ?? ""}
                errorMessage={fieldErrors.email}
                onChange={(v) => handleChange("email", v)}
                isDisabled={isSubmitting}
                className="w-full"
              />
            </div>

            <div>
              <InputField
                label="Telefone"
                type="tel-intl-br"
                placeholder="+55 11 98765-4321"
                value={form.phone ?? ""}
                errorMessage={fieldErrors.phone}
                onChange={(v) => handleChange("phone", v)}
                isDisabled={isSubmitting}
                className="w-full"
              />
            </div>
          </div>
        </div>
        {isAuthenticated && user ? (
          <LinkButton
            text="Alterar senha"
            href={RoutesUrls.FORGOT_PASSWORD}
            icon={faKey}
          />
        ) : null}
      </section>

      <BenefitCard />

      <section key={`emergency-${formKey}`}>
        <div className="flex flex-row items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faPhone} size="xs" />
          <h2 className="font-medium">Contato de emergência</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <InputField
              label="Nome"
              value={form.emergencyName ?? ""}
              errorMessage={fieldErrors.emergencyName}
              onChange={(v) => handleChange("emergencyName", v)}
              isDisabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div>
            <SelectInput
              label="Parentesco"
              placeholder="Selecione o parentesco"
              value={form.emergencyRelation ?? ""}
              options={relationshipDegreeOptions}
              errorMessage={fieldErrors.emergencyRelation}
              isDisabled={isSubmitting}
              onChange={(v) => {
                const next = Array.isArray(v) ? v[0] : v;
                handleChange("emergencyRelation", next ?? "");
              }}
              className="w-full"
            />
          </div>

          <div>
            <InputField
              label="Telefone"
              type="tel-intl-br"
              placeholder="+55 11 98765-4321"
              value={form.emergencyPhone ?? ""}
              errorMessage={fieldErrors.emergencyPhone}
              onChange={(v) => handleChange("emergencyPhone", v)}
              isDisabled={isSubmitting}
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section key={`address-${formKey}`}>
        <div className="flex flex-row items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faLocationDot} size="xs" />
          <h2 className="font-medium">Endereço para faturamento</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <InputField
              label="CEP"
              type="cep"
              placeholder="01000-000"
              value={form.cep ?? ""}
              errorMessage={fieldErrors.cep}
              onChange={(v) => handleChange("cep", v)}
              isDisabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              label="Rua"
              value={form.street ?? ""}
              errorMessage={fieldErrors.street}
              onChange={(v) => handleChange("street", v)}
              isDisabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div>
            <InputField
              label="Bairro"
              value={form.neighborhood ?? ""}
              errorMessage={fieldErrors.neighborhood}
              onChange={(v) => handleChange("neighborhood", v)}
              isDisabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div className="w-full">
            <InputField
              label="Cidade"
              value={form.city ?? ""}
              errorMessage={fieldErrors.city}
              onChange={(v) => handleChange("city", v)}
              isDisabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div className="w-full">
            <InputField
              label="UF"
              placeholder="SP"
              value={form.uf ?? ""}
              errorMessage={fieldErrors.uf}
              onChange={(v) => handleChange("uf", v)}
              isDisabled={isSubmitting}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {isDirty && (
        <div className="fixed bottom-0 right-0 left-0 z-30 border-t border-gray-200 p-4 lg:px-12 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] bg-white flex items-center justify-end gap-3 transition-all">
          <div className="flex flex-col md:flex-row w-full lg:w-fit gap-2 md:gap-4 items-center lg:justify-end">
            <div className="w-full lg:w-fit order-1 md:order-2">
              <PrimaryButton
                type="button"
                text={isSubmitting ? "Salvando..." : "Salvar alterações"}
                isDisabled={isSubmitting}
                onClick={() => {
                  void handleSubmit();
                }}
              />
            </div>

            <div className="w-full lg:w-fit order-2 md:order-1">
              <SecondaryButton
                type="button"
                text="Cancelar"
                onClick={handleReset}
                isDisabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
