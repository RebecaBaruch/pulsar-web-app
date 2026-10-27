"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AvailabilityView } from "../view/index.view";
import { useWeeklyAvailability } from "../hooks/useWeeklyAvailability";
import { useSpecificBlocks } from "../hooks/useSpecificBlocks";
import type { AvailabilityTab } from "../components/AvailabilityTabs";
import type { ConflictingAppointment } from "../components/ConflictModal";
import { RoutesUrls } from "@/utils/enum/routes-url";
import {
  createAvailabilityBlock,
  deleteAvailabilityBlock,
  fetchAvailabilityBlocks,
  fetchWeeklyAvailabilities,
  patchAvailabilityDay,
  upsertAvailabilityRange,
  deleteAvailability,
} from "../../services/specialistApi";

export default function AvailabilityController() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AvailabilityTab>("weekly");
  const [loading, setLoading] = useState(true);

  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [conflictingAppointments, setConflictingAppointments] = useState<
    ConflictingAppointment[]
  >([]);

  const weeklyAvailability = useWeeklyAvailability();
  const specificBlocks = useSpecificBlocks();
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [week, blocks] = await Promise.all([
          fetchWeeklyAvailabilities(),
          fetchAvailabilityBlocks(),
        ]);
        if (cancelled) return;
        weeklyAvailability.setWeeklyDays(week);
        specificBlocks.setBlockedList(blocks);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar disponibilidade.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleDay = async (index: number) => {
    const day = weeklyAvailability.weeklyDays[index];
    if (!day?.dayOfWeek) {
      weeklyAvailability.toggleDay(index);
      return;
    }

    const nextEnabled = !day.enabled;
    weeklyAvailability.toggleDay(index);

    try {
      await patchAvailabilityDay(day.dayOfWeek, nextEnabled);
    } catch (error) {
      weeklyAvailability.toggleDay(index);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar disponibilidade do dia.",
      );
    }
  };

  const handleTimeChange = (
    dayIndex: number,
    rangeId: string,
    field: "start" | "end",
    value: string,
  ) => {
    const day = weeklyAvailability.weeklyDays[dayIndex];
    const range = day?.ranges.find((r) => r.id === rangeId);
    if (!day?.dayOfWeek || !range) return;

    const nextStart = field === "start" ? value : range.start;
    const nextEnd = field === "end" ? value : range.end;

    weeklyAvailability.updateTime(dayIndex, rangeId, field, value);

    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(async () => {
      try {
        await upsertAvailabilityRange({
          backendId: range.backendId,
          dayOfWeek: day.dayOfWeek!,
          start: nextStart,
          end: nextEnd,
        });
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao salvar horário.",
        );
      }
    }, 700);
  };

  const handleRemoveRange = async (dayIndex: number, rangeId: string) => {
    const day = weeklyAvailability.weeklyDays[dayIndex];
    const range = day?.ranges.find((r) => r.id === rangeId);

    weeklyAvailability.removeRange(dayIndex, rangeId);

    if (range?.backendId) {
      try {
        await deleteAvailability(range.backendId);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao remover faixa de horário.",
        );
      }
    }
  };

  const handleAddBlockWithValidation = async () => {
    try {
      await createAvailabilityBlock({
        type: specificBlocks.blockType,
        startDate: specificBlocks.startDate,
        endDate: specificBlocks.endDate || specificBlocks.startDate,
        reason: specificBlocks.reason,
      });
      const blocks = await fetchAvailabilityBlocks();
      specificBlocks.setBlockedList(blocks);
      specificBlocks.setBlockType("");
      specificBlocks.setStartDate("");
      specificBlocks.setEndDate("");
      specificBlocks.setReason("");
      toast.success("Bloqueio criado.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar bloqueio.",
      );
    }
  };

  const handleRemoveBlock = async (id: string) => {
    specificBlocks.handleRemoveBlock(id);
    try {
      await deleteAvailabilityBlock(id);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao remover bloqueio.",
      );
    }
  };

  const handleGoToAgenda = () => {
    setIsConflictModalOpen(false);
    router.push(RoutesUrls.SPECIALIST_SCHEDULE);
  };

  if (loading) {
    return (
      <div className="h-40 animate-pulse rounded-lg bg-gray-light" aria-hidden />
    );
  }

  return (
    <AvailabilityView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      weeklyDays={weeklyAvailability.weeklyDays}
      onToggleDay={handleToggleDay}
      onToggleAccordion={weeklyAvailability.toggleAccordion}
      onAddRange={weeklyAvailability.addRange}
      onRemoveRange={handleRemoveRange}
      onTimeChange={handleTimeChange}
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
      onRemoveBlock={handleRemoveBlock}
      isConflictModalOpen={isConflictModalOpen}
      conflictingAppointments={conflictingAppointments}
      onCloseConflictModal={() => setIsConflictModalOpen(false)}
      onGoToAgenda={handleGoToAgenda}
    />
  );
}
