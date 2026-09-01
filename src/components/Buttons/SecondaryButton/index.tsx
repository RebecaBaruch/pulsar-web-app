import React from "react";

type ColorOption = "blue" | "green" | "red";
const colorStyles: Record<ColorOption, string> = {
  blue: "border-blue text-blue hover:border-blue-700 hover:text-blue-700 disabled:hover:border-blue-300",
  green:
    "border-green text-green hover:border-green-700 hover:text-green-700 disabled:hover:border-green-300",
  red: "border-red text-red hover:border-red-700 hover:text-red-700 disabled:hover:border-red-300",
};

type SecondaryButtonProps = {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  color?: ColorOption;
  type?: "button" | "submit" | "reset";
};

const SecondaryButton = ({
  text,
  onClick,
  isDisabled,
  color = "blue",
  type = "button",
}: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`
    w-full
    border
    bg-transparent
    text-xs
    lg:text-sm
    font-semibold
    p-3 py-4
    rounded
    cursor-pointer
    disabled:opacity-50
    disabled:cursor-not-allowed
    transition-colors
    ${colorStyles[color]}
  `}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
