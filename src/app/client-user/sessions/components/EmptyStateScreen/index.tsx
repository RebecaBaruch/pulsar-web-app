"use client";

import NoScheduledSessionBanner from "@/components/NoScheduledSessionBanner";
import React from "react";
import { ActiveTab } from "../SessionsHeader";

type EmptyStateScreenProps = {
  type: ActiveTab;
};

export default function EmptyStateScreen({ type }: EmptyStateScreenProps) {
  const isNext = type === "next";

  const title = isNext
    ? "Nenhuma sessão agendada"
  : "Nenhuma sessão realizada";
  const description = isNext
    ? "Veja nossa lista de especialistas."
    : "Você ainda não realizou nenhuma sessão. Agende uma sessão para começar!";
  const buttonText = isNext ? "Agendar nova sessão" : "Agendar sessão";
  const imageSrc = isNext
    ? "/images/empty-schedule-illustration.svg"
    : "/images/empty-history-illustration.svg";

  return (
    <NoScheduledSessionBanner
      title={title}
      description={description}
      buttonText={buttonText}
      imageSrc={imageSrc}
    />
  );
}