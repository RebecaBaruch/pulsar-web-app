import React from "react";
import InputField from "@/components/InputField";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onSelectRange: (start: string, end: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onSelectRange,
}) => {
  // Pega a data de hoje no formato YYYY-MM-DD para o bloqueio de datas passadas
  const todayStr = new Date().toISOString().split("T")[0];

  const handleStartChange = (newStart: string) => {
    // Se a nova data de início for maior que a de término atual, reseta o término
    if (endDate && newStart > endDate) {
      onSelectRange(newStart, "");
    } else {
      onSelectRange(newStart, endDate);
    }
  };

  const handleEndChange = (newEnd: string) => {
    onSelectRange(startDate, newEnd);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Input Data Início */}
      <div className="flex-1">
        <InputField
          type="date"
          label=""
          placeholder="Data início"
          value={startDate}
          min={todayStr} // Impede seleção de datas passadas
          onChange={handleStartChange}
          skipTypeValidation
          className="w-full"
        />
      </div>

      <span className="text-gray-400 text-xs font-semibold flex-shrink-0 mt-1">
        →
      </span>

      {/* Input Data Término */}
      <div className="flex-1">
        <InputField
          type="date"
          label=""
          placeholder="Data término"
          value={endDate}
          min={startDate || todayStr} // Impede escolher uma data final menor que o início
          onChange={handleEndChange}
          skipTypeValidation
          className="w-full"
        />
      </div>
    </div>
  );
};