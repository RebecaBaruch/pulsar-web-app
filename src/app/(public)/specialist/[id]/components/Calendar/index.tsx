"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  availableDates?: string[]; // ISO dates from backend (YYYY-MM-DD)
  onMonthChange?: (date: Date) => void; // notify controller to refetch availability
}

export default function Calendar({
  selectedDate,
  onSelectDate,
  availableDates = [],
  onMonthChange,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const prevMonth = () => {
    const next = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    );
    setCurrentMonth(next);
    onMonthChange?.(next);
  };

  const nextMonth = () => {
    const next = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
    );
    setCurrentMonth(next);
    onMonthChange?.(next);
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 sm:h-9" aria-hidden="true" />,
      );
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      date.setHours(0, 0, 0, 0);

      const isToday = date.getTime() === today.getTime();
      const isSelected =
        selectedDate &&
        date.getTime() ===
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          ).getTime();
      const isPast = date < today;
      const iso = date.toISOString().slice(0, 10);
      const isAvailable = availableDates.includes(iso);
      const isDisabled = isPast || !isAvailable;

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && onSelectDate(date)}
          disabled={isDisabled}
          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium transition-all sm:h-9 sm:w-9 sm:text-xs ${
            isDisabled
              ? "cursor-not-allowed text-gray-300"
              : "cursor-pointer hover:bg-blue-100"
          } ${isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : ""} ${
            isToday && !isSelected
              ? "border-2 border-blue-600 text-blue-600"
              : ""
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const canGoPrev = () => {
    const today = new Date();
    const firstOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const firstOfDisplayMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    return firstOfDisplayMonth >= firstOfCurrentMonth;
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 md:w-fit md:min-w-[18rem]">
      <div className="flex w-full items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-gray-darkest">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canGoPrev()}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Mês anterior"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Próximo mês"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      </div>

      <div className="grid w-full grid-cols-7 gap-x-0.5 gap-y-1 sm:gap-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="flex h-8 items-center justify-center text-[10px] font-medium text-gray-500 sm:h-9"
          >
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
}
