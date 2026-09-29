import React, { useEffect, useRef, useState } from "react";
import { format, isSameDay, isToday } from "date-fns";
import { AppointmentData } from "../../types";
import { EventCard } from "../EventCard";
import {
  ROW_HEIGHT_DESKTOP,
  ROW_HEIGHT_MOBILE,
  appointmentEndTime,
  getCurrentTimeOffset,
  isAllDayAppointment,
} from "../CalendarGrid/helpers";

interface TimeGridProps {
  visibleDays: Date[];
  selectedDayMobile: Date;
  timeSlots: string[];
  appointments: AppointmentData[];
  viewMode: "semana" | "dia";
  onSelectAppointment: (appointment: AppointmentData) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({
  visibleDays,
  selectedDayMobile,
  timeSlots,
  appointments,
  viewMode,
  onSelectAppointment,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const gridColsClass =
    viewMode === "semana"
      ? "grid-cols-[48px_1fr] lg:grid-cols-[64px_repeat(7,1fr)]"
      : "grid-cols-[48px_1fr] lg:grid-cols-[64px_1fr]";

  const firstSlotHour =
    timeSlots.length > 0 ? parseInt(timeSlots[0].split(":")[0], 10) : 0;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const nextAppointmentId = (() => {
    const now = new Date();
    const upcoming = appointments
      .filter((app) => !isAllDayAppointment(app))
      .map((app) => ({
        ...app,
        fullDateTime: new Date(`${app.date}T${app.startTime}:00`),
      }))
      .filter((app) => app.fullDateTime >= now)
      .sort((a, b) => a.fullDateTime.getTime() - b.fullDateTime.getTime());

    return upcoming[0]?.id ?? null;
  })();

  const isDesktopWeek = viewMode === "semana";
  const isTodayVisibleDesktop = visibleDays.some((day) => isToday(day));
  const isTodayVisibleMobile = isToday(selectedDayMobile);

  useEffect(() => {
    if (!containerRef.current) return;

    const isLg = window.matchMedia("(min-width: 1024px)").matches;
    const rowHeight = isLg ? ROW_HEIGHT_DESKTOP : ROW_HEIGHT_MOBILE;
    const indicatorTop = getCurrentTimeOffset(currentTime, timeSlots, rowHeight);
    const todayVisible = isLg ? isTodayVisibleDesktop : isTodayVisibleMobile;

    if (indicatorTop !== null && todayVisible) {
      containerRef.current.scrollTop = Math.max(indicatorTop - 140, 0);
      return;
    }

    const commercialIndex = timeSlots.indexOf("09:00");
    if (commercialIndex !== -1) {
      containerRef.current.scrollTop = commercialIndex * rowHeight;
    }
  }, [
    currentTime,
    timeSlots,
    selectedDayMobile,
    viewMode,
    isTodayVisibleDesktop,
    isTodayVisibleMobile,
  ]);

  const currentOffsetHours = (() => {
    if (timeSlots.length === 0) return null;
    const firstHour = parseInt(timeSlots[0].split(":")[0], 10);
    const lastHour = parseInt(timeSlots[timeSlots.length - 1].split(":")[0], 10);
    const hour = currentTime.getHours();
    if (hour < firstHour || hour > lastHour) return null;
    return hour - firstHour + currentTime.getMinutes() / 60;
  })();

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto flex-1 scroll-smooth relative bg-white [--slot-h:80px] lg:[--slot-h:112px] px-4"
    >
      <div
        className={`grid ${gridColsClass} border-b border-slate-100 min-h-9`}
        role="row"
        aria-label="Eventos de dia inteiro"
      >
        <div className="text-[10px] lg:text-xs text-slate-400 font-medium pl-2 lg:pl-4 pt-2 mb-4 select-none">
          Dia inteiro
        </div>
        {visibleDays.map((day) => {
          const isMobileHidden =
            isDesktopWeek && !isSameDay(day, selectedDayMobile);
          const dayAllDay = appointments.filter(
            (app) =>
              isAllDayAppointment(app) &&
              isSameDay(new Date(`${app.date}T00:00:00`), day),
          );

          return (
            <div
              key={`allday-${day.toISOString()}`}
              className={`border-l border-slate-50 px-1 py-1 min-h-9 ${
                isMobileHidden ? "hidden lg:block" : "block"
              }`}
            >
              {dayAllDay.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => onSelectAppointment(app)}
                  className="w-full text-left rounded-lg bg-blue-50/80 border-l-4 border-blue-600 px-2 py-1"
                >
                  <p className="font-bold text-xs text-slate-800 line-clamp-1">
                    {app.patientName}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-1">{app.type}</p>
                </button>
              ))}
            </div>
          );
        })}
      </div>

      <div
        className="relative"
        style={{ height: `calc(${timeSlots.length} * var(--slot-h))` }}
      >
        {timeSlots.map((time, index) => (
          <div
            key={time}
            className={`absolute left-0 right-0 grid ${gridColsClass}`}
            style={{
              top: `calc(${index} * var(--slot-h))`,
              height: "var(--slot-h)",
            }}
            role="row"
          >
            <div className="relative">
              <span className="absolute -top-2 left-2 lg:left-3 text-xs text-slate-400 select-none">
                {time}
              </span>
            </div>

            {visibleDays.map((day) => {
              const isMobileHidden =
                isDesktopWeek && !isSameDay(day, selectedDayMobile);

              return (
                <div
                  key={`${time}-${day.toISOString()}`}
                  className={`relative border-l border-slate-50 ${
                    isMobileHidden ? "hidden lg:block" : "block"
                  } ${isToday(day) ? "bg-blue-50/20" : ""}`}
                >
                  <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-100" />
                  <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-slate-100" />
                </div>
              );
            })}
          </div>
        ))}

        <div
          className={`absolute inset-0 grid ${gridColsClass} pointer-events-none`}
        >
          <div />
          {visibleDays.map((day) => {
            const isMobileHidden =
              isDesktopWeek && !isSameDay(day, selectedDayMobile);
            const dayAppointments = appointments.filter(
              (app) =>
                !isAllDayAppointment(app) &&
                isSameDay(new Date(`${app.date}T00:00:00`), day),
            );

            return (
              <div
                key={`events-${day.toISOString()}`}
                className={`relative ${isMobileHidden ? "hidden lg:block" : "block"} pointer-events-auto`}
              >
                {dayAppointments.map((app) => {
                  const hoursFromStart =
                    parseInt(app.startTime.split(":")[0], 10) -
                    firstSlotHour +
                    parseInt(app.startTime.split(":")[1], 10) / 60;
                  const durationHours = app.durationMinutes / 60;

                  return (
                    <EventCard
                      key={app.id}
                      appointment={app}
                      endTime={appointmentEndTime(
                        app.startTime,
                        app.durationMinutes,
                      )}
                      isNext={app.id === nextAppointmentId}
                      compact={app.durationMinutes < 40}
                      onSelect={onSelectAppointment}
                      style={{
                        top: `calc(${hoursFromStart} * var(--slot-h))`,
                        height: `max(40px, calc(${durationHours} * var(--slot-h) - 6px))`,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {currentOffsetHours !== null && (
          <>
            <div
              className={`absolute left-0 right-0 z-30 pointer-events-none items-center lg:hidden ${
                isTodayVisibleMobile ? "flex" : "hidden"
              }`}
              style={{ top: `calc(${currentOffsetHours} * var(--slot-h))` }}
              aria-hidden="true"
            >
              <CurrentTimeBadge time={currentTime} />
            </div>
            <div
              className={`absolute left-0 right-0 z-30 pointer-events-none hidden ${
                isTodayVisibleDesktop ? "lg:flex" : "lg:hidden"
              } items-center`}
              style={{ top: `calc(${currentOffsetHours} * var(--slot-h))` }}
              aria-hidden="true"
            >
              <CurrentTimeBadge time={currentTime} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function CurrentTimeBadge({ time }: { time: Date }) {
  return (
    <>
      <div className="w-12 lg:w-16 flex justify-center">
        <span className="text-[10px] lg:text-[11px] font-bold text-white bg-blue px-1.5 py-0.5 rounded-full shadow-sm">
          {format(time, "HH:mm")}
        </span>
      </div>
      <div className="flex-1 relative flex items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-blue absolute -left-1 shadow-md shadow-blue/40" />
        <div className="w-full h-[2px] bg-blue" />
      </div>
    </>
  );
}
