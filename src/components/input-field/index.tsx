import React from "react";

type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "date";

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  type?: InputType;
  value?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  error?: boolean;
  className?: string;
};

const InputField = ({
  label,
  placeholder,
  type = "text",
  value,
  isDisabled = false,
  onChange,
  error = false,
  className,
}: InputFieldProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-md font-medium mb-2 text-black">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`outline-none border rounded px-3 py-3 w-full text-black placeholder-gray bg-blue-lightest focus:outline-none
          ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-light focus:border-blue"
          }
        `}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default InputField;
