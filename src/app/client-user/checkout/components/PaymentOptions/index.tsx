import { faPix } from "@fortawesome/free-brands-svg-icons";
import { faBarcode, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type PaymentMethod = "pix" | "card" | "boleto";

type PaymentOptionsProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
};

const paymentOptions = [
  {
    label: "Pix",
    value: "pix" as PaymentMethod,
    icon: <FontAwesomeIcon icon={faPix} size="xs" />,
  },
  {
    label: "Cartão",
    value: "card" as PaymentMethod,
    icon: <FontAwesomeIcon icon={faCreditCard} size="xs" />,
  },
  {
    label: "Boleto",
    value: "boleto" as PaymentMethod,
    icon: <FontAwesomeIcon icon={faBarcode} size="xs" />,
  },
];

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="block font-medium text-sm">Forma de pagamento</span>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
        {paymentOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-4 rounded cursor-pointer hover:bg-gray-50 transition border border-transparent"
          >
            <div className="p-1 px-2 bg-gray-lightest rounded-lg">{option.icon}</div>
            <span className="flex-1 text-sm text-gray-darkest">{option.label}</span>
            <input
              type="radio"
              name="payment-method"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${
                value === option.value ? "border-blue-600" : "border-gray-300"
              }`}
            >
              {value === option.value && (
                <span className="w-3 h-3 bg-blue-600 rounded-full" />
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
