"use client";

import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";
import InfoHeader from "@/components/InfoHeader";

type NextSessionHeaderProps = {
  profilePictureUrl?: string;
  name: string;
  description: string;
  phoneNumber: string;
  daysCount: number;
};

export default function NextSessionHeader({ profilePictureUrl, name, description, phoneNumber, daysCount }: NextSessionHeaderProps) {
  
  return (
    <section className="w-full">
      <InfoHeader text={`Sua próxima sessão · em ${daysCount} dias`} />

      <div className="flex flex-col md:flex-row md:justify-between items-center w-full gap-4 md:gap-8 p-4 md:p-8 bg-blue rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-fit gap-4">
          <div className="flex items-center md:items-start lg:items-center gap-4 bg-[#4C63E9] w-full lg:w-fit rounded p-2 md:px-4">
            <div className="flex justify-center items-center w-8 h-8 flex-shrink-0 bg-white rounded-sm">
              {profilePictureUrl ? (
                <Image
                  src={profilePictureUrl}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="object-cover rounded-sm"
                />
              ) : (
                <span className="text-sm font-semibold text-blue-dark">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="text-sm text-white font-semibold">
                {name}
              </div>
              <div className="text-xs text-white">
                {description}
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
            onClick={() =>
              contactWhatsappUtil(
                phoneNumber,
                "Olá, podemos conversar sobre a próxima sessão?",
              )
            }
            text={`Conversar com ${name}`}
            icon={faWhatsapp}
          />
        </div>

        <div className="w-full md:hidden">
          <PrimaryButton
            color="white"
            icon={faWhatsapp}
            text={`Conversar com ${name}`}
          />
        </div>
      </div>
    </section>
  );
}
