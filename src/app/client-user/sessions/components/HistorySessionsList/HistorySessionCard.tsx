import React from "react";
import LinkButton from "@/components/LinkButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import {
  faCalendar,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type HistorySessionCardProps = {
  specialistId: string;
  profilePic: string;
  specialistName: string;
  specialistType: string;
  specialistWpp: string;
  credentialCode: string;
  sessionDate: string;
  sessionTime: string;
};

export default function HistorySessionCard(props: HistorySessionCardProps) {
  const {
    profilePic,
    specialistName,
    specialistType,
    credentialCode,
    sessionDate,
    sessionTime,
  } = props;
  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 transition-colors cursor-pointer hover:bg-gray-100 p-4 py-8 border-b border-gray-200`}
    >
      <div className="w-full flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-fit flex flex-row items-start md:items-start gap-4 md:gap-6">
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm md:text-base text-gray-darkest">
                {specialistName}
              </h3>
              <p className="font-light text-xs md:text-sm text-gray-dark">
                {specialistType} • {credentialCode}
              </p>
            </div>

            <div className="flex flex-row gap-2 items-start md:items-end">
              <div className="flex flex-row gap-1 items-center">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-gray-dark"
                  size="xs"
                />
                <p className="font-light text-xs md:text-sm text-gray-darkest">
                  {sessionDate}
                </p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-gray-dark"
                  size="xs"
                />
                <p className="font-light text-xs md:text-sm text-gray-darkest">
                  {sessionTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-fit">
        <LinkButton
          href={RoutesUrls.SPECIALIST_DETAILS + "/" + props.specialistId}
          text="Agendar novamente"
          icon={faChevronRight}
        />
      </div>
    </div>
  );
}
