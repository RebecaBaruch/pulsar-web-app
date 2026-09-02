import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPlus,
  faTrashCan,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { DayAvailability } from "../../types";

interface WeeklyAvailabilityCardProps {
  days: DayAvailability[];
  onToggleDay: (index: number) => void;
  onToggleAccordion: (index: number) => void;
  onAddRange: (index: number) => void;
  onRemoveRange: (dayIndex: number, rangeId: string) => void;
  onTimeChange: (
    dayIndex: number,
    rangeId: string,
    field: "start" | "end",
    value: string,
  ) => void;
}

export const WeeklyAvailabilityCard: React.FC<WeeklyAvailabilityCardProps> = ({
  days,
  onToggleDay,
  onToggleAccordion,
  onAddRange,
  onRemoveRange,
  onTimeChange,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Disponibilidade semanal
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Configure quando seus clientes poderão agendar as sessões.
        </p>
      </div>

      {/* week days list */}
      <div className="flex flex-col gap-3 md:gap-4">
        {days.map((day, dayIndex) => (
          <div
            key={day.dayName}
            className="rounded-md border border-gray-200 bg-white overflow-hidden"
          >
            {/* Day Header */}
            <div className="flex items-center justify-between p-3 bg-white">
              <div className="flex items-center gap-3 md:gap-4">
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={day.enabled}
                    onChange={() => onToggleDay(dayIndex)}
                    className="sr-only peer"
                  />
                  <div className="w-7 h-4 md:w-9 md:h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 md:after:h-4 md:after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>

                <span className="font-semibold text-gray-800 text-sm">
                  {day.dayName}
                </span>

                {/* "Indisponível" badge */}
                {!day.enabled && (
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-500 text-[11px] md:text-xs font-semibold">
                    <FontAwesomeIcon
                      icon={faMoon}
                      className="text-gray-400 text-xs"
                    />
                    Indisponível
                  </div>
                )}
              </div>

              {/* dropdown button (if active) */}
              {day.enabled && (
                <button
                  type="button"
                  onClick={() => onToggleAccordion(dayIndex)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={day.isOpen ? faChevronUp : faChevronDown}
                  />
                </button>
              )}
            </div>

            {/* time sub panel */}
            {day.enabled && day.isOpen && (
              <div className="px-4 pb-5 pt-1 md:px-5 md:pb-6 md:pt-2 bg-white border-t border-gray-50 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  {day.ranges.map((range) => (
                    <div key={range.id} className="flex flex-col gap-1.5">
                      {/* grid layout side by side inputs */}
                      <div className="flex items-center gap-2 md:gap-3">
                        {/* starter input */}
                        <div className="flex-1 flex items-center bg-gray-50 border border-gray-100 rounded-md px-3 py-2 md:px-4 md:py-3">
                          <span className="text-gray-400 text-xs w-10 md:w-12">
                            Início
                          </span>
                          <input
                            type="text"
                            value={range.start}
                            onChange={(e) =>
                              onTimeChange(
                                dayIndex,
                                range.id,
                                "start",
                                e.target.value,
                              )
                            }
                            className="w-full text-right bg-transparent text-gray-700 font-semibold focus:outline-none text-xs"
                          />
                        </div>

                        {/* arrow */}
                        <span className="text-gray-400 text-xs md:text-sm font-semibold">
                          →
                        </span>

                        {/* ending input */}
                        <div className="flex-1 flex items-center bg-gray-50 border border-gray-100 rounded-md px-3 py-2 md:px-4 md:py-3">
                          <span className="text-gray-400 text-xs w-10 md:w-12">
                            Fim
                          </span>
                          <input
                            type="text"
                            value={range.end}
                            onChange={(e) =>
                              onTimeChange(
                                dayIndex,
                                range.id,
                                "end",
                                e.target.value,
                              )
                            }
                            className="w-full text-right bg-transparent text-gray-700 font-semibold focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      {/* deletion button */}
                      {day.ranges.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => onRemoveRange(dayIndex, range.id)}
                            className="flex items-center gap-1 text-rose-500 hover:text-rose-600 text-[10px] md:text-xs font-semibold cursor-pointer py-1"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                            Excluir horário
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* add new time button */}
                <div className="pt-2 border-t border-dashed border-gray-100">
                  <button
                    type="button"
                    onClick={() => onAddRange(dayIndex)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-xs font-semibold cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Adicionar horário
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
