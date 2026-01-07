"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type UserSelectButtonProps = {
  title: string;
  description: string;
  icon: IconProp;
  onClick?: () => void;
};

export default function UserSelectButton({
  title,
  description,
  icon,
  onClick
}: UserSelectButtonProps) {
  return (
    <button className="flex flex-row justify-start items-center h-fit border border-gray rounded-lg p-6 gap-8 cursor-pointer hover:bg-gray-100 transition-shadow w-full" onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="2xl" className="text-black" />
      <div className="flex flex-col text-left">
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <p className="text-md text-gray-darkest">{description}</p>
      </div>
    </button>
  );
}
