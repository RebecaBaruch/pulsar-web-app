import React, { useState } from "react";

type SelectInputProps = {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string | number;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  error?: boolean;
  className?: string;
  width?: "fit" | "full";
};

export default function SelectInput({
  label,
  options,
  value,
  isDisabled = false,
  onChange,
  error = false,
  className,
  width = "full",
}: SelectInputProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.value === value);
  const widthClass = width === "fit" ? "inline-flex flex-col w-fit" : "w-full";

  return (
    <div className={`relative ${widthClass} ${className || ""}`}>
      {label && (
        <label className="block text-md font-medium mb-2 text-black">
          {label}
        </label>
      )}

      {/* Botão principal */}
      <button
        type="button"
        disabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isDisabled) setOpen((o) => !o);
        }}
        className={`flex items-center justify-between w-full border rounded px-3 py-3 bg-blue-lightest text-left focus:outline-none
          ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-light focus:border-blue"
          }
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {selected ? (
          <span className="text-black font-medium">{selected.label}</span>
        ) : (
          <span className="text-gray">Selecione uma opção</span>
        )}

        <span className="text-gray ml-2">▾</span>
      </button>

      {/* Dropdown */}
      {open && !isDisabled && (
        <ul className="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-light rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-3 py-2 hover:bg-blue-lightest cursor-pointer text-black"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
