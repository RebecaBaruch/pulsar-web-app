"use client";

import React, { useEffect, useId, useRef, useState } from "react";

type Option = { value: string; label: string };

type SelectInputProps = {
  label?: string;
  options: Option[];
  value?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  width?: "fit" | "full";
  required?: boolean;
  customValidator?: (value?: string) => string | undefined;
  onValidationChange?: (err?: string) => void;
  errorMessage?: string;
};

export default function SelectInput({
  label,
  options,
  value,
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

  const selected = options.find((o) => o.value === value);
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
    if (touched) validateField(value);
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
          className="block text-sm font-medium mb-2 text-black"
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
        className={`flex items-center justify-between w-full border rounded px-3 py-2 bg-white text-left focus:outline-none
          ${error ? "border-red-500" : "border-gray-light"} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {selected ? (
          <span className="text-black">{selected.label}</span>
        ) : (
          <span className="text-gray">Selecione uma opção</span>
        )}
        <span className="ml-2">▾</span>
      </button>

      {open && !isDisabled && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={label ? btnId : undefined}
          className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-light rounded shadow-lg"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              tabIndex={0}
              className="px-3 py-2 hover:bg-blue-lightest cursor-pointer text-black"
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
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
