"use client";

import React, { JSX } from "react";
import { toast } from "sonner";
import { ScheduleView } from "../view/index.view";
import { useCalendar } from "../hooks/useCalendar";
import { timeSlots } from "@/utils/time-slots";
import { AppointmentData } from "../types";
import { ScheduleSkeleton } from "../components/ScheduleSkeleton";
import { useCancelAppointment } from "../hooks/useCancelAppointment";
import { useRescheduleAppointment } from "../hooks/useRescheduleAppointment";
import { fetchSpecialistCalendar } from "../../services/specialistApi";

export default function HomeController(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);
  const [appointments, setAppointments] = React.useState<AppointmentData[]>([]);

  const [selectedAppointment, setSelectedAppointment] =
    React.useState<AppointmentData | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] =
    React.useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);

  const calendar = useCalendar({
    initialViewMode: "semana",
    weekStartsOn: 0,
  });

  const reloadCalendar = React.useCallback(async () => {
    try {
      const data = await fetchSpecialistCalendar({
        viewMode: calendar.viewMode,
        referenceDate: calendar.currentDate,
      });
      setAppointments(data);
    } catch {
      toast.error("Não foi possível carregar a agenda.");
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }, [calendar.viewMode, calendar.currentDate]);

  React.useEffect(() => {
    setIsLoading(true);
    reloadCalendar();
  }, [reloadCalendar]);

  const handleReschedule = (_id: string) => {
    setIsRescheduleModalOpen(true);
  };

  const handleCancelClick = (_id: string) => {
    setIsCancelModalOpen(true);
  };

  const { handleConfirmReschedule } = useRescheduleAppointment({
    selectedAppointment,
    setSelectedAppointment,
    setIsRescheduleModalOpen,
    onSuccess: reloadCalendar,
  });

  const { handleConfirmCancel } = useCancelAppointment({
    selectedAppointment,
    setSelectedAppointment,
    setIsCancelModalOpen,
    onSuccess: reloadCalendar,
  });

  if (isLoading) {
    return <ScheduleSkeleton />;
  }

  return (
    <ScheduleView
      visibleDays={calendar.visibleDays}
      timeSlots={timeSlots}
      appointments={appointments}
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
