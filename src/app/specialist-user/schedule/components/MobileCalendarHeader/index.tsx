import React from "react";
import {
  format,
  isSameDay,
  isToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const WEEKDAY_LETTERS = ["D", "S", "T", "Q", "Q", "S", "S"];

interface MobileCalendarHeaderProps {
  selectedDay: Date;
  weekDays: Date[];
  isExpanded: boolean;
  currentMonthPivot: Date;
  onToggleExpanded: () => void;
  onSelectDay: (day: Date) => void;
  onMonthChange: (month: Date) => void;
}

export const MobileCalendarHeader: React.FC<MobileCalendarHeaderProps> = ({
  selectedDay,
  weekDays,
  isExpanded,
  currentMonthPivot,
  onToggleExpanded,
  onSelectDay,
  onMonthChange,
}) => {
  const monthStart = startOfMonth(currentMonthPivot);
  const monthEnd = endOfMonth(monthStart);
  const startDateMatrix = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDateMatrix = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const allMonthDaysMatrix = eachDayOfInterval({
    start: startDateMatrix,
    end: endDateMatrix,
  });

  return (
    <div className="flex lg:hidden flex-col bg-blue text-white select-none px-4">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <button
          type="button"
          onClick={onToggleExpanded}
          className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md"
          aria-expanded={isExpanded}
          aria-label="Abrir calendário do mês"
        >
          <span className="text-base font-semibold capitalize tracking-tight">
            {format(currentMonthPivot, "MMMM", { locale: ptBR })}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-[10px] text-white/90 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMonthChange(subMonths(currentMonthPivot, 1))}
            className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Mês anterior"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(addMonths(currentMonthPivot, 1))}
            className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Próximo mês"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      </div>

      {isExpanded ? (
        <div className="px-2 pb-3">
          <div className="grid grid-cols-7 text-center text-[10px] text-white/70 font-semibold uppercase tracking-wider mb-2 ">
            {WEEKDAY_LETTERS.map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {allMonthDaysMatrix.map((day) => {
              const isSelected = isSameDay(day, selectedDay);
              const isDayCurrent = isToday(day);
              const isCurrentMonthScope =
                day.getMonth() === currentMonthPivot.getMonth();

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => onSelectDay(day)}
                  className="flex justify-center items-center py-0.5"
                >
                  <span
                    className={`text-sm w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                      isSelected
                        ? "bg-white text-blue font-bold shadow-sm"
                        : isDayCurrent
                          ? "bg-white/20 text-white font-semibold"
                          : isCurrentMonthScope
                            ? "text-white/90 hover:bg-white/10"
                            : "text-white/35"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="px-1 pb-1">
          <div className="grid grid-cols-7 text-center mb-1">
            {weekDays.map((day) => (
              <span
                key={`label-${day.toISOString()}`}
                className="text-[11px] font-medium uppercase tracking-wide text-white/75"
              >
                {format(day, "EEEEEE", { locale: ptBR }).charAt(0)}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {weekDays.map((day) => {
              const isSelected = isSameDay(day, selectedDay);
              const isDayCurrent = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => onSelectDay(day)}
                  className="flex flex-col items-center py-1"
                  aria-pressed={isSelected}
                  aria-label={format(day, "EEEE, d 'de' MMMM", { locale: ptBR })}
                >
                  <span
                    className={`text-sm w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                      isSelected
                        ? "bg-white text-blue font-bold shadow-sm"
                        : isDayCurrent
                          ? "bg-white/20 text-white font-semibold"
                          : "text-white font-medium hover:bg-white/10"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center pt-1 pb-2 bg-white rounded-t-2xl mt-1">
        <div
          className="w-10 h-1 rounded-full bg-slate-300"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
