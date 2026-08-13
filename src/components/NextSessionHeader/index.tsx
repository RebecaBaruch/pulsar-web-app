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
  sessionTime: string;
  sessionDate: string;
};

export default function NextSessionHeader({
  profilePictureUrl,
  name,
  description,
  phoneNumber,
  daysCount,
  sessionTime,
  sessionDate,
}: NextSessionHeaderProps) {
  const firstName = name ? name.trim().split(" ")[0] : "";

  return (
    <section className="flex flex-col gap-6 w-full">
      <InfoHeader text={`Sua próxima sessão · em ${daysCount} dias`} />

      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 p-4 md:p-5 bg-blue rounded shadow-sm">
        
        {/* info container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-8 w-full md:w-auto">
          
          {/* specialist profile */}
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-white/20 flex-shrink-0 overflow-hidden flex items-center justify-center border border-white/20">
              {profilePictureUrl ? (
                <Image
                  src={profilePictureUrl}
                  alt={name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-sm font-bold text-white">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm md:text-base text-white">
                {name}
              </span>
              <span className="text-xs text-white/80 font-normal mt-0.5">
                {description}
              </span>
            </div>
          </div>

          {/* date and time */}
          <div className="flex items-center justify-around md:justify-center gap-3 bg-white/10 text-white rounded p-2.5 md:p-3 text-xs md:text-sm font-medium">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-white/80" />
              <span>{sessionDate}</span>
            </div>
            <span className="text-white/30 font-light">|</span>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-white/80" />
              <span>{sessionTime}</span>
            </div>
          </div>

        </div>

        {/* action button */}
        <div className="w-full md:w-auto mt-1 md:mt-0">
          <PrimaryButton
            color="white"
            onClick={() =>
              contactWhatsappUtil(
                phoneNumber,
                "Olá, podemos conversar sobre a próxima sessão?",
              )
            }
            icon={faWhatsapp}
            text={`Conversar com ${firstName}`}
          />
        </div>

      </div>
    </section>
  );
}