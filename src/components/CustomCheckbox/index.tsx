import React from "react";

type CustomCheckboxProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function CustomCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: CustomCheckboxProps) {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="peer sr-only"
      />

      <div
        className={`
          h-5 w-5 rounded border 
          flex items-center justify-center
          transition-colors
          border-gray-400
          peer-checked:border-blue-600
          peer-checked:bg-blue-600
          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600
        `}
      >
        <svg
          className={`w-3 h-3 text-white transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
