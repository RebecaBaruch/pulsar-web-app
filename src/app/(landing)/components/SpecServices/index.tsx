import React from "react";

import SpecCarousel from "./spec-carousel";
import BePulsarContent from "./be-pulsar";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function SpecServices() {
  const router = useRouter();
  return (
    <section className="mx-auto max-w-[1280px] px-4 lg:p-[64px]">
      <div className="flex flex-col w-full gap-15 pt-10 pb-10">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl lg:text-4xl font-semibold text-black text-center">
            Cada pessoa é única.{" "}
            <span className="text-blue">Nossos serviços também.</span>
          </h1>
          
          <div className="w-fit">
            <SecondaryButton
              text="Ver todos os especialistas"
              onClick={() => router.replace(RoutesUrls.FIND_SPECIALIST)}
            />
          </div>
        </div>

        <SpecCarousel />
        <BePulsarContent />
      </div>
    </section>
  );
}
