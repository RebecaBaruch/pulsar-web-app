import React from "react";
import { AppointmentData } from "../../types";

interface EventCardProps {
  appointment: AppointmentData;
  endTime: string;
  isNext: boolean;
  compact?: boolean;
  onSelect: (appointment: AppointmentData) => void;
  style?: React.CSSProperties;
}

export const EventCard: React.FC<EventCardProps> = ({
  appointment,
  endTime,
  isNext,
  compact = false,
  onSelect,
  style,
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(appointment)}
      style={style}
      className={`absolute inset-x-1 lg:inset-x-1.5 text-left flex flex-col justify-start overflow-hidden z-10 rounded-xl bg-blue-50/80 border-l-4 shadow-sm hover:bg-blue-100/80 hover:shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isNext ? "border-blue-700 bg-blue-500" : "border-blue-600"
      } ${compact ? "px-2 py-1" : "px-2.5 py-1.5"}`}
    >
      <p
        className={`font-bold text-xs ${
          isNext ? "text-white" : "text-gray-800"
        } tracking-tight line-clamp-1`}
      >
        {appointment.patientName}
      </p>
      <p
        className={`text-xs ${
          isNext ? "text-white" : "text-gray-500"
        } mt-0.5 line-clamp-1`}
      >
        {appointment.startTime} – {endTime}
      </p>
      {!compact && (
        <p
          className={`text-[11px] ${
            isNext ? "text-white" : "text-gray-500"
          } mt-0.5 line-clamp-1`}
        >
          {appointment.type}
        </p>
      )}
    </button>
  );
};
