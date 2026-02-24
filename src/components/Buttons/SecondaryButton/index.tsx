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
};

const SecondaryButton = ({
  text,
  onClick,
  isDisabled,
  color = "blue",
}: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`
    w-full
    border
    bg-transparent
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
      {text}
    </button>
  );
};

export default SecondaryButton;
