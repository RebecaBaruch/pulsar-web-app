import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ColorOption = "blue" | "green" | "red" | "white";

type LinkButtonProps = {
  icon?: IconDefinition;
  iconColor?: ColorOption;
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
  iconColor,
  iconFirst = false,
}: LinkButtonProps) {
  const colorClass = `text-${color}`;
  const hoverClass = `hover:text-${color}-dark`;
  const iconClass = `${colorClass} ${hoverClass}`;

  return (
    <a
      href={href}
      className={`flex flex-row items-center gap-1 text-xs md:text-sm hover:underline ${colorClass} ${hoverClass}`}
    >
      {iconFirst && icon && (
        <FontAwesomeIcon icon={icon} size="sm" className={iconClass} />
      )}
      <span
        className={`w-fit text-xs md:text-sm font-medium underline whitespace-nowrap`}
      >
        {text}
      </span>
      {icon && !iconFirst && (
        <FontAwesomeIcon icon={icon} size="sm" className={iconClass} />
      )}
    </a>
  );
}
