"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import React from "react";

export default function NextSessionHeader() {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 p-4 lg:py-10 lg:px-15 bg-blue-light rounded-xl">
      <div>
        <h3 className="text-md text-black">Sua próxima sessão</h3>
        <h1 className="text-lg md:text-xl font-bold text-black">
          Segunda, 22 de Julho · 10:00 AM
        </h1>
        <h2 className="text-lg font-semibold text-blue-dark">
          2 dias restantes
        </h2>
      </div>
      <div className="w-full md:w-fit">
        <PrimaryButton onClick={() => {}} text="Ver detalhes da sessão" />
      </div>
    </header>
  );
}
