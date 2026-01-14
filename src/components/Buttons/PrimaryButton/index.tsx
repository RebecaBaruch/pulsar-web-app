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
      className={`w-full flex items-center justify-center gap-2 bg-${color} hover:bg-${color}-dark text-xs ${color === "white" ? "text-blue" : "text-white"} font-semibold p-2 lg:p-3 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-${color}-light`}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
    </button>
  );
};

export default PrimaryButton;
