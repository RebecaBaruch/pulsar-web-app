import { icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type BadgeVariant = "green" | "blue" | "blueLight" | "blueDark" | "black" | "gray" | "grayOutline";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  buttonIcon?: IconDefinition;
  onClick?: () => void;
}

const variantMap: Record<BadgeVariant, string> = {
  green: "bg-green text-green-dark",
  blue: "bg-blue text-white",
  blueLight: "bg-blue-light text-blue-dark",
  blueDark: "bg-blue-dark text-white",
  black: "bg-gray-darkest text-white",
  gray: "bg-gray-lightest text-gray-dark",
  grayOutline: "text-gray border border-gray-light",
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "blue",
  buttonIcon = undefined,
  onClick,
}) => {
  return (
    <span className={`flex flex-row gap-2 px-3 py-1 text-xs ${variantMap[variant]} rounded-sm`}>
      {label}
      {buttonIcon && onClick && (
        <button onClick={onClick} className="cursor-pointer">
          <FontAwesomeIcon icon={buttonIcon} />
        </button>
      )}
    </span>
  );
};

export default Badge;
