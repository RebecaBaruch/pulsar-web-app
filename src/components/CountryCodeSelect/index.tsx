import React, { useEffect, useId, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const buttonId = `ccs-btn-${uid}`;
  const listboxId = `ccs-list-${uid}`;
  const labelId = `ccs-lbl-${uid}`;

  const options = normalizeOptions(mode);
  const selected = options.find((c) => c.value === value);
  const widthClass = width === "fit" ? "w-full min-w-[7.25rem]" : "w-full";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`relative ${widthClass} ${className ?? ""}`}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={buttonId}
          className="mb-2 block text-xs font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <button
        type="button"
        id={buttonId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={label ? `${labelId} ${buttonId}` : undefined}
        aria-invalid={error || undefined}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((current) => !current);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={`flex w-full cursor-pointer items-center justify-between rounded border bg-blue-lightest p-3 text-left text-xs focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-600"
            : "border-gray-light focus:border-blue"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          {selected ? (
            <>
              <ReactCountryFlag
                countryCode={selected.code}
                svg
                className="shrink-0"
                style={{ width: "1.125rem", height: "1.125rem" }}
              />
              <span className="truncate font-medium text-gray-900">
                {mode === "phone" ? selected.value : selected.display}
              </span>
            </>
          ) : (
            <span className="text-gray-500">
              {mode === "phone" ? "Código" : "Selecione"}
            </span>
          )}
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-2 shrink-0 text-xs text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? labelId : undefined}
          className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded border border-gray-light bg-white shadow-lg"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-xs text-gray-dark hover:bg-blue-lightest focus:bg-blue-lightest"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange?.(option.value);
                  setOpen(false);
                } else if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
            >
              <ReactCountryFlag
                countryCode={option.code}
                svg
                style={{ width: "1.125rem", height: "1.125rem" }}
              />
              <span className="font-medium">
                {mode === "phone" ? option.value : option.display}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
