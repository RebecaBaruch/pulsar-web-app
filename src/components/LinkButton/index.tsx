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
      className={`flex flex-row items-center gap-2 text-xs hover:underline ${colorClass} ${hoverClass}`}
    >
      {iconFirst && icon && (
        <FontAwesomeIcon icon={icon} size="xs" className={iconClass} />
      )}
      <span
        className={`w-fit text-xs font-bold whitespace-nowrap`}
      >
        {text}
      </span>
      {icon && !iconFirst && (
        <FontAwesomeIcon icon={icon} size="xs" className={`${iconClass} ${iconColor}`} />
      )}
    </a>
  );
}
