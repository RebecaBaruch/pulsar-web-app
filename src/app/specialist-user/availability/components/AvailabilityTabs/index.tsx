import React from "react";

export type AvailabilityTab = "weekly" | "blocks";

interface AvailabilityTabsProps {
  activeTab: AvailabilityTab;
  onChange: (tab: AvailabilityTab) => void;
}

export const AvailabilityTabs: React.FC<AvailabilityTabsProps> = ({
  activeTab,
  onChange,
}) => {
  const tabs = [
    { key: "weekly" as const, label: "Disponibilidade semanal" },
    { key: "blocks" as const, label: "Bloqueios específicos" },
  ];

  return (
    <div 
      className="flex flex-row md:flex-col gap-2 w-full md:w-fit overflow-x-auto md:overflow-x-visible no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [scrollbar-width:none]" 
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex-1 md:flex-none text-center md:text-left px-4 py-3 rounded-md text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? "bg-blue-50 text-blue-600 font-bold border border-blue-100 md:border-none"
                : "bg-slate-50 md:bg-transparent text-slate-500 hover:bg-slate-100 md:hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};