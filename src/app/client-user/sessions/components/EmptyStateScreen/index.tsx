"use client";
import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useRouter } from "next/navigation";
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
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-lightest rounded-lg">
      <img
        src={imageSrc}
        alt="Empty State"
        className="w-24 h-24 md:w-32 md:h-32 object-contain"
      />
      <div className="w-full flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-full">
          <h2 className="md:text-lg font-semibold text-gray-darkest">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-dark">{description}</p>
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
