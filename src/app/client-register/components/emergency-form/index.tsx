"use client";

import PrimaryButton from "@/components/buttons/primary-button";
import SecondaryButton from "@/components/buttons/secondary-button";
import React from "react";

type PersonalUserFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function EmergencyForm({ onNext, onBack }: PersonalUserFormProps) {
  return (
    <div className="flex flex-col gap-12 px-6 pt-6">
      Emergency form implementation goes here
      <div className="flex flex-col justify-center items-center gap-4 mt-3">
        <PrimaryButton text="Próximo" onClick={onNext} />
        <SecondaryButton text="Voltar" onClick={onBack} />
      </div>
    </div>
  );
}