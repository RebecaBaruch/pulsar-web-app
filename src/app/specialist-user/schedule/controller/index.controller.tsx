"use client";

import React, { JSX } from "react";
import { ScheduleView } from "../view/index.view";
import { useCalendar } from "../hooks/useCalendar";
import { timeSlots } from "@/utils/time-slots";
import { AppointmentData } from "../types";
import { mockAppointments as MOCK_APPOINTMENTS } from "../mock/mockAppointments";
import { ScheduleSkeleton } from "../components/ScheduleSkeleton";
import { useCancelAppointment } from "../hooks/useCancelAppointment";
import { useRescheduleAppointment } from "../hooks/useRescheduleAppointment";

export default function HomeController(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);

  const [selectedAppointment, setSelectedAppointment] =
    React.useState<AppointmentData | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] =
    React.useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const calendar = useCalendar({
    initialViewMode: "semana",
    weekStartsOn: 0,
  });

  const handleReschedule = (id: string) => {
    console.log("Reschedule ID capturado do Drawer:", id);
    setIsRescheduleModalOpen(true);
  };

  const handleCancelClick = (id: string) => {
    console.log("Cancelar ID:", id);
    setIsCancelModalOpen(true);
  };

  const { handleConfirmReschedule } = useRescheduleAppointment({
    selectedAppointment,
    setSelectedAppointment,
    setIsRescheduleModalOpen,
  });

  const { handleConfirmCancel } = useCancelAppointment({
    selectedAppointment,
    setSelectedAppointment,
    setIsCancelModalOpen,
  });

  if (isLoading) {
    return <ScheduleSkeleton />;
  }

  return (
    <ScheduleView
      visibleDays={calendar.visibleDays}
      timeSlots={timeSlots}
      appointments={MOCK_APPOINTMENTS}
      viewMode={calendar.viewMode}
      selectedAppointment={selectedAppointment}
      onViewModeChange={calendar.setViewMode}
      onSelectAppointment={setSelectedAppointment}
      onNext={calendar.handleNext}
      onPrev={calendar.handlePrev}
      onToday={calendar.handleToday}
      onNavigateToDate={calendar.handleNavigateToDate}
      onReschedule={handleReschedule}
      onCancel={handleCancelClick}
      isRescheduleModalOpen={isRescheduleModalOpen}
      onCloseRescheduleModal={() => setIsRescheduleModalOpen(false)}
      onConfirmReschedule={handleConfirmReschedule}
      isCancelModalOpen={isCancelModalOpen}
      onCloseCancelModal={() => setIsCancelModalOpen(false)}
      onConfirmCancel={handleConfirmCancel}
    />
  );
}
