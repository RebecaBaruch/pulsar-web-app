import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { differenceInHours, parseISO } from "date-fns";

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  appointmentDate?: string; // Ex: "2026-10-15"
  appointmentTime?: string; // Ex: "14:00"
  onConfirmCancel: () => void;
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  patientName,
  appointmentDate,
  appointmentTime = "00:00",
  onConfirmCancel,
}) => {
  if (!isOpen) return null;

  // calculate if the appointment is within 24 hours
  let isWithin24Hours = false;

  if (appointmentDate) {
    const appointmentDateTime = parseISO(
      `${appointmentDate}T${appointmentTime}:00`,
    );
    const hoursDifference = differenceInHours(appointmentDateTime, new Date());
    isWithin24Hours = hoursDifference < 24;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal container */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl p-8 mx-4 text-slate-800 animate-in zoom-in-95 duration-200">
        {/* Close button X */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>

        {/* Main title */}
        <h3 className="text-lg font-bold text-slate-900 text-center mb-3 pr-4">
          Tem certeza?
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 text-center mb-5 leading-relaxed">
          Você está prestes a cancelar a sessão de{" "}
          <strong className="text-slate-700 font-semibold">
            {patientName}
          </strong>
          . Tem certeza de que deseja prosseguir?
        </p>

        {/* Banner Informativo Dinâmico (Especialista) */}
        {isWithin24Hours ? (
          <div className="flex gap-3 bg-amber-50 border border-amber-200/80 rounded-lg p-3.5 mb-6 text-xs text-amber-800 leading-relaxed">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-amber-500 text-sm mt-0.5 flex-shrink-0"
            />
            <div>
              <span className="font-bold block mb-0.5">
                Sessão em menos de 24 horas
              </span>
              O valor será totalmente reembolsado ao paciente. Recomendamos
              avisá-lo sobre o imprevisto.
            </div>
          </div>
        ) : (
          <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-700 leading-relaxed">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-blue-500 text-sm mt-0.5 flex-shrink-0"
            />
            <div>
              <span className="font-bold block mb-0.5">
                Reembolso ao Paciente
              </span>
              O cancelamento irá disparar a solicitação de estorno automático do
              valor pago de volta para o paciente.
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <PrimaryButton
            text={"Sim, cancelar sessão"}
            onClick={onConfirmCancel}
          />
          <SecondaryButton text={"Não, manter agendamento"} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};
