"use client";

import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MySessions() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-2 p-4 rounded-xl border border-gray-light lg:py-5 lg:px-15">
      <div className="flex flex-row gap-2 lg:gap-10 w-full items-center">
        <div className="w-full md:w-fit">
          <h1 className="text-lg md:text-xl font-bold text-black">Minhas sessões</h1>
          <p className="text-md lg:text-lg lg:whitespace-nowrap">Veja seu histórico ou sessões marcadas</p>
        </div>
        <img
          src="/images/schedule-2.svg"
          alt="Ícone de agendamento"
          className="w-2/5 lg:w-1/5"
        />
      </div>
      <a
        href="/"
        className="flex flex-row items-center gap-2 w-fit text-md lg:text-lg text-blue font-bold hover:underline"
      >
        <span className="w-fit whitespace-nowrap">Todas as sessões</span>
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </a>
    </div>
  );
}
