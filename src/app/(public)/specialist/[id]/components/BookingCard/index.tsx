import React from "react";
import Calendar from "../Calendar";
import TimeSlotSelector from "../TimeSlotSelector";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { BookingCardProps } from "../../types";

export default function BookingCard({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onMonthChange,
  availableDates,
  timeSlots,
  timeLoading,
  isAuthenticated,
  onSchedule,
}: BookingCardProps) {
  return (
    <>
      <h3 className="font-semibold">Agende sua consulta</h3>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-3/7 w-full flex flex-col gap-4">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
            availableDates={availableDates}
            onMonthChange={onMonthChange}
          />
        </div>

        <div className="flex-2/7 w-full flex flex-col gap-4">
          <p className="text-xs text-gray-500">Horários disponíveis</p>
          <TimeSlotSelector
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            timeSlots={timeSlots}
            loading={timeLoading}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-light">
        <PrimaryButton
          text={isAuthenticated ? "Agendar" : "Fazer login"}
          onClick={onSchedule}
          isDisabled={!selectedDate || !selectedTime}
        />

        {!isAuthenticated && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Você precisa fazer login para agendar uma sessão
          </p>
        )}
      </div>
    </>
  );
}
