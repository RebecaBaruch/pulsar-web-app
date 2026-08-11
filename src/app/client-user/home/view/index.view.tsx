"use client";

import React from "react";
import NextSessionHeader from "../../../../components/NextSessionHeader";
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
    <section className="flex w-full overflow-x-hidden min-h-screen justify-center pt-10 pb-10">
      <div className="flex flex-col gap-12 w-full max-w-[768px] mx-auto">
        <div className="flex flex-col gap-6 w-full">
          <span>
            <h1 className="text-3xl text-black font-bold">
              Olá, {userName} 👋
            </h1>
          </span>
          <NextSessionHeader
          profilePictureUrl="/public/images/alex-dog.svg"
            name={"Alex Machado"}
            description={"CRP: XXX-XXX"}
            phoneNumber={"9999999999"}
            daysCount={2}
          />
          <MySessions />
        </div>
        <SpecialistsSection />
      </div>
    </section>
  );
}
