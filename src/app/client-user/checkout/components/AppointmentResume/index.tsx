"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faGlobe } from "@fortawesome/free-solid-svg-icons";

export type AppointmentResumeProps = {
  specialistName: string;
  specialistRole: string;
  specialistPhotoUrl: string;
  appointmentDate: string;
  appointmentTime: string;
  timeZone: string;
};

export default function AppointmentResume({
  specialistName,
  specialistRole,
  specialistPhotoUrl,
  appointmentDate,
  appointmentTime,
  timeZone,
}: AppointmentResumeProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-blue-light rounded-lg">
      <div className="flex flex-row items-center gap-4">
        <div className="w-10 h-10 rounded-full">
          <img
            src={specialistPhotoUrl}
            alt={`${specialistName}'s photo`}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">{specialistName}</h2>
          <p className="text-xs text-gray-dark">{specialistRole}</p>
        </div>
      </div>

      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-dark">Date</span>
          <div className="flex flex-row items-center gap-2 text-gray-darkest">
            <FontAwesomeIcon icon={faCalendar} size="xs" aria-hidden="true" />
            <p className="text-xs font-medium">{appointmentDate}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-dark">Time</span>
          <div className="flex flex-row items-center gap-2 text-gray-darkest">
            <FontAwesomeIcon icon={faClock} size="xs" aria-hidden="true" />
            <p className="text-xs font-medium">{appointmentTime}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-dark">Fuso horário:</span>
          <div className="flex flex-row items-center gap-2 text-gray-darkest">
            <FontAwesomeIcon icon={faGlobe} size="xs" aria-hidden="true" />
            <p className="text-xs font-medium">{timeZone}</p>
          </div>
      </div>
    </div>
  );
}
