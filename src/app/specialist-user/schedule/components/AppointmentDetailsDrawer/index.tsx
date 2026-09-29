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
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";

interface AppointmentDetailsDrawerProps {
  appointment: AppointmentData | null;
  onClose: () => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}


export const AppointmentDetailsDrawer: React.FC<
  AppointmentDetailsDrawerProps
> = ({ appointment, onClose, onReschedule, onCancel }) => {
  // If there is no selected appointment, we keep the Drawer hidden or invisible
  const isOpen = !!appointment;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="presentation"
        aria-hidden={!isOpen}
      />

      {/* Lateral panel - Desktop (right side) / Mobile (bottom sheet) */}
      <div
        className={`fixed bottom-0 right-0 md:right-0 md:bottom-auto md:top-0 w-full md:w-[400px] max-h-[90vh] md:h-screen md:max-h-screen bg-white md:border-l border-t md:border-t-0 md:border-l border-slate-100 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-x-full"
        } rounded-t-3xl md:rounded-none`}
        role="dialog"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-description"
        aria-modal="true"
      >
        {appointment ? (
          <>
            <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between bg-slate-50/50 sticky top-0 z-10 rounded-t-3xl md:rounded-none">
              <div className="flex-1">
                <h3
                  id="drawer-title"
                  className="text-lg md:text-lg font-bold text-slate-900 tracking-tight"
                >
                  Detalhes do Agendamento
                </h3>
                <p
                  id="drawer-description"
                  className="text-xs text-slate-400 mt-0.5"
                >
                  Informações detalhadas do paciente
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-fit h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex-shrink-0 cursor-pointer"
                aria-label="Fechar painel de detalhes"
                title="Fechar (ESC)"
              >
                <FontAwesomeIcon icon={faXmark} className="w-2 h-2" />
              </button>
            </div>

            <div className="p-4 md:p-6 flex-1 space-y-6 overflow-y-auto">
              <div
                className="flex flex-col items-start gap-6 md:gap-8 bg-blue-50/30 p-3 md:p-4 rounded-2xl border border-blue-100/50"
                role="group"
                aria-labelledby="patient-info-heading"
              >
                <h4 id="patient-info-heading" className="sr-only">
                  Informações do Paciente
                </h4>
                <div className="flex flex-row gap-4 w-full">
                  <div
                    className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0"
                    aria-hidden="true"
                  >
                    {appointment.patientName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {appointment.patientName}
                    </h4>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">
                      {appointment.type}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <FaEnvelope
                      className="w-3 text-gray-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-gray-400 font-medium">
                        Email
                      </span>
                      <p className="text-gray-500 text-sm break-all">
                        {appointment.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone
                      className="w-3 text-gray-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-gray-400 font-medium">
                        Telefone
                      </span>
                      <p className="text-gray-500 text-sm">
                        {appointment.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <PrimaryButton
                  text={"Conversar por Whatsapp"}
                  onClick={() =>
                    contactWhatsappUtil(
                      appointment.phone,
                      "Olá, podemos conversar sobre a próxima sessão?",
                    )
                  }
                />
              </div>

              {/* Appointment Date and Time Information */}
              <div
                className="space-y-3 md:space-y-4 bg-slate-50/50 p-3 md:p-4 rounded-2xl border border-slate-100"
                role="group"
                aria-labelledby="appointment-info-heading"
              >
                <h4 id="appointment-info-heading" className="sr-only">
                  Informações do Agendamento
                </h4>
                <div className="flex items-start gap-3 text-slate-600">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="text-xs min-w-0">
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

                <div className="flex items-start gap-3 text-slate-600">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
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

            {/* Bottom Actions */}
            <div
              className="flex flex-col p-3 md:p-6 border-t border-slate-100 bg-slate-50/30 gap-3 sticky bottom-0"
              role="group"
              aria-label="Ações do agendamento"
            >
              <SecondaryButton
                text={"Remarcar"}
                onClick={() => onReschedule(appointment.id)}
              />
              <SecondaryButton
                text={"Cancelar"}
                color={"red"}
                onClick={() => onCancel(appointment.id)}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
