"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AvailabilityView } from "../view/index.view";
import { useWeeklyAvailability } from "../hooks/useWeeklyAvailability";
import { useSpecificBlocks } from "../hooks/useSpecificBlocks";
import type { AvailabilityTab } from "../components/AvailabilityTabs";
import type { ConflictingAppointment } from "../components/ConflictModal";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function AvailabilityController() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AvailabilityTab>("weekly");

  // Estado do Modal de Conflito de Agendamentos
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [conflictingAppointments, setConflictingAppointments] = useState<
    ConflictingAppointment[]
  >([]);

  const weeklyAvailability = useWeeklyAvailability();
  const specificBlocks = useSpecificBlocks();

  const handleAddBlockWithValidation = () => {
    const mockConflicts: ConflictingAppointment[] = [
      {
        id: "1",
        patientName: "Ana Clara Silva",
        date: "15/10/2026",
        time: "09:00",
      },
      {
        id: "2",
        patientName: "Carlos Eduardo Santos",
        date: "15/10/2026",
        time: "10:30",
      },
      {
        id: "3",
        patientName: "Mariana Costa",
        date: "15/10/2026",
        time: "14:00",
      },
      {
        id: "4",
        patientName: "Roberto Alves",
        date: "16/10/2026",
        time: "16:00",
      },
    ];

    if (mockConflicts.length > 0) {
      setConflictingAppointments(mockConflicts);
      setIsConflictModalOpen(true);
    } else {
      specificBlocks.handleAddBlock();
    }
  };

  const handleGoToAgenda = () => {
    setIsConflictModalOpen(false);
    router.push(RoutesUrls.SPECIALIST_SCHEDULE || "/agenda");
  };

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
      onAddBlock={handleAddBlockWithValidation}
      onRemoveBlock={specificBlocks.handleRemoveBlock}
      isConflictModalOpen={isConflictModalOpen}
      conflictingAppointments={conflictingAppointments}
      onCloseConflictModal={() => setIsConflictModalOpen(false)}
      onGoToAgenda={handleGoToAgenda}
    />
  );
}
