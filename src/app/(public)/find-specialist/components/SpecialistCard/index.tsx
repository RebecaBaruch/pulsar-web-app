"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { SpecialistCardProps } from "./type";
import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

const SpecialistCard: React.FC<SpecialistCardProps & { index?: number }> = ({
  name,
  role,
  crm,
  location,
  rating,
  reviews,
  tags,
  price,
  imgSrc,
  index,
}) => {
  const MAX_VISIBLE_TAGS = 3;
  const router = useRouter();

  const handleScheduleClick = () => {
    // Navigate to specialist details page using the index
    router.push(`${RoutesUrls.SPECIALIST_DETAILS}/${index}`);
  };

  return (
    <div
      className="w-full bg-white shadow-md rounded-2xl p-5 flex flex-col gap-6 hover:shadow-lg transition-shadow"
      onClick={handleScheduleClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={imgSrc}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-md font-semibold">{name}</h3>
            <p className="text-xs text-gray-600">
              {role} • {crm}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FontAwesomeIcon icon={faLocationDot} /> {location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, MAX_VISIBLE_TAGS).map((tag, index) => (
            <Tag
              key={index}
              label={tag.label}
              variant={index === 0 ? "blue" : "gray"}
            />
          ))}

          {tags.length > MAX_VISIBLE_TAGS && (
            <Tag
              label={`+${tags.length - MAX_VISIBLE_TAGS}`}
              variant="grayOutline"
            />
          )}
        </div>
      </div>

      <div className="w-full flex justify-start items-center gap-6 text-xs border-b border-gray-200 pb-6">
        <div className="flex items-center gap-1 text-gray-darkest">
          <FontAwesomeIcon icon={faStar} className="text-yellow" />
          <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-darkest">
          <FontAwesomeIcon icon={faUsers} />
          <span>{reviews} atendimentos</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-xs text-gray-600">Sessão online</p>
          <p className="text-lg font-semibold">{price}</p>
        </div>
        <div className="w-fit">
          <PrimaryButton
            text={"Agendar sessão"}
            onClick={() => {
              handleScheduleClick();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard;
