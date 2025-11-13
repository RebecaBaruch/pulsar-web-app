import React from "react";

type ColorOption = "blue" | "green" | "red";

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
      className={`w-full border border-${color} bg-transparent hover:border-${color}-dark text-blue font-semibold py-3 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-${color}-light`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
