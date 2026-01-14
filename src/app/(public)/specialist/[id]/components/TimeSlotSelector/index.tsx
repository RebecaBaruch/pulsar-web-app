"use client";
import React from "react";

interface TimeSlotSelectorProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  timeSlots?: string[]; // from backend
  loading?: boolean;
}

export default function TimeSlotSelector({
  selectedDate,
  selectedTime,
  onSelectTime,
  timeSlots = [],
  loading = false,
}: TimeSlotSelectorProps) {
  if (!selectedDate) {
    return (
      <div className="bg-white rounded-lg p-4 md:p-6">
        <p className="text-xs text-gray-500 text-center">
          Selecione uma data para ver os horários disponíveis
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      {loading ? (
        <p className="text-gray-500">Carregando horários...</p>
      ) : timeSlots.length === 0 ? (
        <p className="text-gray-500">Nenhum horário disponível nesta data.</p>
      ) : (
        <div className="w-full grid grid-cols-4 md:grid-cols-2 gap-3">
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => onSelectTime(t)}
              className={`flex items-center justify-center
                px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer
                ${selectedTime !== t ? "bg-gray-100 hover:bg-blue-100 text-gray-700" : ""}
                ${selectedTime === t ? "bg-blue-600 text-white" : ""}
              `}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
