import { clientStickyHeaderClass } from "@/components/ClientPage";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type ActiveTab = "next" | "history";

type SessionsHeaderProps = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

export default function SessionsHeader({ activeTab, setActiveTab }: SessionsHeaderProps) {
  
  return (
    <header className={clientStickyHeaderClass}>
      <h1 className="text-2xl font-semibold text-gray-darkest">Minhas Sessões</h1>
      <div className="flex flex-row gap-4">
        <div className="w-fit rounded-full overflow-hidden">
          <PrimaryButton
            text="Próximas sessões"
            onClick={() => setActiveTab("next")}
            icon={faCalendar}
            color={activeTab === "next" ? "dark" : "gray"}
          />
        </div>
        <div className="w-fit rounded-full overflow-hidden">
          <PrimaryButton
            text="Histórico"
            onClick={() => setActiveTab("history")}
            icon={faClock}
            color={activeTab === "history" ? "dark" : "gray"}
          />
        </div>
      </div>
    </header>
  );
}
