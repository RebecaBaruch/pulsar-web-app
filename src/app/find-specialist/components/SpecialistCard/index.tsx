"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { SpecialistCardProps } from "./type";
import Tag from "@/components/tag";

const SpecialistCard: React.FC<SpecialistCardProps> = ({
  name,
  role,
  crm,
  location,
  rating,
  reviews,
  tags,
  price,
  imgSrc,
}) => {
  const MAX_VISIBLE_TAGS = 3;

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-5 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={imgSrc}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-xs text-gray-600">
              {role} • {crm}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FontAwesomeIcon icon={faLocationDot} /> {location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 bg-blue-dark text-white px-2 py-1 rounded-full">
            <FontAwesomeIcon icon={faStar} className="text-yellow" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-w text-gray-dark px-2 py-1 rounded-full">
            <FontAwesomeIcon icon={faUsers} />
            <span>{reviews} atendimentos</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, MAX_VISIBLE_TAGS).map((tag, index) => (
            <Tag
              key={index}
              label={tag.label}
              variant={index === 0 ? "green" : "blue"}
            />
          ))}

          {tags.length > MAX_VISIBLE_TAGS && (
            <Tag label={`+${tags.length - MAX_VISIBLE_TAGS}`} variant="gray" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-xs text-gray-600">Sessão online</p>
          <p className="text-lg font-semibold">{price}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
          Agendar sessão
        </button>
      </div>
    </div>
  );
};

export default SpecialistCard;
