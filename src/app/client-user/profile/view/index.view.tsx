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
        description="Alterações são salvas automaticamente."
      />
      <ProfileForm />
    </ClientPageShell>
  );
}
