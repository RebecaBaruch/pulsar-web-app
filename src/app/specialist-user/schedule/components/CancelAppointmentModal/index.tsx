import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  onConfirmCancel: () => void;
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  patientName,
  onConfirmCancel,
}) => {
  if (!isOpen) return null;

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

        {/* Description of Cancellation */}
        <p className="text-sm text-slate-500 text-center mb-5 leading-relaxed">
          Você está prestes a cancelar o atendimento de{" "}
          <strong className="text-slate-700 font-semibold">
            {patientName}
          </strong>
          Tem certeza de que deseja fazer isso?
        </p>

        {/* Improvement Suggestion: Informational Box for Expectation Alignment */}
        <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-700 leading-relaxed">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-blue-500 text-sm mt-0.5 flex-shrink-0"
          />
          <div>
            <span className="font-bold block mb-0.5">
              Fluxo de Reembolso Pulsar
            </span>
            Ao confirmar, uma solicitação de estorno automático será estruturada
            para a central Pulsar realizar a devolução do valor ao paciente.
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PrimaryButton text={"Sim"} onClick={onConfirmCancel} />
          <SecondaryButton text={"Não"} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};
