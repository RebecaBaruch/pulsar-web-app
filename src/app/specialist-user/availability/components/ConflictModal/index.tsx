"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";

export interface ConflictingAppointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
}

interface ConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAgenda: () => void;
  appointments: ConflictingAppointment[];
}

export const ConflictModal: React.FC<ConflictModalProps> = ({
  isOpen,
  onClose,
  onGoToAgenda,
  appointments,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
        {/* Header do Modal */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Agendamentos Encontrados
              </h3>
              <p className="text-xs text-gray-500">
                Não é possível bloquear este período no momento.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        {/* Lembrete de comunicação (UX Focus) */}

        <div className="flex items-start gap-3 bg-blue-100 p-2 md:p-3 rounded text-xs text-dark">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="text-blue text-sm mt-0.5"
          />
          <span>
            <strong>Lembrete importante:</strong> Avise os pacientes afetados
            antes de cancelar.
          </span>
        </div>

        {/* Lista de Agendamentos */}
        <div className="flex flex-col gap-2 max-h-52 pr-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Consultas no período ({appointments.length})
          </span>
          <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs sm:text-sm"
              >
                <span className="font-semibold text-gray-800">
                  {apt.patientName}
                </span>
                <span className="text-gray-500 font-medium bg-white px-2.5 py-1 rounded-md border border-gray-100">
                  {apt.date} às {apt.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 lg:gap-8 pt-5 border-t border-gray-100">
          <SecondaryButton text="Entendido, voltar" onClick={onClose} />

          <PrimaryButton
            text="Ir para a Agenda e cancelar"
            onClick={onGoToAgenda}
          />
        </div>
      </div>
    </div>
  );
};
