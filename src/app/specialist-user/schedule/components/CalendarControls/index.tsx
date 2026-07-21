import React, { useState, useRef, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isSameDay,
  isToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface CalendarControlsProps {
  visibleDays: Date[];
  viewMode: "semana" | "dia";
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  onNavigateToDate: (date: Date) => void;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
  visibleDays,
  viewMode,
  onToday,
  onPrev,
  onNext,
  onNavigateToDate,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [currentMonthPivot, setCurrentMonthPivot] = useState(
    () => visibleDays[0] || new Date(),
  );
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleDays[0]) {
      setCurrentMonthPivot(visibleDays[0]);
    }
  }, [visibleDays]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        pickerRef.current.contains(event.target as Node) === false
      ) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthStart = startOfMonth(currentMonthPivot);
  const monthEnd = endOfMonth(monthStart);
  const startDateMatrix = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDateMatrix = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const allMonthDaysMatrix = eachDayOfInterval({
    start: startDateMatrix,
    end: endDateMatrix,
  });

  return (
    <div className="hidden md:flex flex-row items-start md:items-center justify-between w-full">
      {/* CONTAINER DO PICKER DE DATA INTERATIVO */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setIsPickerOpen(!isPickerOpen)}
          className="font-bold text-xs md:text-sm text-slate-700 hover:bg-slate-50 px-2.5 py-1.5 w-fit rounded-lg border border-transparent hover:border-slate-200 transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          role="status"
          aria-live="polite"
        >
          {viewMode === "semana" && visibleDays.length > 0 ? (
            <span className="capitalize">
              {format(visibleDays[0], "dd 'de' MMMM", { locale: ptBR })} -{" "}
              {format(visibleDays[6], "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </span>
          ) : (
            visibleDays[0] && (
              <span className="capitalize">
                {format(visibleDays[0], "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
            )
          )}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-slate-400 text-[10px] transition-transform duration-150 ${isPickerOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* POPOVER DO CALENDÁRIO COMPLETO DO MÊS */}
        {isPickerOpen && (
          <div className="absolute left-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 w-72 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Topo do Menu: Mês atual e Controles de mudança de mês */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-bold text-slate-700 capitalize">
                {format(currentMonthPivot, "MMMM yyyy", { locale: ptBR })}
              </span>
              <div className="flex items-center gap-1 text-slate-500">
                <button
                  onClick={() =>
                    setCurrentMonthPivot(subMonths(currentMonthPivot, 1))
                  }
                  className="p-1.5 hover:bg-slate-50 hover:text-slate-800 rounded-lg cursor-pointer"
                >
                  <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                </button>
                <button
                  onClick={() =>
                    setCurrentMonthPivot(addMonths(currentMonthPivot, 1))
                  }
                  className="p-1.5 hover:bg-slate-50 hover:text-slate-800 rounded-lg cursor-pointer"
                >
                  <FontAwesomeIcon icon={faChevronRight} size="sm" />
                </button>
              </div>
            </div>

            {/* Cabeçalho dos dias da semana (Letras) */}
            <div className="grid grid-cols-7 text-center text-[10px] text-slate-400 font-bold uppercase mb-1">
              {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>

            {/* Grid numérico dos dias */}
            <div className="grid grid-cols-7 text-center gap-y-0.5">
              {allMonthDaysMatrix.map((day, idx) => {
                const isDayInVisibleRange = visibleDays.some((vDay) =>
                  isSameDay(vDay, day)
                );
            
                const isMainActiveDay = viewMode === "dia" 
                  ? isSameDay(visibleDays[0], day)
                  : isToday(day) && isDayInVisibleRange;

                const isDayCurrent = isToday(day);
                const isCurrentMonthScope =
                  day.getMonth() === currentMonthPivot.getMonth();

                // Lógica de estilos encadeada perfeitamente
                let dayStyles = "text-slate-700 hover:bg-slate-100";
                
                if (isMainActiveDay || isDayCurrent) {
                  // Dia atual/Focado ganha azul primário total
                  dayStyles = "bg-blue-600 text-white font-bold shadow-sm rounded-full";
                } else if (isDayInVisibleRange) {
                  // Demais dias da semana ativa ganham um azul sutil de background
                  dayStyles = "bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100/70";
                } else if (!isCurrentMonthScope) {
                  // Dias de fora do escopo do mês atual
                  dayStyles = "text-slate-300 hover:bg-slate-50 rounded-full";
                } else {
                  dayStyles = "text-slate-700 hover:bg-slate-100 rounded-full";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigateToDate(day);
                      setIsPickerOpen(false);
                    }}
                    className="py-1 flex justify-center items-center cursor-pointer"
                  >
                    <span
                      className={`text-xs w-7 h-7 flex items-center justify-center transition-all ${dayStyles}`}
                    >
                      {format(day, "d")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row items-start md:items-center gap-4 w-full md:w-auto">
        <button
          onClick={onToday}
          className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs md:text-sm font-medium rounded-lg hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Ir para hoje"
          title="Ir para a data de hoje"
        >
          Hoje
        </button>

        {/* Setas de Navegação */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg shadow-sm">
          <button
            onClick={onPrev}
            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Semana/dia anterior"
            title="Ir para a semana ou dia anterior"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="xs" />
          </button>
          <button
            onClick={onNext}
            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Semana/dia posterior"
            title="Ir para a próxima semana ou dia"
          >
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </button>
        </div>
      </div>
    </div>
  );
};