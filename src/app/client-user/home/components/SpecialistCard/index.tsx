import React from "react";
import Image from "next/image";
import Icon from "@/components/Icons";

type SpecialistCardProps = {
  title: string;
  icon?: React.ComponentProps<typeof Icon>["name"];
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
          <div className="w-fit h-fit flex items-center justify-center text-blue-dark">
            <Icon name={icon} className="w-6 h-6" />
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
