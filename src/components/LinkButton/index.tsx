import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ColorOption = "blue" | "green" | "red" | "white";

type LinkButtonProps = {
  icon?: IconDefinition;
  href: string;
  text: string;
  color?: ColorOption;
  iconFirst?: boolean;
};

export default function LinkButton({
  icon,
  href,
  text,
  color = "blue",
  iconFirst = false,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`flex flex-row items-center gap-1 md:text-sm text-${color} hover:underline hover:text-${color}-dark`}
    >
      {iconFirst && icon && <FontAwesomeIcon icon={icon} size="xs" />}
      <span className={"w-fit text-xs font-medium underline whitespace-nowrap"}>
        {text}
      </span>
      {icon && <FontAwesomeIcon icon={icon} size="xs" />}
    </a>
  );
}
