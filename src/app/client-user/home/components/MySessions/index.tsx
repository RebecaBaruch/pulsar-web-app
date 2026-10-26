"use client";

import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { clientCardClass } from "@/components/ClientPage";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function MySessions() {
  const router = useRouter();

  return (
    <section
      className={`${clientCardClass} flex h-fit w-full flex-row items-center justify-between gap-4 p-2 md:p-6`}
    >
      <div className="flex items-center h-full">
        <Image
          src="/images/schedule-2.webp"
          alt="Ícone de agendamento"
          className="h-full w-fit"
          width={40}
          height={40}
        />
      </div>

      <div className="flex w-[70%] flex-col items-start justify-between gap-2 md:w-full md:flex-row md:items-center">
        <div className="w-full">
          <h1 className="text-sm font-semibold text-gray-darkest md:text-base">
            Minhas sessões
          </h1>
          <p className="text-xs lg:text-sm text-gray w-full">
            Veja seu histórico ou sessões marcadas
          </p>
        </div>

        <div>
          <PrimaryButton text={"Todas as sessões"} rightIcon={faChevronRight} onClick={() => router.push(RoutesUrls.CLIENT_SESSIONS)}/>
        </div>
      </div>
    </section>
  );
}
