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
    <header className="flex flex-col gap-4 w-full sticky top-0 z-10 pb-6 bg-[#ffffff] border-b border-gray-200 sticky">
      <h1 className="text-2xl font-bold">Minhas Sessões</h1>
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
