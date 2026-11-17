"use client";

import React from "react";
import {
  ClientPageHeader,
  ClientPageShell,
} from "@/components/ClientPage";
import ProfileForm from "./components/ProfileForm";

export default function ProfileView() {
  return (
    <ClientPageShell>
      <ClientPageHeader
        title="Meu Perfil"
        description="Edite seus dados e salve para confirmar as alterações."
      />
      <ProfileForm />
    </ClientPageShell>
  );
}
