import React, { useEffect, useMemo, useState } from "react";
import { isSameDay, startOfWeek, addDays } from "date-fns";
import { AppointmentData } from "../../types";
import { MobileCalendarHeader } from "../MobileCalendarHeader";
import { DesktopCalendarHeader } from "../DesktopCalendarHeader";
import { TimeGrid } from "../TimeGrid";

interface CalendarGridProps {
  visibleDays: Date[];
  timeSlots: string[];
  appointments: AppointmentData[];
  viewMode: "semana" | "dia";
  onSelectAppointment: (app: AppointmentData) => void;
  onNavigateToDate: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  visibleDays,
  timeSlots,
  appointments,
  viewMode,
  onSelectAppointment,
  onNavigateToDate,
}) => {
  const [selectedDayMobile, setSelectedDayMobile] = useState<Date>(() => {
    const today = new Date();
    const hasToday = visibleDays.some((day) => isSameDay(day, today));
    return hasToday ? today : visibleDays[0] || new Date();
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonthPivot, setCurrentMonthPivot] = useState(
    () => selectedDayMobile,
  );

  useEffect(() => {
    const hasDay = visibleDays.some((day) => isSameDay(day, selectedDayMobile));
    if (!hasDay && visibleDays.length > 0) {
      const today = new Date();
      const hasToday = visibleDays.some((day) => isSameDay(day, today));
      const targetDay = hasToday ? today : visibleDays[0];
      setSelectedDayMobile(targetDay);
      setCurrentMonthPivot(targetDay);
    }
  }, [visibleDays]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDayMobile, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, index) => addDays(start, index));
  }, [selectedDayMobile]);

  const handleSelectDay = (day: Date) => {
    setSelectedDayMobile(day);
    setCurrentMonthPivot(day);
    setIsExpanded(false);
    onNavigateToDate(day);
  };

  const desktopGridColsClass =
    viewMode === "semana"
      ? "grid-cols-[64px_repeat(7,1fr)]"
      : "grid-cols-[64px_1fr]";

  return (
    <div
      className="bg-white lg:rounded-2xl lg:border lg:border-slate-100 lg:shadow-sm overflow-hidden flex flex-col h-[calc(100dvh-8rem)] lg:h-[calc(100vh-240px)] -mx-4 -mt-4 lg:mx-0 lg:mt-0"
      role="region"
      aria-label={`Grade de calendário de ${viewMode === "semana" ? "semana" : "dia"}`}
    >
      <MobileCalendarHeader
        selectedDay={selectedDayMobile}
        weekDays={weekDays}
        isExpanded={isExpanded}
        currentMonthPivot={currentMonthPivot}
        onToggleExpanded={() => setIsExpanded((open) => !open)}
        onSelectDay={handleSelectDay}
        onMonthChange={setCurrentMonthPivot}
      />

      <DesktopCalendarHeader
        visibleDays={visibleDays}
        gridColsClass={desktopGridColsClass}
      />

      <TimeGrid
        visibleDays={visibleDays}
        selectedDayMobile={selectedDayMobile}
        timeSlots={timeSlots}
        appointments={appointments}
        viewMode={viewMode}
        onSelectAppointment={onSelectAppointment}
      />
    </div>
  );
};
