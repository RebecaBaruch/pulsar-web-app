import React from "react";

type SelectInputProps = {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string | number;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  error?: boolean;
  className?: string;
};

const SelectInput = ({
  label,
  options,
  value,
  error = false,
  isDisabled = false,
  onChange,
  className
}: SelectInputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-md font-medium mb-2 text-black">
          {label}
        </label>
      )}
      <select
        className={`outline-none border rounded px-3 py-3 w-full text-black bg-blue-lightest focus:outline-none
          ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-light focus:border-blue"
          }
        `}
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;