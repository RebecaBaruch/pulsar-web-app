"use client";

import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { BiInfoCircle } from 'react-icons/bi';

export default function NextSessionHeader() {
  const handleContactWhatsapp = () => {
    const phoneNumber = "5511999999999";
    const message =
      "Olá, gostaria de entrar em contato sobre minha próxima sessão.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <section className="w-full">
      <div className="text-xs md:text-sm text-blue font-semibold mb-6 flex items-top gap-4 bg-blue-100 p-4 rounded-lg">
        <BiInfoCircle className="text-lg" />
        <span>Sua próxima sessão · em 2 dias</span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center w-full gap-4 md:gap-8 p-4 md:p-8 bg-blue rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-fit gap-4">
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
            <div className="flex flex-row items-center justify-between md:gap-4 w-full md:h-full rounded p-2 md:px-6 bg-blue-dark text-white">
              <div className="flex items-center gap-2 w-fit">
                <FontAwesomeIcon icon={faCalendar} size="xs" />
                <span className="text-xs font-medium">22 de Julho</span>
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
          <PrimaryButton
            color="white"
            onClick={handleContactWhatsapp}
            text={`Conversar com ${`Alex`}`}
            icon={faWhatsapp}
          />
        </div>

        <div className="w-full md:hidden">
          <PrimaryButton
            color="white"
            icon={faWhatsapp}
            text={`Conversar com ${`Alex`}`}
          />
        </div>
      </div>
    </section>
  );
}
