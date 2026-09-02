import React from "react";
import { AppointmentData, CalendarViewMode } from "../types";

import { CalendarGrid } from "../components/CalendarGrid";
import { AppointmentDetailsDrawer } from "../components/AppointmentDetailsDrawer";
import { SessionCards } from "../components/SessionCards";
import { CalendarControls } from "../components/CalendarControls";
import { RescheduleModal } from "../components/RescheduleModal";
import { CancelAppointmentModal } from "../components/CancelAppointmentModal";

interface ScheduleViewProps {
  visibleDays: Date[];
  timeSlots: string[];
  appointments: AppointmentData[];
  viewMode: CalendarViewMode;
  selectedAppointment: AppointmentData | null;
  onViewModeChange: (mode: CalendarViewMode) => void;
  onSelectAppointment: (app: AppointmentData | null) => void;
  onNext: () => void;
  onPrev: () => void;
  onToday: () => void;
  onNavigateToDate: (date: Date) => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
  isRescheduleModalOpen: boolean;
  onCloseRescheduleModal: () => void;
  onConfirmReschedule: (data: { date: string; time: string }) => void;
  isCancelModalOpen: boolean;
  onCloseCancelModal: () => void;
  onConfirmCancel: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  visibleDays,
  timeSlots,
  appointments,
  viewMode,
  selectedAppointment,
  onViewModeChange,
  onSelectAppointment,
  onNext,
  onPrev,
  onToday,
  onNavigateToDate,
  onReschedule,
  onCancel,
  isRescheduleModalOpen,
  onCloseRescheduleModal,
  onConfirmReschedule,
  isCancelModalOpen,
  onCloseCancelModal,
  onConfirmCancel,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 md:gap-8">
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 md:gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              Agenda
            </h1>
            <p className="text-xs md:text-sm text-gray">
              Visualize e gerencie seus atendimentos.
            </p>
          </div>
        </div>

        {/* SessionCards - Hidden on mobile */}
        <SessionCards appointments={appointments} />

        <div className="w-full">
          {/* Navigation Controls Wrapper */}
          <div className="hidden md:flex flex-row items-center justify-between gap-4 mb-6 w-full">
            <CalendarControls
              visibleDays={visibleDays}
              viewMode={viewMode}
              onToday={onToday}
              onPrev={onPrev}
              onNext={onNext}
              onNavigateToDate={onNavigateToDate}
            />

            {/* Tab Switchers (Semana / Dia) */}
            <div
              className="bg-gray-200/60 p-1 rounded-xl flex gap-1 text-xs font-semibold shadow-inner w-full md:w-auto"
              role="tablist"
              aria-label="Modo de visualização"
            >
              <button
                onClick={() => onViewModeChange("semana")}
                className={`px-3 py-2 rounded-lg cursor-pointer transition-all flex-1 md:flex-initial ${viewMode === "semana" ? "bg-white text-blue-600 shadow-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" : "text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"}`}
                role="tab"
                aria-selected={viewMode === "semana"}
                aria-controls="calendar-semana"
                title="Visualizar semana"
              >
                Semana
              </button>
              <button
                onClick={() => onViewModeChange("dia")}
                className={`px-3 py-2 rounded-lg transition-all flex-1 md:flex-initial cursor-pointer ${viewMode === "dia" ? "bg-white text-blue-600 shadow-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" : "text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"}`}
                role="tab"
                aria-selected={viewMode === "dia"}
                aria-controls="calendar-dia"
                title="Visualizar dia"
              >
                Dia
              </button>
            </div>
          </div>

          {/* Calendar component */}
          <div id={`calendar-${viewMode}`}>
            <CalendarGrid
              visibleDays={visibleDays}
              timeSlots={timeSlots}
              appointments={appointments}
              viewMode={viewMode}
              onSelectAppointment={onSelectAppointment}
            />
          </div>
        </div>
      </div>

      <AppointmentDetailsDrawer
        appointment={selectedAppointment}
        onClose={() => onSelectAppointment(null)}
        onReschedule={onReschedule}
        onCancel={onCancel}
      />

      {selectedAppointment && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={onCloseRescheduleModal}
          patientName={selectedAppointment.patientName}
          currentFormattedTime={selectedAppointment.startTime}
          onConfirmReschedule={onConfirmReschedule}
        />
      )}

      {selectedAppointment && (
        <CancelAppointmentModal
          isOpen={isCancelModalOpen}
          onClose={onCloseCancelModal}
          patientName={selectedAppointment.patientName}
          appointmentDate={selectedAppointment.date}
          appointmentTime={selectedAppointment.startTime}
          onConfirmCancel={onConfirmCancel}
        />
      )}
    </div>
  );
};
