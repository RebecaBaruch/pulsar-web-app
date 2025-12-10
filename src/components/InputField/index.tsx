import React from "react";
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
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  customValidator?: Validator;
  required?: boolean;
  onValidationChange?: (error: string | undefined) => void;
  className?: string;
  shouldValidate?: boolean;
  isSuccess?: boolean;
};

const InputField = ({
  label,
  placeholder,
  type = "text",
  value,
  isDisabled = false,
  onChange,
  error = false,
  errorMessage,
  required = false,
  customValidator,
  onValidationChange,
  shouldValidate = false,
  isSuccess = false,
  className,
}: InputFieldProps) => {
  const [validationError, setValidationError] = React.useState<
    string | undefined
  >(undefined);

  const [touched, setTouched] = React.useState(false);

  const defaultValidators = React.useMemo(() => {
    const validators: Validator[] = [];
    if (required) {
      validators.push(isRequired);
    }
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
    if (customValidator) {
      validators.push(customValidator);
    }
    return validators;
  }, [type, required, customValidator]);

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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
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

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-lg lg:text-xs 2xl:text-sm font-medium mb-2 text-black">
          {label}
        </label>
      )}

      <input
        type={type}
        className={`w-full outline-none border rounded p-2.5 lg:p-2 xl:p-2.5 w-full text-black text-lg lg:text-xs 2xl:text-sm placeholder-gray bg-blue-lightest focus:outline-none
          ${
            isError
              ? "border-red-500 focus:border-red-600"
              : isSuccess 
                ? "border-green-500 focus:border-green-600"
                : "border-gray-light focus:border-blue"
          }
        `}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {finalErrorMsg && (
        <p className="text-red-500 text-sm mt-1">{finalErrorMsg}</p>
      )}
    </div>
  );
};

export default InputField;
