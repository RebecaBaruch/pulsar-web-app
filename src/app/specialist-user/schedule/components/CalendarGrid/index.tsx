import React, { useEffect, useRef, useState } from "react";
import { format, isSameDay, isToday, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentData } from "../../types";

interface CalendarGridProps {
  visibleDays: Date[];
  timeSlots: string[];
  appointments: AppointmentData[];
  viewMode: "semana" | "dia";
  onSelectAppointment: (app: AppointmentData) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  visibleDays,
  timeSlots,
  appointments,
  viewMode,
  onSelectAppointment,
}) => {
  // Mobile active day selection state
  const [selectedDayMobile, setSelectedDayMobile] = useState<Date>(() => {
    const today = new Date();
    const hasToday = visibleDays.some((d) => isSameDay(d, today));
    return hasToday ? today : visibleDays[0] || new Date();
  });

  // State to control full month grid dropdown on mobile view
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonthPivot, setCurrentMonthPivot] = useState(() => selectedDayMobile);

  // Responsive grid mapping
  const gridColsClass =
    viewMode === "semana"
      ? "grid-cols-[64px_1fr] md:grid-cols-[64px_repeat(7,1fr)]"
      : "grid-cols-[64px_1fr]";

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasDay = visibleDays.some((d) => isSameDay(d, selectedDayMobile));
    if (!hasDay && visibleDays.length > 0) {
      const today = new Date();
      const hasToday = visibleDays.some((d) => isSameDay(d, today));
      const targetDay = hasToday ? today : visibleDays[0];
      setSelectedDayMobile(targetDay);
      setCurrentMonthPivot(targetDay);
    }
  }, [visibleDays]);

  const calculateIndicatorTop = () => {
    if (timeSlots.length === 0) return null;

    const firstSlotHour = parseInt(timeSlots[0].split(":")[0], 10);
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const lastSlotHour = parseInt(timeSlots[timeSlots.length - 1].split(":")[0], 10);

    if (currentHour < firstSlotHour || currentHour > lastSlotHour) return null;

    const hoursPassed = currentHour - firstSlotHour;
    const rowHeight = window.innerWidth >= 768 ? 112 : 96;

    return hoursPassed * rowHeight + (currentMinutes / 60) * rowHeight;
  };

  const indicatorTop = calculateIndicatorTop();

  const isIndicatorVisibleInView = () => {
    const isDesktopTodayVisible = visibleDays.some((day) => isToday(day));
    const isMobileTodayVisible = isToday(selectedDayMobile);

    return window.innerWidth >= 768 ? isDesktopTodayVisible : isMobileTodayVisible;
  };

  useEffect(() => {
    if (containerRef.current && indicatorTop !== null && isIndicatorVisibleInView()) {
      containerRef.current.scrollTop = indicatorTop - 150;
    } else if (containerRef.current) {
      const commercialOrderIndex = timeSlots.indexOf("09:00");
      if (commercialOrderIndex !== -1) {
        const rowHeight = window.innerWidth >= 768 ? 112 : 96;
        containerRef.current.scrollTop = commercialOrderIndex * rowHeight;
      }
    }
  }, [indicatorTop, selectedDayMobile, viewMode]);

  const getNextAppointmentId = (): string | null => {
    const now = new Date();
    const futureAppointments = appointments
      .map((app) => ({
        ...app,
        fullDateTime: parseISO(`${app.date}T${app.startTime}:00`),
      }))
      .filter((app) => app.fullDateTime >= now)
      .sort((a, b) => a.fullDateTime.getTime() - b.fullDateTime.getTime());

    return futureAppointments.length > 0 ? futureAppointments[0].id : null;
  };

  const nextAppointmentId = getNextAppointmentId();

  const appointmentEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return format(endDate, "HH:mm");
  };

  // Helper selectors for the dropdown monthly grid matrix layout logic
  const monthStart = startOfMonth(currentMonthPivot);
  const monthEnd = endOfMonth(monthStart);
  const startDateMatrix = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDateMatrix = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const allMonthDaysMatrix = eachDayOfInterval({ start: startDateMatrix, end: endDateMatrix });

  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-240px)]"
      role="region"
      aria-label={`Grade de calendário de ${viewMode === "semana" ? "semana" : "dia"}`}
    >
      {/* MOBILE CONTAINER HEADER */}
      <div className="flex md:hidden flex-col bg-blue-500 text-white select-none transition-all duration-200">
        
        {/* Top bar control container row layer */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span className="text-base font-extrabold capitalize tracking-tight">
              {format(currentMonthPivot, "MMMM", { locale: ptBR })}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <div className="flex items-center gap-4 text-white">
            <button onClick={() => setCurrentMonthPivot(subMonths(currentMonthPivot, 1))} className="p-1 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={() => setCurrentMonthPivot(addMonths(currentMonthPivot, 1))} className="p-1 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dynamic Expandable View Section Track */}
        {isExpanded ? (
          /* FULL MONTH GRID VIEW MODE (dynamic matrix drop down look) */
          <div className="pt-2 transition-all border border-blue">
            <div className="grid grid-cols-7 text-center text-[10px] text-white text-bold uppercase tracking-wider mb-4">
              {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center bg-white border-b border-blue">
              {allMonthDaysMatrix.map((day, idx) => {
                const isSelected = isSameDay(day, selectedDayMobile);
                const isDayCurrent = isToday(day);
                const isCurrentMonthScope = day.getMonth() === currentMonthPivot.getMonth();

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDayMobile(day);
                      setCurrentMonthPivot(day);
                      setIsExpanded(false);
                    }}
                    className="flex justify-center items-center py-1"
                  >
                    <span
                      className={`text-xs font-semibold w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                        isSelected
                          ? "bg-blue text-white shadow-md shadow-blue-500/30"
                          : isDayCurrent
                            ? "border border-blue text-white"
                            : isCurrentMonthScope
                              ? "text-gray-dark hover:bg-slate-800"
                              : "text-gray-500 hover:bg-slate-800/40"
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
          /* COLLAPSED HORIZONTAL WEEK STRIP VIEW MODE */
          viewMode === "semana" && (
            <div className="flex pt-2 justify-between items-center">
              {visibleDays.map((day, idx) => {
                const isSelected = isSameDay(day, selectedDayMobile);
                const isDayCurrent = isToday(day);
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDayMobile(day);
                      setCurrentMonthPivot(day);
                    }}
                    className="flex flex-col items-center flex-1 py-1 gap-4 rounded-xl transition-all"
                  >
                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                      {format(day, "E", { locale: ptBR }).substring(0, 1)}
                    </span>
                    <div className="flex items-center justify-center w-full py-2 bg-white">
                      <span
                        className={`text-sm font-semibold mt-1 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                          isSelected
                            ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                            : isDayCurrent
                              ? "border border-blue-400 text-blue-400"
                              : "text-gray-dark hover:bg-slate-800"
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )
        )}
      </div>

      {/* DESKTOP HEADER VIEW: Sticky column headings */}
      <div
        className={`grid ${gridColsClass} border-b border-slate-100 bg-slate-50/60 text-center py-3 md:py-4 px-2 md:px-0 text-xs font-medium text-slate-400 items-center sticky top-0 z-20 backdrop-blur-md`}
        role="row"
      >
        <div className="hidden md:block text-left pl-4 font-bold text-slate-500 w-16 text-xs">
          Horário
        </div>

        {visibleDays.map((day, idx) => {
          const isCurrentDay = isToday(day);
          const isMobileHidden =
            viewMode === "semana" && !isSameDay(day, selectedDayMobile);

          return (
            <div
              key={idx}
              className={`justify-center items-center w-full ${
                isMobileHidden ? "hidden md:flex" : "flex"
              }`}
            >
              {/* It will disappear on mobile */}
              {isCurrentDay ? (
                <div className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded-md shadow-md shadow-blue-500/10 flex-col items-center min-w-[64px]">
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-90">
                    {format(day, "EEEE", { locale: ptBR }).split("-")[0]}
                  </span>
                  <span className="text-base font-extrabold mt-0.5">
                    {format(day, "d")}
                  </span>
                </div>
              ) : (
                <div className="hidden md:flex flex-col items-center">
                  <span className="text-[11px] capitalize text-slate-400 font-medium tracking-wide">
                    {format(day, "EEEE", { locale: ptBR }).split("-")[0]}
                  </span>
                  <span className="text-base font-bold text-slate-800 mt-0.5">
                    {format(day, "d")}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Grid Body (Scrollable Container Track) */}
      <div
        ref={containerRef}
        className="divide-y divide-slate-100 overflow-y-auto flex-1 scroll-smooth relative"
      >
        {/* Real-time timeline indicator track layer */}
        {indicatorTop !== null && isIndicatorVisibleInView() && (
          <div
            className="absolute left-0 right-0 z-30 pointer-events-none flex items-center"
            style={{ top: `${indicatorTop}px` }}
          >
            <div className="w-12 md:w-16 pl-1 md:pl-2 text-[10px] md:text-[11px] font-bold text-blue-600 bg-white/90 backdrop-blur-sm py-0.5 rounded-md shadow-sm text-center whitespace-nowrap">
              {format(currentTime, "HH:mm")}
            </div>

            <div className="flex-1 relative flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 absolute -left-1 shadow-md shadow-blue-500/50" />
              <div className="w-full h-[1.5px] bg-blue-500/80" />
            </div>
          </div>
        )}

        {timeSlots.map((time) => (
          <div
            key={time}
            className={`grid ${gridColsClass} h-24 md:h-28 relative w-full`}
            role="row"
          >
            <div className="text-[10px] md:text-xs text-slate-400 font-semibold border-r border-slate-100 text-left pl-3 md:pl-4 pt-2 md:pt-3 bg-slate-50/5 w-12 md:w-16 select-none">
              {time}
            </div>

            {visibleDays.map((day, dayIdx) => {
              const isMobileHidden =
                viewMode === "semana" && !isSameDay(day, selectedDayMobile);
              const dayAppointments = appointments.filter(
                (app) =>
                  app.startTime === time &&
                  isSameDay(new Date(app.date + "T00:00:00"), day),
              );
              const isTodayColumn = isToday(day);

              return (
                <div
                  key={dayIdx}
                  className={`border-r border-slate-100 p-1 md:p-2 relative transition-colors w-full min-h-[96px] md:min-h-[112px] ${
                    isMobileHidden ? "hidden md:block" : "block"
                  } ${isTodayColumn ? "bg-blue-50/10" : "bg-white"}`}
                >
                  {dayAppointments.map((app) => {
                    const isNext = app.id === nextAppointmentId;

                    return (
                      <button
                        key={app.id}
                        onClick={() => onSelectAppointment(app)}
                        className={`absolute inset-x-1 md:inset-x-2 top-1 md:top-2 bottom-1 md:bottom-2 backdrop-blur-sm p-2 md:p-3 rounded shadow-sm cursor-pointer hover:shadow transition-all text-left flex flex-col justify-between z-10 ${
                          isNext
                            ? "bg-blue-600 text-white border border-blue-700"
                            : "bg-blue-50/90 border border-blue-200/50 text-blue-800 hover:bg-blue-100/90"
                        }`}
                      >
                        <div>
                          <p
                            className={`font-bold text-[10px] md:text-xs tracking-tight line-clamp-1 ${isNext ? "text-white" : "text-blue-900"}`}
                          >
                            {app.patientName}
                          </p>
                          <p
                            className={`text-[8px] md:text-[10px] font-semibold mt-0.5 ${isNext ? "text-blue-100" : "text-blue-600/90"}`}
                          >
                            {app.startTime} -{" "}
                            {appointmentEndTime(
                              app.startTime,
                              app.durationMinutes,
                            )}
                          </p>
                        </div>
                        <p
                          className={`text-[8px] md:text-[10px] font-medium tracking-wide line-clamp-1 ${isNext ? "text-blue-200" : "text-blue-500"}`}
                        >
                          {app.type}
                        </p>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};