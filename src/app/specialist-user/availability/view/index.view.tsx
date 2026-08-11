import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
  AvailabilityTabs,
  type AvailabilityTab,
} from "../components/AvailabilityTabs";
import { WeeklyAvailabilityCard } from "../components/WeeklyAvailabilityCard/WeeklyAvailabilityCard";
import { SpecificBlocksCard } from "../components/SpecificBlocksCard";
import { DayAvailability } from "../types";
import { BlockedDate } from "../hooks/useSpecificBlocks";

interface AvailabilityViewProps {
  activeTab: AvailabilityTab;
  onTabChange: (tab: AvailabilityTab) => void;
  // Disponibilidade Semanal Props
  weeklyDays: DayAvailability[];
  onToggleDay: (index: number) => void;
  onToggleAccordion: (index: number) => void;
  onAddRange: (index: number) => void;
  onRemoveRange: (dayIndex: number, rangeId: string) => void;
  onTimeChange: (
    dayIndex: number,
    rangeId: string,
    field: "start" | "end",
    value: string,
  ) => void;

  // Bloqueio Específico Props
  blockedList: BlockedDate[];
  blockType: string;
  setBlockType: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  reason: string;
  setReason: (value: string) => void;
  onAddBlock: () => void;
  onRemoveBlock: (id: string) => void;
}

export const AvailabilityView: React.FC<AvailabilityViewProps> = ({
  activeTab,
  onTabChange,
  weeklyDays,
  onToggleDay,
  onToggleAccordion,
  onAddRange,
  onRemoveRange,
  onTimeChange,
  blockedList,
  blockType,
  setBlockType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  reason,
  setReason,
  onAddBlock,
  onRemoveBlock,
}) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full">
      {/* main header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Disponibilidade
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Configure os horários e datas disponíveis para atendimento.
        </p>
      </div>

      {/* alert banner */}
      <div className="flex items-start md:items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-2xl p-3 md:p-4 text-xs md:text-sm text-gray-600 font-semibold">
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="text-gray-400 mt-0.5 md:mt-0"
        />
        <span>Alterações afetam apenas agendamentos futuros</span>
      </div>

      <hr className="border-gray-100 my-1 md:my-2" />

      {/* main grid */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full">
        {/* tabs */}
        <AvailabilityTabs activeTab={activeTab} onChange={onTabChange} />

        {/* content panel */}
        <div className="flex-1 w-full h-full bg-white rounded-md border border-gray-200 p-4 md:p-6">
          {activeTab === "weekly" ? (
            <WeeklyAvailabilityCard
              days={weeklyDays}
              onToggleDay={onToggleDay}
              onToggleAccordion={onToggleAccordion}
              onAddRange={onAddRange}
              onRemoveRange={onRemoveRange}
              onTimeChange={onTimeChange}
            />
          ) : (
            <SpecificBlocksCard
              blockedList={blockedList}
              blockType={blockType}
              setBlockType={setBlockType}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              reason={reason}
              setReason={setReason}
              onAddBlock={onAddBlock}
              onRemoveBlock={onRemoveBlock}
            />
          )}
        </div>
      </div>
    </div>
  );
};
