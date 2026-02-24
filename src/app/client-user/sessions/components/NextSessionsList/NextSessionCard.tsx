import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faClock, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openWhatsAppChat } from "../../utils/openWppChat";

export type NextSessionCardProps = {
  specialistId?: string;
  profilePic: string;
  specialistName: string;
  specialistType: string;
  credentialCode: string;
  specialistWpp: string;
  sessionDate: string;
  sessionTime: string;
  isPriority?: boolean;
};

export default function NextSessionCard({
  profilePic,
  specialistName,
  specialistType,
  credentialCode,
  specialistWpp,
  sessionDate,
  sessionTime,
  isPriority,
}: NextSessionCardProps) {
  const handleChatClick = () => {
    openWhatsAppChat(specialistWpp, specialistName, sessionDate, sessionTime);
  };
  return (
    <div
      className={`flex flex-col md:flex-row items-end justify-between gap-4 md:gap-6 transition-colors cursor-pointer  hover:bg-gray-100 ${
        isPriority
          ? "p-4 py-6 bg-[#ffffff] border-l-8 border-blue mb-8 shadow-gray-200 shadow-md rounded-lg"
          : "p-4 py-8  border-b border-gray-200"
      }`}
    >
      <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4">
        {isPriority && <FontAwesomeIcon icon={faFlag} color="blue" size="xs" />}
        <div className="w-full md:w-fit flex flex-col md:flex-row items-end gap-4">
          <div className="w-full flex flex-row md:items-end gap-4">
            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm md:text-base text-gray-darkest">
                {specialistName}
              </h3>
              <p className="font-light text-xs md:text-sm text-gray-dark">
                {specialistType} • {credentialCode}
              </p>
            </div>
          </div>

          <div className="w-full md:w-fit flex flex-row gap-2 h-full items-end">
            <div className="flex flex-row gap-1 items-center">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-blue"
                size="xs"
              />
              <p className="font-medium text-xs md:text-sm text-gray-darkest">
                {sessionDate}
              </p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <FontAwesomeIcon icon={faClock} className="text-blue" size="xs" />
              <p className="font-medium text-xs md:text-sm text-gray-darkest">
                {sessionTime}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-fit">
        <PrimaryButton
          text="Conversar"
          icon={faWhatsapp}
          onClick={handleChatClick}
          color="blue"
        />
      </div>
    </div>
  );
}
