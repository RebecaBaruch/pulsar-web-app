"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useRouter } from "next/navigation";
import React from "react";
import { ActiveTab } from "../SessionsHeader";

type EmptyStateScreenProps = {
  type: ActiveTab;
};

export default function EmptyStateScreen({ type }: EmptyStateScreenProps) {
  const router = useRouter();

  const handleScheduleNewSession = () => {
    router.push(RoutesUrls.FIND_SPECIALIST);
  };

  const title =
    type === "next" ? "Nenhuma sessão agendada" : "Nenhuma sessão realizada";
  const description =
    type === "next"
      ? "Você ainda não tem sessões agendadas. Escolha um especialista e agende sua sessão!"
      : "Você ainda não realizou nenhuma sessão. Agende uma sessão para começar!";
  const imageSrc =
    type === "next"
      ? "/images/empty-schedule-illustration.svg"
      : "/images/empty-history-illustration.svg";

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-blue-lightest p-4">
      <img
        src={imageSrc}
        alt="Empty State"
        className="h-24 w-24 object-contain md:h-32 md:w-32"
      />
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <div className="w-full">
          <h2 className="font-semibold text-gray-darkest md:text-lg">{title}</h2>
          <p className="text-xs text-gray-dark md:text-sm">{description}</p>
        </div>
        <div className="w-fit">
          <PrimaryButton
            text="Agendar sessão"
            onClick={handleScheduleNewSession}
          />
        </div>
      </div>
    </div>
  );
}