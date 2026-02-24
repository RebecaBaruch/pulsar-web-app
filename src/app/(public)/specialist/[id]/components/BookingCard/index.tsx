import React from "react";
import Calendar from "../Calendar";
import TimeSlotSelector from "../TimeSlotSelector";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { BookingCardProps } from "../../types";
import BookingContentSkeleton from "../BookingContentSkeleton";

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
  const [calendarReady, setCalendarReady] = React.useState(false);
  const [timeslotReady, setTimeslotReady] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setCalendarReady(true));

    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setTimeslotReady(true));

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <h3 className="font-semibold">Agende sua consulta</h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-4/7 w-full flex flex-col gap-4">
          {calendarReady ? (
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={(d) => setSelectedDate(d)}
              availableDates={availableDates}
              onMonthChange={onMonthChange}
            />
          ) : (
            <BookingContentSkeleton />
          )}
        </div>

        <div className="flex-3/7 w-full flex flex-col gap-4">
          <p className="text-xs text-gray-500">Horários disponíveis</p>
          {timeslotReady ? (
            <TimeSlotSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              timeSlots={timeSlots}
              loading={timeLoading}
            />
          ) : (
            <BookingContentSkeleton />
          )}
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
