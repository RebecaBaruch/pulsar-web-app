import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type ColorOption = "blue" | "green" | "red" | "white";

type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  icon?: IconDefinition;
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  color?: ColorOption;
};

const colorStyles: Record<ColorOption, string> = {
  blue: `
    bg-blue-500
    hover:bg-blue-600
    text-white
    disabled:hover:bg-blue-300
  `,
  green: `
    bg-green-500
    hover:bg-green-600
    text-white
    disabled:hover:bg-green-300
  `,
  red: `
    bg-red-500
    hover:bg-red-600
    text-white
    disabled:hover:bg-red-300
  `,
  white: `
    bg-white
    hover:bg-blue-100
    text-blue-600
    disabled:hover:bg-white
  `,
};

const PrimaryButton = ({
  type = "button",
  icon,
  text,
  onClick,
  isDisabled,
  color = "blue",
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`
        w-full
        flex
        items-center
        justify-center
        gap-2
        text-xs
        font-semibold
        p-2 lg:p-3
        rounded
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${colorStyles[color]}
      `}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
    </button>
  );
};

export default PrimaryButton;
