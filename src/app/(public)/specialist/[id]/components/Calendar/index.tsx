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
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
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
          className={`
            aspect-square rounded-full flex items-center justify-center text-xs font-medium transition-all
            ${isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-blue-100 cursor-pointer"}
            ${isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
            ${isToday && !isSelected ? "border-2 border-blue-600 text-blue-600" : ""}
          `}
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
    <div className="w-full md:w-fit flex flex-col items-center gap-2 bg-white rounded-lg">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xs text-gray-darkest font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <div className="flex gap-4">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev()}
            className="w-2 h-2 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed "
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
          <button
            onClick={nextMonth}
            className="w-2 h-2 rounded-full flex items-center cursor-pointer justify-center hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="aspect-square flex items-center justify-center text-[10px] font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
}
