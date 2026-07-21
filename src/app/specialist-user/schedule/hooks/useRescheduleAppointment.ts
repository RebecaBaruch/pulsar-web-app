import { AppointmentData } from "../types";

interface UseRescheduleAppointmentProps {
  selectedAppointment: AppointmentData | null;
  setSelectedAppointment: (app: AppointmentData | null) => void;
  setIsRescheduleModalOpen: (isOpen: boolean) => void;
}

export function useRescheduleAppointment({
  selectedAppointment,
  setSelectedAppointment,
  setIsRescheduleModalOpen,
}: UseRescheduleAppointmentProps) {
  
  const handleConfirmReschedule = (formData: { date: string; time: string }) => {
    if (!selectedAppointment) return;

    console.log("=== SIMULAÇÃO DE SALVAMENTO NO BACKEND ===");
    console.log("ID do Atendimento/Paciente:", selectedAppointment.id);
    console.log("Nome do Paciente:", selectedAppointment.patientName);
    console.log("Nova Data enviada:", formData.date);
    console.log("Novo Horário enviado:", formData.time);
    console.log("==========================================");

    setIsRescheduleModalOpen(false);
    setSelectedAppointment(null);
  };

  return { handleConfirmReschedule };
}