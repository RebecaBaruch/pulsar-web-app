import React from "react";

type ColorOption = "blue" | "green" | "red";

type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  color?: ColorOption;
};

const PrimaryButton = ({
  type = "button",
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
      className={`w-full bg-${color} hover:bg-${color}-dark text-lg lg:text-sm text-white font-semibold py-3 lg:py-2 2xl:py-3 px-6 lg:px-4 xl:px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-${color}-light`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
