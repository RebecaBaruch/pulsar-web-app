"use client";

import React from "react";
import ProfileForm from "./components/ProfileForm";
import { AuthUser } from "@/auth/authTypes";

export default function ProfileView() {
  return (
    <section className="flex w-full overflow-x-hidden min-h-screen justify-center pt-10 pb-10">
      <div className="flex flex-col gap-8 w-full max-w-[768px] mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Meu Perfil</h1>
          <span className="text-sm text-gray-500">
            Alterações são salvas automaticamente.
          </span>
        </div>
        <ProfileForm />
      </div>
    </section>
  );
}
