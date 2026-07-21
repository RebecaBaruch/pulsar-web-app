import React from "react";
import { isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa";
import { AppointmentData } from "../../types";

interface SessionCardsProps {
  appointments: AppointmentData[];
}

export const SessionCards: React.FC<SessionCardsProps> = ({ appointments }) => {
  // Memoized calculation of session counts for today, this week, and this month
  const stats = React.useMemo(() => {
    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    appointments.forEach((app) => {
      // Create a Date object from the appointment's date string for accurate comparisons
      const appDate = parseISO(`${app.date}T00:00:00`);

      if (isToday(appDate)) todayCount++;

      // weekStartsOn: 0 indicates that the week starts on Sunday. Adjust this value if your week starts on a different day.
      if (isThisWeek(appDate, { weekStartsOn: 0 })) weekCount++;

      if (isThisMonth(appDate)) monthCount++;
    });

    return { todayCount, weekCount, monthCount };
  }, [appointments]);

  return (
    <div
      className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      role="region"
      aria-label="Resumo de sessões"
    >
      {/* Card: Today */}
      <div
        className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm flex items-center gap-4 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
        role="article"
        aria-label={`Sessões de hoje: ${stats.todayCount}`}
      >
        <div
          className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0"
          aria-hidden="true"
        >
          <FaCalendarDay className="text-blue" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Hoje</p>
          <div className="flex items-baseline gap-1">
            <span
              className="text-xl font-extrabold text-slate-900"
              aria-label={`${stats.todayCount} sessões`}
            >
              {stats.todayCount}
            </span>
            <span className="text-xs font-medium text-slate-400">sessões</span>
          </div>
        </div>
      </div>

      {/* Card: Week */}
      <div
        className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm flex items-center gap-4 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2"
        role="article"
        aria-label={`Sessões desta semana: ${stats.weekCount}`}
      >
        <div
          className="w-12 h-12 rounded-xl bg-emerald-50 text-green-300 flex items-center justify-center text-lg flex-shrink-0"
          aria-hidden="true"
        >
          <FaCalendarWeek className="text-green-dark" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Semana</p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span
              className="text-xl font-extrabold text-slate-900"
              aria-label={`${stats.weekCount} sessões`}
            >
              {stats.weekCount}
            </span>
            <span className="text-xs font-medium text-slate-400">sessões</span>
          </div>
        </div>
      </div>

      {/* Card: Month */}
      <div
        className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm flex items-center gap-4 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2"
        role="article"
        aria-label={`Sessões deste mês: ${stats.monthCount}`}
      >
        <div
          className="w-12 h-12 rounded-xl bg-slate-100 text-gray-600 flex items-center justify-center text-lg flex-shrink-0"
          aria-hidden="true"
        >
          <FaCalendarAlt className="text-gray-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400">Mês</p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span
              className="text-xl font-extrabold text-slate-900"
              aria-label={`${stats.monthCount} sessões`}
            >
              {stats.monthCount}
            </span>
            <span className="text-xs font-medium text-slate-400">sessões</span>
          </div>
        </div>
      </div>
    </div>
  );
};
