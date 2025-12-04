import React from "react";
import ReactCountryFlag from "react-country-flag";
import { phoneCountryCodes, countryNames } from "@/utils/phone-country-codes";

type Mode = "phone" | "country";

type WidthOption = "fit" | "full";

type NormalizedOption = {
  code: string;
  value: string;
  display: string;
};

type CountryCodeSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: boolean;
  className?: string;
  width?: WidthOption;
  mode?: Mode;
};

const normalizeOptions = (mode: Mode): NormalizedOption[] => {
  if (mode === "phone") {
    return phoneCountryCodes.map((o) => ({
      code: o.code,
      value: o.value,
      display: o.country,
    }));
  }

  return countryNames.map((c) => ({
    code: c.code,
    value: c.display,
    display: c.display,
  }));
};

const getPlaceholder = (mode: Mode, options: NormalizedOption[]) => {
  const first = options[0];

  return (
    <div className="flex items-center gap-2">
      <ReactCountryFlag
        countryCode={first.code}
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
      <span className="text-xs text-gray font-medium">
        {mode === "phone" ? first.value : first.display}
      </span>
    </div>
  );
};

export default function CountryCodeSelect({
  value,
  onChange,
  label,
  error = false,
  className,
  width = "full",
  mode = "phone",
}: CountryCodeSelectProps) {
  const [open, setOpen] = React.useState(false);

  const options = normalizeOptions(mode);
  const selected = options.find((c) => c.value === value);

  const widthClass = width === "fit" ? "inline-flex flex-col w-fit" : "w-full";

  return (
    <div className={`relative ${widthClass} ${className || ""}`}>
      {label && (
        <label className="block text-md font-medium mb-2 lg:text-xs 2xl:text-sm text-black whitespace-nowrap">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={`flex items-center justify-between w-full border rounded p-2.5 lg:p-1 2xl:p-2.5 bg-blue-lightest focus:outline-none ${
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
                style={{ width: "0.8em", height: "0.8em" }}
              />
              <span className="lg:text-xs text-black font-semibold">
                {mode === "phone" ? selected.value : selected.display}
              </span>
            </>
          ) : (
            getPlaceholder(mode, options)
          )}
        </div>
        <span className="text-black">▾</span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-light rounded shadow-lg">
          {options.map((option) => (
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
              <span className="text-black font-medium">
                {mode === "phone" ? option.value : option.display}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
