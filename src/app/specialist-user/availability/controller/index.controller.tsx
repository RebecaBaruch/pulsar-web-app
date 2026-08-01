"use client";

import React from "react";
import { AvailabilityView } from "../view/index.view";
import { useWeeklyAvailability } from "../hooks/useWeeklyAvailability";
import { useSpecificBlocks } from "../hooks/useSpecificBlocks"; // Importando o novo hook
import type { AvailabilityTab } from "../components/AvailabilityTabs";

export default function AvailabilityController() {
  const [activeTab, setActiveTab] = React.useState<AvailabilityTab>("weekly");
  
  const weeklyAvailability = useWeeklyAvailability();
  const specificBlocks = useSpecificBlocks();

  return (
    <AvailabilityView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      weeklyDays={weeklyAvailability.weeklyDays}
      onToggleDay={weeklyAvailability.toggleDay}
      onToggleAccordion={weeklyAvailability.toggleAccordion}
      onAddRange={weeklyAvailability.addRange}
      onRemoveRange={weeklyAvailability.removeRange}
      onTimeChange={weeklyAvailability.updateTime}
      blockedList={specificBlocks.blockedList}
      blockType={specificBlocks.blockType}
      setBlockType={specificBlocks.setBlockType}
      startDate={specificBlocks.startDate}
      setStartDate={specificBlocks.setStartDate}
      endDate={specificBlocks.endDate}
      setEndDate={specificBlocks.setEndDate}
      reason={specificBlocks.reason}
      setReason={specificBlocks.setReason}
      onAddBlock={specificBlocks.handleAddBlock}
      onRemoveBlock={specificBlocks.handleRemoveBlock}
    />
  );
}