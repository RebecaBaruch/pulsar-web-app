import React, { useState } from "react";
import { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Validator,
  validateEmail,
  validatePassword,
  validateNumber,
  validateCpf,
  validatePhone,
  isRequired,
  runValidators,
} from "../../utils/inputs-validation";
import { formatCpf, formatPhone } from "../../utils/input-formatting";

type InputType =
  | "text"
  | "cpf"
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
  min?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  customValidator?: Validator;
  required?: boolean;
  onValidationChange?: (error: string | undefined) => void;
  className?: string;
  shouldValidate?: boolean;
  isSuccess?: boolean;

  skipTypeValidation?: boolean;
  showPasswordToggle?: boolean;
};

const InputField = ({
  label,
  placeholder,
  type = "text",
  value,
  min,
  isDisabled = false,
  onChange,
  error = false,
  errorMessage,
  required = false,
  customValidator,
  onValidationChange,
  shouldValidate = false,
  isSuccess = false,
  className = "",
  skipTypeValidation = false,
  showPasswordToggle = false,
  onBlur,
}: InputFieldProps) => {
  const [validationError, setValidationError] = React.useState<
    string | undefined
  >(undefined);

  const [touched, setTouched] = React.useState(false);

  // state for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const defaultValidators = React.useMemo(() => {
    const validators: Validator[] = [];

    if (required) {
      validators.push(isRequired);
    }

    if (!skipTypeValidation) {
      switch (type) {
        case "email":
          validators.push(validateEmail);
          break;
        case "password":
          validators.push(validatePassword);
          break;
        case "number":
          validators.push(validateNumber);
          break;
        case "cpf":
          validators.push(validateCpf);
          break;
        case "tel":
          validators.push(validatePhone);
          break;
      }
    }

    if (customValidator) {
      validators.push(customValidator);
    }

    return validators;
  }, [type, required, customValidator, skipTypeValidation]);

  const validateField = React.useCallback(
    (currentValue: string | undefined) => {
      const errorMsg = runValidators(currentValue, defaultValidators);
      setValidationError(errorMsg);
      onValidationChange?.(errorMsg);
      return errorMsg;
    },
    [defaultValidators, onValidationChange]
  );

  const shouldShowValidationError = shouldValidate || touched;

  const finalErrorMsg =
    errorMessage || (shouldShowValidationError ? validationError : undefined);
  const isError = error || !!finalErrorMsg;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!touched) {
      setTouched(true);
    }
    validateField(e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // apply formatting based on the input type
    if (type === "cpf") {
      newValue = formatCpf(newValue);
    } else if (type === "tel") {
      newValue = formatPhone(newValue);
    }

    onChange?.(newValue);

    if (isError || touched || shouldValidate) {
      validateField(newValue);
    }
  };

  React.useEffect(() => {
    if (shouldValidate && !touched) {
      validateField(value);
    }
  }, [shouldValidate, validateField, value, touched]);

  const fieldId = useId();
  const inputId = `input-${fieldId}`;
  const labelId = `label-${fieldId}`;
  const errorId = `error-${fieldId}`;

  const isPasswordType = type === "password";

  // makes the input type dynamic based on whether it's a password field and if the toggle is enabled
  const rawInputType =
    isPasswordType && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type === "cpf"
      ? "text"
      : type;

  return (
    <div className={`${className}`}>
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className="block text-xs font-medium mb-2 text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={rawInputType}
          className={`w-full outline-none border rounded p-3 text-gray-900 text-xs placeholder-gray bg-blue-lightest focus:outline-none
            ${
              isError
                ? "border-red-500 focus:border-red-600"
                : isSuccess
                  ? "border-green-500 focus:border-green-600"
                  : "border-gray-light focus:border-blue"
            }
            ${isDisabled ? "text-gray bg-gray-200 cursor-not-allowed" : "cursor-text"}
            ${isPasswordType && showPasswordToggle ? "pr-10" : ""}
          `}
          placeholder={placeholder}
          value={value}
          min={min}
          disabled={isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          required={required}
          aria-required={required || undefined}
          aria-invalid={isError || undefined}
          aria-describedby={finalErrorMsg ? errorId : undefined}
          aria-labelledby={label ? labelId : undefined}
        />

        {/* button for changing the eye icon visibility */}
        {isPasswordType && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isDisabled}
            tabIndex={-1}
            title={showPassword ? "Ocultar senha" : "Exibir senha"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-xs"
            />
          </button>
        )}
      </div>

      {finalErrorMsg && (
        <p
          id={errorId}
          aria-live="polite"
          className="text-red-500 text-sm mt-1"
        >
          {finalErrorMsg}
        </p>
      )}
    </div>
  );
};

export default InputField;