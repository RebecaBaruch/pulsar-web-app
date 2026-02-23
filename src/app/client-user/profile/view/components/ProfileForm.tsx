"use client";

import React from "react";
import { useAuth } from "@/auth/useAuth";
import InputField from "@/components/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import BenefitCard from "./BenefitCard";
import SaveStatus from "./SaveStatus";
import { useAutoSaveProfileForm } from "../../hooks/useAutoSaveProfileForm";

export default function ProfileForm() {
  const { user, setUser } = useAuth();

  const { form, saving, saved, handleChange, handleBlur } =
    useAutoSaveProfileForm({
      initialData: user ?? undefined,
      onUserUpdated: (u) => setUser?.(u),
    });

  return (
    <div className="flex flex-col gap-16 text-gray-darkest">
      <section>
        <div className="flex flex-row items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faUser} size="xs" />
          <h2 className="font-medium">Dados pessoais</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Nome"
              value={form.name ?? ""}
              onChange={(v) => handleChange("name", v)}
              onValidationChange={() => {}}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div>
            <InputField
              label="CPF"
              type="cpf"
              value={form.cpf ?? ""}
              onChange={(v) => handleChange("cpf", v)}
              shouldValidate={false}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              label="Email"
              type="email"
              value={form.email ?? ""}
              onChange={(v) => handleChange("email", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div>
            <InputField
              label="Telefone"
              type="tel"
              value={form.phone ?? ""}
              onChange={(v) => handleChange("phone", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>
        </div>

        <SaveStatus saving={saving} saved={saved} />
      </section>

      <BenefitCard />

      <section>
        <div className="flex flex-row items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faPhone} size="xs" />
          <h2 className="font-medium">Contato de emergência</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <InputField
              label="Nome"
              value={form.emergencyName ?? ""}
              onChange={(v) => handleChange("emergencyName", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div>
            <InputField
              label="Parentesco"
              value={form.emergencyRelation ?? ""}
              onChange={(v) => handleChange("emergencyRelation", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div>
            <InputField
              label="Telefone"
              type="tel"
              value={form.emergencyPhone ?? ""}
              onChange={(v) => handleChange("emergencyPhone", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>
        </div>

        <SaveStatus saving={saving} saved={saved} />
      </section>

      <section>
        <div className="flex flex-row items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faLocationDot} size="xs" />
          <h2 className="font-medium">Endereço para faturamento</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <InputField
              label="CEP"
              type="number"
              value={form.cep ?? ""}
              onChange={(v) => handleChange("cep", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              label="Rua"
              value={form.street ?? ""}
              onChange={(v) => handleChange("street", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div>
            <InputField
              label="Bairro"
              value={form.neighborhood ?? ""}
              onChange={(v) => handleChange("neighborhood", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div className="w-full">
            <InputField
              label="Cidade"
              value={form.city ?? ""}
              onChange={(v) => handleChange("city", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>

          <div className="w-full">
            <InputField
              label="UF"
              value={form.uf ?? ""}
              onChange={(v) => handleChange("uf", v)}
              onBlur={handleBlur}
              className="w-full"
            />
          </div>
        </div>

        <SaveStatus saving={saving} saved={saved} />
      </section>
    </div>
  );
}
