"use client";

import NoScheduledSessionBanner from "@/components/NoScheduledSessionBanner";
import React from "react";

export default function NoSessionHeader() {
  return (
    <NoScheduledSessionBanner
      title="Nenhuma sessão agendada"
      description="Veja nossa lista de especialistas."
      buttonText="Agendar nova sessão"
      imageSrc="/images/empty-schedule-illustration.svg"
    />
  );
}