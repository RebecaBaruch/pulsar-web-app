type TagVariant = "green" | "blue" | "gray" | "grayOutline";

interface TagProps {
  label: string;
  variant?: TagVariant;
}

const variantMap: Record<TagVariant, string> = {
  green: "bg-green text-green-dark",
  blue: "bg-blue-light text-gray-darkest",
  gray: "bg-gray-lightest text-gray-dark",
  grayOutline: "text-gray border border-gray-00",
};

const Tag: React.FC<TagProps> = ({ label, variant = "blue" }) => {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${variantMap[variant]}`}
    >
      {label}
    </span>
  );
};

export default Tag;