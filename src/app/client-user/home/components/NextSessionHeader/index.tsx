"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function NextSessionHeader() {
  return (
    <section className="w-full">
      <div className="text-base lg:text-sm text-black font-bold mb-3 flex items-center gap-2">
        <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-blue" />
        <span>Sua próxima sessão · em 2 dias</span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center w-full gap-4 md:gap-8 p-3 bg-blue rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-fit gap-4 md:gap-2">
          <div className="flex items-center md:items-start lg:items-center gap-4 bg-[#4C63E9] w-full lg:w-fit rounded p-2 md:px-4">
            <div className="flex justify-center items-center w-8 h-8 flex-shrink-0 bg-white rounded-sm">
              <img
                src="/images/doctor-avatar.png"
                alt="avatar"
                className="w-8 h-8 object-cover rounded-sm"
              />
            </div>
            <div>
              <div className="text-sm text-white font-semibold">
                Alex Machado
              </div>
              <div className="text-xs text-white">
                Psicólogo Clínico · CRP: XXX-XXX
              </div>
            </div>
          </div>

          <div className="flex-1 md:flex-none text-white md:self-stretch">
            <div className="flex flex-row items-center justify-between md:gap-4 w-full md:h-full rounded p-2 md:px-4 bg-blue-dark text-white">
              <div className="flex items-center gap-2 w-fit">
                <FontAwesomeIcon icon={faCalendar} size="xs" />
                <span className="text-xs font-medium">
                  22 de Julho
                </span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-2 w-fit">
                <FontAwesomeIcon icon={faClock} size="xs" />
                <span className="text-xs font-medium">10:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-row items-start lg:items-center gap-1 text-white">
          <FontAwesomeIcon icon={faWhatsapp} size="sm" />
          <a
            href="/"
            className="text-xs font-medium underline hover:text-[#ffffffe2]"
          >
            Fazer contato por Whatsapp
          </a>
        </div>

        <div className="w-full md:hidden">
          <PrimaryButton
            color="white"
            icon={faWhatsapp}
            text={`Fazer contato por Whatsapp`}
          />
        </div>
      </div>
    </section>
  );
}
