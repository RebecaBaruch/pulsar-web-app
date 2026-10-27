"use client";

import React from "react";
import NextSessionHeader from "../../../../components/NextSessionHeader";
import { ClientPageShell } from "@/components/ClientPage";
import MySessions from "../components/MySessions";
import SpecialistsSection from "../components/SpecialistsSection";
import HomeSkeleton from "../components/HomeSkeleton";
import NoSessionHeader from "../components/NoSessionHeader";

interface HomeViewProps {
  loading?: boolean;
  userName?: string;
  sessionsLoading?: boolean;
  nextSession?: {
    profilePictureUrl?: string;
    name: string;
    description: string;
    phoneNumber: string;
    daysCount: number;
    sessionTime: string;
    sessionDate: string;
  } | null;
}

export default function HomeView({
  loading,
  userName,
  sessionsLoading,
  nextSession,
}: HomeViewProps) {
  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <ClientPageShell width="wide" contentClassName="gap-12">
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-darkest">
          Olá, {userName} 👋
        </h1>

        {sessionsLoading ? (
          <div className="h-32 animate-pulse rounded-lg bg-gray-light" />
        ) : nextSession ? (
          <NextSessionHeader
            profilePictureUrl={nextSession.profilePictureUrl}
            name={nextSession.name}
            description={nextSession.description}
            phoneNumber={nextSession.phoneNumber}
            daysCount={nextSession.daysCount}
            sessionDate={nextSession.sessionDate}
            sessionTime={nextSession.sessionTime}
          />
        ) : (
          <NoSessionHeader />
        )}

        <MySessions />
      </div>
      <SpecialistsSection />
    </ClientPageShell>
  );
}
