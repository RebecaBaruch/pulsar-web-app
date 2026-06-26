import React from "react";
import { AppointmentData } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";

interface AppointmentDetailsDrawerProps {
  appointment: AppointmentData | null;
  onClose: () => void;
  onRemarcar: (id: string) => void;
  onCancelar: (id: string) => void;
}

export const AppointmentDetailsDrawer: React.FC<
  AppointmentDetailsDrawerProps
> = ({ appointment, onClose, onRemarcar, onCancelar }) => {
  // Se não houver agendamento selecionado, mantemos o Drawer oculto ou invisível
  const isOpen = !!appointment;
  const handleContactWhatsapp = (phoneNumber: string) => {
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const message =
      "Olá, podemos conversar sobre a próxima sessão?";
    const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Backdrop (Fundo escurecido sutil para dar foco ao painel) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Painel Lateral Lateral Direito */}
      <div
        className={`fixed right-0 top-0 h-screen w-[400px] bg-white border-l border-slate-100 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {appointment ? (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Detalhes do Agendamento
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Informações detalhadas do paciente
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-fit h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              >
                <FontAwesomeIcon icon={faXmark} className="w-2 h-2" />
              </button>
            </div>

            <div className="p-6 flex-1 space-y-6 overflow-y-auto">
              <div className="flex flex-col items-start gap-8 bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50">
                <div className="flex flex-row gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {appointment.patientName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {appointment.patientName}
                    </h4>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">
                      {appointment.type}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="w-3 text-gray-500" />
                    <p className="text-gray-500 capitalize text-sm">
                      {appointment.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="w-3 text-gray-500" />
                    <p className="text-gray-500 capitalize text-sm">
                      {appointment.phone}
                    </p>
                  </div>
                </div>
                <PrimaryButton text={"Conversar por Whatsapp "} onClick={() => handleContactWhatsapp(appointment.phone)} />
              </div>

              {/* Informações de Data e Horário */}
              <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 text-slate-600">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="w-4 h-4 text-slate-400"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-400">Data</p>
                    <p className="font-bold text-slate-800 capitalize mt-0.5">
                      {format(
                        parseISO(`${appointment.date}T00:00:00`),
                        "eeee, dd 'de' MMMM",
                        { locale: ptBR },
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="w-4 h-4 text-slate-400"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-400">
                      Horário e Duração
                    </p>
                    <p className="font-bold text-slate-800 mt-0.5">
                      {appointment.startTime}{" "}
                      <span className="text-slate-400 font-medium font-sans">
                        ({appointment.durationMinutes} min)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Inferiores */}
            <div className="flex flex-col p-6 border-t border-slate-100 bg-slate-50/30 gap-3">
              <SecondaryButton
                text={"Remarcar"}
                onClick={() => onRemarcar(appointment.id)}
              />
              <SecondaryButton
                text={"Cancelar"}
                color={"red"}
                onClick={() => onCancelar(appointment.id)}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
