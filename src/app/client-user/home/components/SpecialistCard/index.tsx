import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type SpecialistCardProps = {
  title: string;
  icon: IconProp;
  image?: string;
  href?: string;
};

export function SpecialistCard({
  title,
  icon,
  image,
  href,
}: SpecialistCardProps) {
  return (
    <a href={href}>
      <div className="w-[100px] h-[100px] md:w-[108px] md:h-[108px] lg:w-[124px] lg:h-[124px] rounded overflow-hidden bg-white shadow-sm p-3 hover:cursor-pointer hover:bg-gray-100 hover:transform hover:scale-101 transition-transform flex flex-col items-left justify-between">
        {icon ? (
          <div className="w-fit h-fit flex items-center justify-center text-blue">
            <FontAwesomeIcon icon={icon} className="w-5 h-5 text-lg" />
          </div>
        ) : image ? (
          <div>
            <Image
              src={image}
              alt=""
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        ) : null}

        <div className="w-fit text-xs text-left font-semibold">
          {title}
        </div>
      </div>
    </a>
  );
}
