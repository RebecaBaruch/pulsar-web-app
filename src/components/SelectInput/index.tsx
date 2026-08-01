"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

type Option = { value: string; label: string };

type SelectInputProps = {
  label?: string;
  icon?: IconDefinition;
  placeholder?: string;
  showResult?: boolean;
  options: Option[];
  value?: string | string[];
  isMulti?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string | string[]) => void;
  className?: string;
  width?: "fit" | "full";
  required?: boolean;
  customValidator?: (value?: string) => string | undefined;
  onValidationChange?: (err?: string) => void;
  errorMessage?: string;
};

export default function SelectInput({
  label,
  icon,
  placeholder = "Selecione uma opção",
  showResult = true,
  options,
  value,
  isMulti = false,
  isDisabled = false,
  onChange,
  className,
  width = "full",
  required = false,
  customValidator,
  onValidationChange,
  errorMessage,
}: SelectInputProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const uid = useId();
  const btnId = `select-btn-${uid}`;
  const listId = `select-list-${uid}`;

  const selected =
    isMulti && Array.isArray(value)
      ? options.filter((o) => value.includes(o.value))
      : options.find((o) => o.value === value);
  const widthClass = width === "fit" ? "w-fit" : "w-full";

  const validateField = (current?: string) => {
    let err: string | undefined;
    if (required && (!current || String(current).trim() === "")) {
      err = errorMessage ?? "Este campo é obrigatório.";
    }
    if (!err && customValidator) {
      err = customValidator(current);
    }
    setError(err);
    onValidationChange?.(err);
  };

  useEffect(() => {
    if (touched)
      validateField(
        Array.isArray(value)
          ? (value as string[]).join(",")
          : (value as string | undefined)
      );
  }, [value, touched]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleSelect = (v: string) => {
    if (isMulti) {
      const current = Array.isArray(value) ? [...value] : [];
      const exists = current.includes(v);
      const next = exists ? current.filter((c) => c !== v) : [...current, v];
      onChange?.(next);
      setTouched(true);
      validateField(
        Array.isArray(next) ? (next as any).join(",") : (next as any)
      );
      // keep dropdown open for multi-select
      return;
    }

    onChange?.(v);
    setOpen(false);
    setTouched(true);
    validateField(v);
  };

  return (
    <div ref={ref} className={`relative ${widthClass} ${className ?? ""}`}>
      {label && (
        <label
          htmlFor={btnId}
          className="block text-xs font-medium mb-2 text-gray-900"
        >
          {label}
        </label>
      )}

      <button
        id={btnId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          if (!isDisabled) setOpen((s) => !s);
        }}
        className={`flex items-center justify-between w-full border rounded p-3 bg-blue-lightest text-left focus:outline-none
          ${error ? "border-red-500" : "border-gray-light"} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isMulti ? (
          Array.isArray(selected) && selected.length > 0 && showResult ? (
            <span className="text-gray-dark text-xs">
              {selected.map((s) => s.label).join(", ")}
            </span>
          ) : (
            <span className="text-gray-dark text-xs">{placeholder}</span>
          )
        ) : selected && showResult ? (
          <span className="text-gray-dark text-xs">
            {(selected as any).label}
          </span>
        ) : (
          <span className="text-gray-dark text-xs">{placeholder}</span>
        )}

        {icon ? (
          <FontAwesomeIcon icon={icon} className="ml-2 text-xs" />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
        )}
      </button>

      {open && !isDisabled && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={label ? btnId : undefined}
          className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-light rounded shadow-lg"
        >
          {options.map((opt) => {
            const isSelected = isMulti
              ? Array.isArray(value) && value.includes(opt.value)
              : opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className="px-3 py-2 hover:bg-blue-lightest cursor-pointer text-gray-dark text-xs flex items-center gap-2"
                onClick={() => handleSelect(opt.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(opt.value);
                  } else if (e.key === "Escape") {
                    setOpen(false);
                  }
                }}
              >
                {isMulti && (
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!isSelected}
                    className="w-4 h-4"
                  />
                )}
                <span>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
