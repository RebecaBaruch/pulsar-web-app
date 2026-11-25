"use client";

import { ClientPageHeader } from "@/components/ClientPage";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type ActiveTab = "next" | "history";

type SessionsHeaderProps = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

const tabs: {
  key: ActiveTab;
  label: string;
  icon: typeof faCalendar;
}[] = [
  { key: "next", label: "Próximas sessões", icon: faCalendar },
  { key: "history", label: "Histórico", icon: faClock },
];

export default function SessionsHeader({
  activeTab,
  setActiveTab,
}: SessionsHeaderProps) {
  return (
    <header className="flex w-full shrink-0 flex-col gap-4 border-b border-gray-light pb-0">
      <ClientPageHeader
        title="Minhas Sessões"
        description="Veja suas sessões agendadas e o histórico de atendimentos."
      />

      <div
        className="flex w-full gap-1 rounded-lg border border-gray-light bg-gray-light p-1 md:inline-flex md:w-fit"
        role="tablist"
        aria-label="Filtrar sessões"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold transition-colors md:flex-none md:px-4 md:py-3 md:text-sm ${
                isActive
                  ? "bg-white text-blue shadow-sm"
                  : "text-gray hover:text-gray-darkest"
              }`}
            >
              <FontAwesomeIcon
                icon={tab.icon}
                className={`text-sm ${isActive ? "text-blue" : "text-gray"}`}
                aria-hidden
              />
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}