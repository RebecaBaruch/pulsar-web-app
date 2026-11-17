"use client";

import { clientCardClass } from "@/components/ClientPage";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { faCalendarDays, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

export default function MySessions() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Ver todas as minhas sessões"
      onClick={() => router.push(RoutesUrls.CLIENT_SESSIONS)}
      className={`${clientCardClass} flex w-full items-center gap-3 rounded-xl md:rounded-lg border-gray-200/80 p-4 text-left transition-colors hover:bg-gray-100/50 md:gap-4 md:p-6 cursor-pointer`}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500"
        aria-hidden
      >
        <FontAwesomeIcon icon={faCalendarDays} className="text-lg" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-darkest md:text-base">
          Minhas sessões
        </p>
        <p className="text-xs text-gray md:text-wrap">
          Veja seu histórico ou sessões marcadas
        </p>
      </div>

      <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-blue-500 md:inline-flex">
        Todas as sessões
        <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" aria-hidden />
      </span>

      <span className="shrink-0 text-gray md:hidden" aria-hidden>
        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
      </span>
    </button>
  );
}