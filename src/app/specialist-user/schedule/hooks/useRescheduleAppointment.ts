import { toast } from "sonner";
import { AppointmentData } from "../types";
import { rescheduleSpecialistSession } from "../../services/specialistApi";

interface UseRescheduleAppointmentProps {
  selectedAppointment: AppointmentData | null;
  setSelectedAppointment: (app: AppointmentData | null) => void;
  setIsRescheduleModalOpen: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

export function useRescheduleAppointment({
  selectedAppointment,
  setSelectedAppointment,
  setIsRescheduleModalOpen,
  onSuccess,
}: UseRescheduleAppointmentProps) {
  const handleConfirmReschedule = async (formData: {
    date: string;
    time: string;
  }) => {
    if (!selectedAppointment) return;

    try {
      await rescheduleSpecialistSession({
        sessionId: selectedAppointment.id,
        date: formData.date,
        time: formData.time,
      });
      toast.success("Atendimento reagendado com sucesso.");
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível reagendar o atendimento.",
      );
    } finally {
      setIsRescheduleModalOpen(false);
      setSelectedAppointment(null);
    }
  };

  return { handleConfirmReschedule };
}
