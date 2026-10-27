import { toast } from "sonner";
import { AppointmentData } from "../types";
import { format, parseISO } from "date-fns";
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";
import { cancelSpecialistSession } from "../../services/specialistApi";

interface UseCancelAppointmentProps {
  selectedAppointment: AppointmentData | null;
  setSelectedAppointment: (app: AppointmentData | null) => void;
  setIsCancelModalOpen: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

const formatDate = (data: string): string => {
  const parsedDate = parseISO(data);
  return format(parsedDate, "dd/MM/yy");
};

export function useCancelAppointment({
  selectedAppointment,
  setSelectedAppointment,
  setIsCancelModalOpen,
  onSuccess,
}: UseCancelAppointmentProps) {
  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;

    const appointmentId = selectedAppointment.id;
    const appointmentDate = formatDate(selectedAppointment.date);
    const appointmentTime = selectedAppointment.startTime;
    const patientName = selectedAppointment.patientName;

    try {
      await cancelSpecialistSession(appointmentId);

      const pulsarSupportPhoneNumber = "+55 13 99744-8326";
      const textMessage = `Olá, suporte Pulsar! O atendimento do(a) paciente *${patientName}* - agendado para o dia ${appointmentDate} às ${appointmentTime} - foi *cancelado*. Por favor, realizar o reembolso do valor correspondente.`;
      await contactWhatsappUtil(pulsarSupportPhoneNumber, textMessage);

      toast.success(`Atendimento de ${patientName} cancelado.`);
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível cancelar o atendimento.",
      );
    } finally {
      setIsCancelModalOpen(false);
      setSelectedAppointment(null);
    }
  };

  return { handleConfirmCancel };
}
