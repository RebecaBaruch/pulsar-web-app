"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { clientCardClass } from "@/components/ClientPage";
import React from "react";

export default function NoSessionHeader() {
  return (
    <header className={`${clientCardClass} flex flex-col gap-6 p-6`}>
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-xl font-semibold text-gray-darkest">
          Você ainda não agendou uma sessão
        </h1>
        <img src="/images/schedule-1.webp" alt="Ícone de agendamento" width={90} height={90} />
      </div>
      <PrimaryButton onClick={() => {}} text="Agendar sessão"/>
    </header>
  );
}
