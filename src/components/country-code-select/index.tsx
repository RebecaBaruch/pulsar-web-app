import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { phoneCountryCodes } from "@/utils/phone-country-codes";

type WidthOption = "fit" | "full";

type CountryCodeSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: boolean;
  className?: string;
  width?: WidthOption;
};

export default function CountryCodeSelect({
  value,
  onChange,
  label,
  error = false,
  className,
  width = "full",
}: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = phoneCountryCodes.find((c) => c.value === value);

  const widthClass = width === "fit" ? "inline-flex flex-col w-fit" : "w-full";

  return (
    <div className={`relative ${widthClass} ${className || ""}`}>
      {label && (
        <label className="text-md font-medium mb-2 text-black whitespace-nowrap">
          {label}
        </label>
      )}

      {/* Campo principal */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={`flex items-center justify-between w-full border rounded px-3 py-3 bg-blue-lightest focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-600"
            : "border-gray-light focus:border-blue"
        }`}
      >
        <div className="flex items-center gap-2">
          {selected ? (
            <>
              <ReactCountryFlag
                countryCode={selected.code}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              <span className="text-black font-semibold">{`${selected.value}`}</span>
            </>
          ) : (
            <span className="text-gray">Selecione um país</span>
          )}
        </div>
        <span className="text-gray">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-light rounded shadow-lg">
          {phoneCountryCodes.map((option) => (
            <li
              key={option.value}
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-lightest cursor-pointer"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
            >
              <ReactCountryFlag
                countryCode={option.code}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              <span className="text-black font-medium">{`${option.value}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
