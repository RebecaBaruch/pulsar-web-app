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
  const resolvedIconColor = iconColor ?? color;

  return (
    <a
      href={href}
      className={`flex flex-row items-center gap-1 md:text-sm hover:underline`}
    >
      {iconFirst && icon && (
        <FontAwesomeIcon icon={icon} size="xs" color={resolvedIconColor} />
      )}
      <span
        className={`w-fit text-xs font-medium underline whitespace-nowrap text-${color} hover:text-${color}-dark`}
      >
        {text}
      </span>
      {icon && !iconFirst && (
        <FontAwesomeIcon icon={icon} size="xs" color={resolvedIconColor} />
      )}
    </a>
  );
}
