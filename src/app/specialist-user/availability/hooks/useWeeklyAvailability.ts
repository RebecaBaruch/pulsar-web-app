import { useState } from "react";
import { DayAvailability } from "../types";

export function useWeeklyAvailability() {
  const [weeklyDays, setWeeklyDays] = useState<DayAvailability[]>([
    {
      dayName: "Segunda",
      enabled: true,
      isOpen: true,
      ranges: [{ id: "1", start: "09:00", end: "17:00" }],
    },
    {
      dayName: "Terça",
      enabled: true,
      isOpen: false,
      ranges: [{ id: "2", start: "09:00", end: "17:00" }],
    },
    {
      dayName: "Quarta",
      enabled: true,
      isOpen: false,
      ranges: [{ id: "3", start: "09:00", end: "17:00" }],
    },
    {
      dayName: "Quinta",
      enabled: true,
      isOpen: false,
      ranges: [{ id: "4", start: "09:00", end: "17:00" }],
    },
    {
      dayName: "Sexta",
      enabled: true,
      isOpen: false,
      ranges: [{ id: "5", start: "09:00", end: "17:00" }],
    },
    {
      dayName: "Sábado",
      enabled: false,
      isOpen: false,
      ranges: [{ id: "6", start: "09:00", end: "13:00" }],
    },
    {
      dayName: "Domingo",
      enabled: false,
      isOpen: false,
      ranges: [{ id: "7", start: "09:00", end: "13:00" }],
    },
  ]);

  // Altera o switch Ativo/Inativo do dia e fecha o accordion se desativado
  const toggleDay = (index: number) => {
    setWeeklyDays((prev) =>
      prev.map((day, i) => {
        if (i === index) {
          const nextEnabled = !day.enabled;
          return {
            ...day,
            enabled: nextEnabled,
            isOpen: nextEnabled ? day.isOpen : false,
          };
        }
        return day;
      })
    );
  };

  // Abre/Fecha o accordion do dia
  const toggleAccordion = (index: number) => {
    setWeeklyDays((prev) =>
      prev.map((day, i) =>
        i === index ? { ...day, isOpen: !day.isOpen } : day
      )
    );
  };

  // Adiciona uma nova faixa de horário
  const addRange = (dayIndex: number) => {
    const newRange = {
      id: Math.random().toString(36).substring(2, 9),
      start: "09:00",
      end: "17:00",
    };
    setWeeklyDays((prev) =>
      prev.map((day, i) =>
        i === dayIndex ? { ...day, ranges: [...day.ranges, newRange] } : day
      )
    );
  };

  // Remove uma faixa de horário
  const removeRange = (dayIndex: number, rangeId: string) => {
    setWeeklyDays((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? { ...day, ranges: day.ranges.filter((r) => r.id !== rangeId) }
          : day
      )
    );
  };

  // Altera o valor de horário de início ou fim
  const updateTime = (
    dayIndex: number,
    rangeId: string,
    field: "start" | "end",
    value: string
  ) => {
    setWeeklyDays((prev) =>
      prev.map((day, i) => {
        if (i === dayIndex) {
          return {
            ...day,
            ranges: day.ranges.map((range) =>
              range.id === rangeId ? { ...range, [field]: value } : range
            ),
          };
        }
        return day;
      })
    );
  };

  return {
    weeklyDays,
    toggleDay,
    toggleAccordion,
    addRange,
    removeRange,
    updateTime,
  };
}