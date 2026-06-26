"use client";

import React, { JSX } from "react";
import {
  startOfWeek,
  addDays,
  subWeeks,
  addWeeks,
  subDays,
  addDays as addSingleDay,
} from "date-fns";
import { ScheduleView } from "../view/index.view";
import { AppointmentData, CalendarViewMode } from "../types";
import { mockAppointments as MOCK_APPOINTMENTS } from "../mock/mockAppointments";

export default function HomeController(): JSX.Element {
  const [currentDate, setCurrentDate] = React.useState<Date>(() => new Date());
  const [viewMode, setViewMode] = React.useState<CalendarViewMode>("semana");
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<AppointmentData | null>(null);

  // Calcula os dias da semana dinamicamente com base no dia atual (currentDate)
  const visibleDays = React.useMemo(() => {
    if (viewMode === "dia") {
      return [currentDate];
    }
    // Inicia no Domingo da semana atual da data selecionada
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }).map((_, index) => addDays(start, index));
  }, [currentDate, viewMode]);

  const handleNext = () => {
    setCurrentDate((prev) =>
      viewMode === "semana" ? addWeeks(prev, 1) : addSingleDay(prev, 1),
    );
  };

  const handlePrev = () => {
    setCurrentDate((prev) =>
      viewMode === "semana" ? subWeeks(prev, 1) : subDays(prev, 1),
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleRemarcar = (id: string) => {
    console.log("Remarcar ID:", id);
  };

  const handleCancelar = (id: string) => {
    console.log("Cancelar ID:", id);
  };

  const timeSlots = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  return (
    <ScheduleView
      visibleDays={visibleDays}
      timeSlots={timeSlots}
      appointments={MOCK_APPOINTMENTS}
      viewMode={viewMode}
      selectedAppointment={selectedAppointment}
      onViewModeChange={setViewMode}
      onSelectAppointment={setSelectedAppointment}
      onNext={handleNext}
      onPrev={handlePrev}
      onToday={handleToday}
      onRemarcar={handleRemarcar}
      onCancelar={handleCancelar}
    />
  );
}
