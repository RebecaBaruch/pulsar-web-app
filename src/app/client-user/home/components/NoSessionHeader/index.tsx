"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import React from "react";

export default function NoSessionHeader() {
  return (
    <header className="flex flex-col gap-6 p-6 bg-gray-lightest rounded-xl">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-xl font-bold text-black">
          Você ainda não agendou uma sessão
        </h1>
        <img src="/images/schedule-1.svg" alt="Ícone de agendamento" width={90} height={90} />
      </div>
      <PrimaryButton onClick={() => {}} text="Agendar sessão"/>
    </header>
  );
}
