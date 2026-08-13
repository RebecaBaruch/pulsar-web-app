"use client";

import React from "react";
import Image from "next/image";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import LinkButton from "@/components/LinkButton";

export default function MySessions() {
  return (
    <section className="w-full h-fit bg-white rounded border border-gray-light p-2 md:p-6 flex flex-row items-center justify-between gap-4">
      <div className="flex items-center h-full">
        <Image
          src="/images/schedule-2.svg"
          alt="Ícone de agendamento"
          className="h-full"
          width={40}
          height={40}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 w-70% md:w-full justify-between items-start md:items-center">
        <div className="w-full">
          <h1 className="text-sm md:text-base font-semibold text-black">
            Minhas sessões
          </h1>
          <p className="text-xs lg:text-sm text-gray w-full">
            Veja seu histórico ou sessões marcadas
          </p>
        </div>

        <LinkButton
          href="/"
          text="Ver todas as sessões"
          icon={faChevronRight}
        />
      </div>
    </section>
  );
}
