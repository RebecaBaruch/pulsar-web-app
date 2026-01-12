"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faUsers,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { SpecialistCardProps } from "./type";
import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import LinkButton from "@/components/LinkButton";

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
    router.push(`${RoutesUrls.SPECIALIST_DETAILS}/${index}`);
  };

  return (
    <div
      className="w-full flex flex-col gap-4 p-4 bg-white shadow-md rounded-2xl  hover:shadow-lg transition-shadow"
      onClick={handleScheduleClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-gray rounded-sm">
            <img
              src={imgSrc}
              alt={name}
              className="w-10 h-10 rounded-sm object-cover"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <div>
              <h3 className="text-base font-semibold">{name}</h3>
              <p className="text-xs text-gray-600">
                {role} • {crm}
              </p>
            </div>
            <div className="w-full flex justify-start items-center gap-4 text-xs">
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

        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
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

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold">{price}</p>
          <p className="text-xs text-gray-600">/50min</p>
        </div>
        <LinkButton href='/' text='Agendar sessão' icon={faChevronRight} />
      </div>
    </div>
  );
};

export default SpecialistCard;
