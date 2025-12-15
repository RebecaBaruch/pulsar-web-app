"use client";

import React from "react";
import NextSessionHeader from "../components/NextSessionHeader";
import MySessions from "../components/MySessions";
import SpecialistsSection from "../components/SpecialistsSection";

export default function HomeView() {
  return (
    <section className="flex w-screen overflow-x-hidden min-h-screen justify-center lg:items-center pt-20 lg:p-4 pb-10">
      <div className="flex flex-col gap-20 w-full p-6 md:p-15">
        <div className="flex flex-col gap-10 w-full">
          <span>
            <h1 className="text-5xl text-black font-bold"> Olá, Ana 👋 </h1>
          </span>
          <NextSessionHeader />
          <MySessions />
        </div>
        <SpecialistsSection />
      </div>
    </section>
  );
}
