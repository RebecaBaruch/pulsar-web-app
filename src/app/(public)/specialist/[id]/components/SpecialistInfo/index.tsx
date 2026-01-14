"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faUsers,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@/components/Badge";
import { SpecialistType } from "@/app/(public)/find-specialist/components/SpecialistCard/type";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import LinkButton from "@/components/LinkButton";

type Props = {
  specialist: SpecialistType;
};

export default function SpecialistInfo({ specialist }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:p-4">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-sm overflow-hidden">
          <img
            src={specialist.imgSrc}
            alt={specialist.name}
            className="w-20 h-20 rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold">{specialist.name}</h1>
            <p className="text-xs text-gray-600">
              {specialist.role} • {specialist.crm}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <FontAwesomeIcon icon={faLocationDot} /> {specialist.location}
            </p>
          </div>

          <div className="flex items-center gap-6 text-gray-dark text-xs">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="text-yellow text-xs" />
              <span>{specialist.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faUsers} className="text-xs" />
              <span>{specialist.reviews} atendimentos</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold">Abordagem</h4>
        <div className="flex items-center gap-2 mt-2">
          {specialist.approach.map((approach, index) => (
            <Badge
              key={index}
              label={approach.label}
              variant={index === 0 ? "black" : "gray"}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold">Sobre</h3>
        <p className="text-xs text-gray-700 leading-relaxed mb-3">
          {specialist.about}
        </p>
        <LinkButton
          href=""
          iconFirst
          icon={faYoutube}
          iconColor="red"
          text="Vídeo de apresentação"
        />
      </div>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div>
            <p className="text-sm text-gray-600">50min (Online)</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">{specialist.price}</p>
        </div>
      </div>
    </div>
  );
}
