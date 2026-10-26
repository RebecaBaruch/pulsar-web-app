"use client";

import React from "react";
import NextSessionHeader from "../../../../components/NextSessionHeader";
import { ClientPageShell } from "@/components/ClientPage";
import MySessions from "../components/MySessions";
import SpecialistsSection from "../components/SpecialistsSection";
import HomeSkeleton from "../components/HomeSkeleton";

interface HomeViewProps {
  loading?: boolean;
  userName?: string;
}

export default function HomeView({ loading, userName }: HomeViewProps) {
  if (loading) {
    return <HomeSkeleton />;
  }

  return (
      <ClientPageShell width="wide" contentClassName="gap-12">
          <div className="flex flex-col gap-6 w-full">
            <h1 className="text-2xl font-semibold text-gray-darkest">
              Olá, {userName} 👋
            </h1>
            <NextSessionHeader
              profilePictureUrl="https://github.com/shadcn.png"
              name={"Alex"}
              description={"Psicólogo • CRP: XXX-XXX"}
              phoneNumber={"9999999999"}
              daysCount={2}
              sessionDate={"22 de Julho"}
              sessionTime={"10:00 AM"}
            />
            <MySessions />
          </div>
          <SpecialistsSection />
      </ClientPageShell>
  );
}
