"use client";

import React from "react";
import NextSessionHeader from "../components/NextSessionHeader";
import MySessions from "../components/MySessions";
import SpecialistsSection from "../components/SpecialistsSection";
import HomeSkeleton from "../components/HomeSkeleton";

interface HomeViewProps {
  loading?: boolean;
  userName?: string;
}

export default function HomeView({
  loading = false,
  userName = "Usuário",
}: HomeViewProps) {
  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <section className="flex w-screen overflow-x-hidden min-h-screen justify-center lg:items-center pt-16 pb-10">
      <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex flex-col gap-6 w-full">
          <span>
            <h1 className="text-3xl text-black font-bold">
              {" "}
              Olá, {userName} 👋{" "}
            </h1>
          </span>
          <NextSessionHeader />
          <MySessions />
        </div>
        <SpecialistsSection />
      </div>
    </section>
  );
}
