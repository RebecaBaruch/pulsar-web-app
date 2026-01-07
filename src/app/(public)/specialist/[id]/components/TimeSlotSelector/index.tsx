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
        <p className="text-gray-500 text-center">
          Selecione uma data para ver os horários disponíveis
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-4">Horários disponíveis</h3>
      {loading ? (
        <p className="text-gray-500">Carregando horários...</p>
      ) : timeSlots.length === 0 ? (
        <p className="text-gray-500">Nenhum horário disponível nesta data.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => onSelectTime(t)}
              className={`
                px-4 py-3 rounded-lg text-sm font-medium transition-all
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
