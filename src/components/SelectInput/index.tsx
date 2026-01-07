import React from "react";
import { useId } from "react";
type ValidatorType = (value: string | undefined) => string | undefined;

type SelectInputProps = {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string | number;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  width?: "fit" | "full";

  required?: boolean;
  customValidator?: ValidatorType;
  onValidationChange?: (error: string | undefined) => void;
  errorMessage?: string;
};

const isRequiredValidator: ValidatorType = (value) => {
  if (!value || String(value).trim() === "") {
    return "Este campo é obrigatório.";
  }
  return undefined;
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
  const selectRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [validationError, setValidationError] = React.useState<
    string | undefined
  >(undefined);
  const uid = useId();
  const buttonId = `selectbtn-${uid}`;
  const listboxId = `listbox-${uid}`;
  const labelId = `label-${uid}`;

  const selected = options.find((option) => option.value === value);
  const widthClass = width === "fit" ? "inline-flex flex-col w-fit" : "w-full";

  const validateField = (currentValue: string | undefined) => {
    let error: string | undefined;
    if (required) {
      error = isRequiredValidator(currentValue);
    }
    if (!error && customValidator) {
      const val = currentValue !== undefined ? String(currentValue) : undefined;
      error = customValidator(val);
    }
    setValidationError(error);
    onValidationChange?.(error);
  };

  return (
    if (touched) {
      validateField(value !== undefined ? String(value) : undefined);
    }
  }, [value, touched, required, customValidator]);
      {label && (
        <label id={labelId} className="block text-md font-medium mb-2 text-black">
          {label}
        </label>
      )}
  //   if (open) return;

  //   if (!touched) {
  //     setTouched(true);
  //   }
  //   validateField(value !== undefined ? String(value) : undefined);
  // };

  const handleSelect = (selectedValue: string) => {
        id={buttonId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={label ? `${labelId} ${buttonId}` : undefined}
        aria-invalid={hasError || undefined}
    onChange?.(selectedValue);
    setOpen(false);
    setTouched(true);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        onKeyDown={(e) => {
          if (isDisabled) return;
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        if (open) {
          setOpen(false);
          setTouched(true);
          validateField(value !== undefined ? String(value) : undefined);
        }
      }
    };
      {open && !isDisabled && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? labelId : undefined}
          className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-light rounded shadow-lg"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              className="px-3 py-2 hover:bg-blue-lightest cursor-pointer text-black focus:bg-blue-lightest"
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(option.value);
                } else if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      className={`relative ${widthClass} ${className || ""}`}
    >
        <p className="mt-1 text-sm text-red-500" aria-live="polite">{finalErrorMsg}</p>
        <label className="block text-md font-medium mb-2 text-black">
          {label}
        </label>
      )}

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
            hasError
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

      {open && !isDisabled && (
        <ul className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-light rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-3 py-2 hover:bg-blue-lightest cursor-pointer text-black"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {finalErrorMsg && (
        <p className="mt-1 text-sm text-red-500">{finalErrorMsg}</p>
      )}
    </div>
  );
}
