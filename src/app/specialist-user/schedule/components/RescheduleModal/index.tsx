import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  currentDate?: Date;
  currentFormattedTime?: string;
  onConfirmReschedule: (data: { date: string; time: string }) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  patientName,
  currentDate = new Date(),
  currentFormattedTime = "15:10",
  onConfirmReschedule,
}) => {
  // Starts with the current date and time as default values for the inputs
  const [selectedDate, setSelectedDate] = useState(() =>
    format(currentDate, "yyyy-MM-dd"),
  );
  const [selectedTime, setSelectedTime] = useState(currentFormattedTime);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmReschedule({
      date: selectedDate,
      time: selectedTime,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal container */}
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl p-8 mx-4 text-slate-800 animate-in zoom-in-95 duration-200">
        {/* Close button X */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>

        {/* Main title */}
        <h3 className="text-lg font-bold text-slate-800 text-left mb-8 pr-6">
          Remarcar atendimento com {patientName}
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input: new date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              Nova data
            </label>
            <div className="relative flex items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
              />
              <span className="absolute right-4 text-slate-400 pointer-events-none">
                <FontAwesomeIcon icon={faCalendarDays} />
              </span>
            </div>
          </div>

          {/* Input: new time */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              Novo horário
            </label>
            <div className="relative flex items-center">
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
              />
              <span className="absolute right-4 text-slate-400 pointer-events-none">
                <FontAwesomeIcon icon={faClock} />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <PrimaryButton type="submit" text={"Remarcar atendimento"} />
            <SecondaryButton text={"Cancelar"} onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
