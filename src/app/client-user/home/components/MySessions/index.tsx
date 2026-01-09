"use client";

import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MySessions() {
  return (
    <section className="w-full h-fit bg-white rounded-xl border border-gray-light p-2 md:px-6 flex flex-row items-center justify-between gap-4">
      <div className="flex items-center h-full">
        <img
          src="/images/schedule-2.svg"
          alt="Ícone de agendamento"
          className="h-full"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 w-70% md:w-full justify-between items-start md:items-center">
        <div className="w-full">
          <h1 className="text-sm md:text-base font-semibold text-black">Minhas sessões</h1>
          <p className="text-xs lg:text-sm text-gray mt-1 w-full">
            Veja seu histórico ou sessões marcadas
          </p>
        </div>

        <a
          href="/"
          className="flex flex-row items-center gap-1 md:text-sm text-blue hover:underline hover:text-blue-dark"
        >
          <span className="w-fit text-xs font-medium underline whitespace-nowrap">
            Ver todas as sessões
          </span>
          <FontAwesomeIcon icon={faChevronRight} size="xs" />
        </a>
      </div>
    </section>
  );
}
