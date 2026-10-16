import React from "react";
import { format, isSameDay, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMobileCalendarHeader } from "../../hooks/useMobileCalendarHeader";

const WEEKDAY_LETTERS = ["D", "S", "T", "Q", "Q", "S", "S"];

interface MobileCalendarHeaderProps {
  selectedDay: Date;
  isExpanded: boolean;
  currentMonthPivot: Date;
  markedDates?: ReadonlySet<string>;
  onToggleExpanded: () => void;
  onSelectDay: (day: Date) => void;
  onSelectMonth: (month: Date) => void;
}

export const MobileCalendarHeader: React.FC<MobileCalendarHeaderProps> = ({
  selectedDay,
  isExpanded,
  currentMonthPivot,
  markedDates,
  onToggleExpanded,
  onSelectDay,
  onSelectMonth,
}) => {
  const {
    isMonthPickerOpen,
    pickerYear,
    setPickerYear,
    monthPickerRef,
    monthMatrix,
    weekCount,
    selectedWeekIndex,
    monthLabels,
    toggleMonthPicker,
    handleMonthPick,
    onDaysPointerDown,
    onDaysPointerUp,
    onDaysClickCapture,
    onHandlePointerDown,
    onHandlePointerUp,
    onHandleClick,
  } = useMobileCalendarHeader({
    selectedDay,
    isExpanded,
    currentMonthPivot,
    onToggleExpanded,
    onSelectDay,
    onSelectMonth,
  });

  const showYear = currentMonthPivot.getFullYear() !== new Date().getFullYear();
  const selectedWeekday = selectedDay.getDay();
  const currentDate = new Date();

  return (
    <div className="block lg:hidden shrink-0 select-none bg-blue text-white rounded-t-2xl">
      <div ref={monthPickerRef} className="relative z-40 px-4 pt-2">
        <button
          type="button"
          onClick={toggleMonthPicker}
          className="flex min-h-11 items-center gap-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-expanded={isMonthPickerOpen}
          aria-haspopup="listbox"
          aria-controls="mobile-month-picker"
          aria-label="Selecionar mês"
        >
          <span className="text-[17px] font-semibold capitalize tracking-tight">
            {format(currentMonthPivot, "MMMM", { locale: ptBR })}
          </span>
          {showYear && (
            <span className="text-sm font-medium text-white/80">
              {format(currentMonthPivot, "yyyy")}
            </span>
          )}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-[11px] text-white/90 transition-transform duration-200 ${
              isMonthPickerOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isMonthPickerOpen && (
          <div
            id="mobile-month-picker"
            role="listbox"
            aria-label="Meses"
            className="absolute left-3 right-3 top-full z-40 mt-1 rounded-2xl border border-gray-100 bg-white p-3 text-gray-900 shadow-xl"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => setPickerYear((year) => year - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                aria-label="Ano anterior"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
              </button>
              <span className="text-sm font-semibold tabular-nums text-gray-900">
                {pickerYear}
              </span>
              <button
                type="button"
                onClick={() => setPickerYear((year) => year + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                aria-label="Próximo ano"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {monthLabels.map((label, monthIndex) => {
                const isSelectedMonth =
                  currentMonthPivot.getFullYear() === pickerYear &&
                  currentMonthPivot.getMonth() === monthIndex;
                const isCurrentMonth =
                  currentDate.getFullYear() === pickerYear &&
                  currentDate.getMonth() === monthIndex;

                return (
                  <button
                    key={label}
                    type="button"
                    role="option"
                    aria-selected={isSelectedMonth}
                    onClick={() => handleMonthPick(monthIndex)}
                    className={`min-h-11 rounded-xl px-2 py-2 text-sm capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                      isSelectedMonth
                        ? "bg-blue font-semibold text-white"
                        : isCurrentMonth
                          ? "font-semibold text-blue hover:bg-blue-100"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-7 px-1 pb-0.5 text-center"
        aria-hidden="true"
      >
        {WEEKDAY_LETTERS.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={`text-[11px] uppercase tracking-wide ${
              index === selectedWeekday
                ? "font-semibold text-white"
                : "font-medium text-white/65"
            }`}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="px-1 pb-2 [--row:3rem]">
        <div
          id="mobile-month-days"
          className="overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
          style={{
            height: isExpanded
              ? `calc(${weekCount} * var(--row))`
              : "var(--row)",
          }}
        >
          <div
            className="touch-pan-y transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform: isExpanded
                ? undefined
                : `translateY(calc(${selectedWeekIndex} * var(--row) * -1))`,
            }}
            onPointerDown={onDaysPointerDown}
            onPointerUp={onDaysPointerUp}
            onClickCapture={onDaysClickCapture}
          >
            {Array.from({ length: weekCount }, (_, weekIndex) => {
              const hidden = !isExpanded && weekIndex !== selectedWeekIndex;
              const week = monthMatrix.slice(weekIndex * 7, weekIndex * 7 + 7);

              return (
                <div
                  key={week[0].toISOString()}
                  className="grid h-[var(--row)] grid-cols-7"
                  inert={hidden}
                  aria-hidden={hidden}
                >
                  {week.map((day) => (
                    <DayButton
                      key={day.toISOString()}
                      day={day}
                      selected={isSameDay(day, selectedDay)}
                      inMonth={day.getMonth() === currentMonthPivot.getMonth()}
                      marked={
                        markedDates?.has(format(day, "yyyy-MM-dd")) ?? false
                      }
                      onSelect={onSelectDay}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-t-2xl bg-white">
        <button
          type="button"
          onPointerDown={onHandlePointerDown}
          onPointerUp={onHandlePointerUp}
          onClick={onHandleClick}
          className="mx-auto flex h-8 w-full cursor-grab touch-none items-center justify-center active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          aria-expanded={isExpanded}
          aria-controls="mobile-month-days"
          aria-label={
            isExpanded ? "Recolher calendário" : "Expandir calendário do mês"
          }
        >
          <span
            className="h-1 w-10 rounded-full bg-gray-300"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

interface DayButtonProps {
  day: Date;
  selected: boolean;
  inMonth: boolean;
  marked: boolean;
  onSelect: (day: Date) => void;
}

function DayButton({
  day,
  selected,
  inMonth,
  marked,
  onSelect,
}: DayButtonProps) {
  const today = isToday(day);

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      aria-pressed={selected}
      aria-current={today ? "date" : undefined}
      aria-label={format(day, "EEEE, d 'de' MMMM", { locale: ptBR })}
      className="group relative flex h-[var(--row)] items-center justify-center focus:outline-none"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm leading-none tabular-nums transition-colors group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-blue ${
          selected
            ? "bg-white font-bold text-blue shadow-sm"
            : today
              ? "font-semibold text-white ring-2 ring-white/85"
              : inMonth
                ? "font-medium text-white"
                : "font-medium text-white/35"
        }`}
      >
        {format(day, "d")}
      </span>
      {marked && (
        <span
          className={`absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
            inMonth || selected ? "bg-white" : "bg-white/40"
          }`}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
