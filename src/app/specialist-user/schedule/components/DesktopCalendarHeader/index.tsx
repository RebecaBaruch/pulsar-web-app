import React from "react";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DesktopCalendarHeaderProps {
  visibleDays: Date[];
  gridColsClass: string;
}

export const DesktopCalendarHeader: React.FC<DesktopCalendarHeaderProps> = ({
  visibleDays,
  gridColsClass,
}) => {
  return (
    <div
      className={`hidden lg:grid ${gridColsClass} border-b border-slate-100 bg-white text-center py-3 px-0 text-xs font-medium text-slate-400 items-center sticky top-0 z-20`}
      role="row"
    >
      <div className="text-left pl-4 font-semibold text-slate-400 w-16 text-[11px] uppercase tracking-wide">
        Horário
      </div>

      {visibleDays.map((day) => {
        const isCurrentDay = isToday(day);

        return (
          <div
            key={day.toISOString()}
            className="flex justify-center items-center w-full"
          >
            {isCurrentDay ? (
              <div className="flex flex-col items-center min-w-[64px]">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-blue">
                  {format(day, "EEEE", { locale: ptBR }).split("-")[0]}
                </span>
                <span className="mt-1 w-8 h-8 flex items-center justify-center rounded-full bg-blue text-white text-sm font-bold">
                  {format(day, "d")}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-[11px] capitalize text-slate-400 font-medium tracking-wide">
                  {format(day, "EEEE", { locale: ptBR }).split("-")[0]}
                </span>
                <span className="text-base font-semibold text-slate-800 mt-1">
                  {format(day, "d")}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
