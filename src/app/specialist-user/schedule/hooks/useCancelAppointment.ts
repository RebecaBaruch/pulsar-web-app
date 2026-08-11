import { AppointmentData } from "../types";
import { format, parseISO } from "date-fns";
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";

interface UseCancelAppointmentProps {
  selectedAppointment: AppointmentData | null;
  setSelectedAppointment: (app: AppointmentData | null) => void;
  setIsCancelModalOpen: (isOpen: boolean) => void;
}

const formatDate = (data: string): string => {
    const parsedDate = parseISO(data);
    return format(parsedDate, "dd/MM/yy");
};

export function useCancelAppointment({
  selectedAppointment,
  setSelectedAppointment,
  setIsCancelModalOpen,
}: UseCancelAppointmentProps) {
  
  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;

    const appointmentId = selectedAppointment.id;
    const appointmentDate = formatDate(selectedAppointment.date);
    const appointmentTime = selectedAppointment.startTime;
    const patientName = selectedAppointment.patientName;

    console.log("=== SIMULAÇÃO DE CANCELAMENTO NO BACKEND ===");
    console.log("ID do Atendimento para Cancelar:", appointmentId);
    console.log("Paciente afetado:", patientName);
    console.log("Data do Atendimento:", appointmentDate);
    console.log("Horário do Atendimento:", appointmentTime);
    console.log("============================================");

    try {
      const pulsarSupportPhoneNumber = "+55 13 99744-8326";
      const textMessage = `Olá, suporte Pulsar! O atendimento do(a) paciente *${patientName}* - agendado para o dia ${appointmentDate} às ${appointmentTime} - foi *cancelado*. Por favor, realizar o reembolso do valor correspondente.`;

      console.log("Disparando solicitação de estorno via util de WhatsApp...");
      await contactWhatsappUtil(pulsarSupportPhoneNumber, textMessage);
    } catch (error) {
      console.error("Erro ao tentar enviar notificação de reembolso:", error);
    }

    setIsCancelModalOpen(false);
    setSelectedAppointment(null);

    alert(
      `Atendimento de ${patientName} cancelado e pedido de reembolso enviado à Pulsar!`,
    );
  };

  return { handleConfirmCancel };
}