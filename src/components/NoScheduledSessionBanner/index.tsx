"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
import React from "react";

type NoScheduledSessionBannerProps = {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt?: string;
  buttonRightIcon?: IconDefinition;
  onScheduleClick?: () => void;
};

export default function NoScheduledSessionBanner({
  title,
  description,
  buttonText,
  imageSrc,
  imageAlt = "",
  buttonRightIcon,
  onScheduleClick,
}: NoScheduledSessionBannerProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    if (onScheduleClick) {
      onScheduleClick();
      return;
    }
    router.push(RoutesUrls.FIND_SPECIALIST);
  };

  return (
    <div className="flex w-full flex-row items-center gap-3 rounded-xl bg-blue-100 p-4 md:items-center md:gap-6 md:rounded-lg md:bg-blue-100 md:p-6">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="order-2 h-[4.5rem] w-[4.5rem] shrink-0 object-contain md:order-1 md:h-15 md:w-15"
      />

      <div className="order-1 flex min-w-0 flex-1 flex-col gap-2 text-left md:order-2 md:gap-1">
        <div>
          <h2 className="text-sm font-semibold leading-tight text-gray-darkest md:text-base">
            {title}
          </h2>
          <p className="mt-0.5 text-xs leading-snug text-gray-dark md:mt-1 md:text-sm">
            {description}
          </p>
        </div>

        <div className="md:hidden">
          <PrimaryButton
            text={buttonText}
            rightIcon={buttonRightIcon}
            size="compact"
            fullWidth={false}
            onClick={handleButtonClick}
          />
        </div>
      </div>

      <div className="order-3 hidden w-auto shrink-0 md:block md:min-w-[12.5rem]">
        <PrimaryButton
          text={buttonText}
          rightIcon={buttonRightIcon}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}