"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faUsers,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { SpecialistType } from "./type";
import Badge from "@/components/Badge";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import LinkButton from "@/components/LinkButton";

const SpecialistCard: React.FC<SpecialistType & { index?: number }> = ({
  name,
  role,
  crm,
  rating,
  reviews,
  approach,
  price,
  imgSrc,
  index,
}) => {
  const MAX_VISIBLE_BADGES = 3;
  const router = useRouter();

  const handleScheduleClick = () => {
    router.push(`${RoutesUrls.SPECIALIST_DETAILS}/${index}`);
  };

  return (
    <div
      className="w-full flex flex-col gap-4 p-4 bg-white shadow-md rounded-2xl hover:shadow-lg transition-shadow h-full cursor-pointer"
      onClick={handleScheduleClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gray-100 rounded-sm overflow-hidden">
            <img
              src={imgSrc}
              alt={name}
              className="w-14 h-14 rounded-sm object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-sm md:text-base font-semibold">{name}</h3>
              <p className="text-xs text-gray-500">
                {role} • {crm}
              </p>
            </div>
            <div className="w-full flex justify-start items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <FontAwesomeIcon icon={faStar} className="text-yellow" />
                <span>{rating.toFixed(1)}</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <span>{reviews} atendimentos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mt-1">
          {approach.slice(0, MAX_VISIBLE_BADGES).map((approach, index) => (
            <Badge
              key={index}
              label={approach.label}
              variant={index === 0 ? "black" : "gray"}
            />
          ))}

          {approach.length > MAX_VISIBLE_BADGES && (
            <Badge
              label={`+${approach.length - MAX_VISIBLE_BADGES}`}
              variant="grayOutline"
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold text-black">{price}</p>
          <p className="text-xs text-gray-600">/50min</p>
        </div>
        <LinkButton
          href={`${RoutesUrls.SPECIALIST_DETAILS}/${index}`}
          text="Agendar sessão"
          icon={faChevronRight}
          color="blue"
        />
      </div>
    </div>
  );
};

export default SpecialistCard;
