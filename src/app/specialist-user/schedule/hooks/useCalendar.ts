import { useState, useMemo } from "react";
import { startOfDay, startOfWeek, addDays, subDays } from "date-fns";

export interface UseCalendarProps {
  initialViewMode?: "semana" | "dia";
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 para Domingo, 1 para Segunda
}

export const useCalendar = ({
  initialViewMode = "semana",
  weekStartsOn = 0,
}: UseCalendarProps = {}) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => startOfDay(new Date()));
  const [viewMode, setViewMode] = useState<"semana" | "dia">(initialViewMode);

  const visibleDays = useMemo(() => {
    if (viewMode === "dia") {
      return [currentDate];
    }
    const start = startOfWeek(currentDate, { weekStartsOn });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentDate, viewMode]);

  const handleToday = () => {
    setCurrentDate(startOfDay(new Date()));
  };

  const handlePrev = () => {
    setCurrentDate((prev) => 
      viewMode === "semana" ? subDays(prev, 7) : subDays(prev, 1)
    );
  };

  const handleNext = () => {
    setCurrentDate((prev) => 
      viewMode === "semana" ? addDays(prev, 7) : addDays(prev, 1)
    );
  };

  const handleNavigateToDate = (targetDate: Date) => {
    setCurrentDate(startOfDay(targetDate));
  };

  return {
    visibleDays,
    viewMode,
    setViewMode,
    handleToday,
    handlePrev,
    handleNext,
    handleNavigateToDate,
  };
};