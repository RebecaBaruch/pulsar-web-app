"use client";

import React from "react";
import SpecCarousel from "./spec-carousel";
import BePulsarContent from "./be-pulsar";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function SpecServices() {
  const router = useRouter();

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 lg:px-16 lg:py-[64px] overflow-hidden">
      <div className="flex flex-col w-full gap-10">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black leading-tight">
            Cada pessoa é única.{" "}
            <span className="text-blue block sm:inline">
              Nossos serviços também.
            </span>
          </h1>

          <div className="w-fit pt-2 sm:w-auto">
            <SecondaryButton
              text="Ver todos os especialistas"
              onClick={() => router.replace(RoutesUrls.FIND_SPECIALIST)}
            />
          </div>
        </div>

        {/* Carrossel / Grid */}
        <div className="w-full overflow-hidden">
          <SpecCarousel />
        </div>

        {/* Banner BePulsar */}
        <BePulsarContent />
      </div>
    </section>
  );
}
