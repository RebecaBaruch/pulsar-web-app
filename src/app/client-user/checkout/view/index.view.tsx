"use client";

import React from "react";
import AppointmentResume, {
  AppointmentResumeProps,
} from "../components/AppointmentResume";
import BenefitCheck, { BenefitCheckProps } from "../components/BenefitCheck";
import CheckoutCard from "../components/CheckoutCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import PaymentOptions, { PaymentMethod } from "../components/PaymentOptions";

type CheckoutViewProps = {
  appointmentDetails: AppointmentResumeProps;
  benefitDetails: BenefitCheckProps;
  price: number;
  discount?: number;
  onPaymentClick?: () => void;
};

export default function CheckoutView({
  appointmentDetails,
  benefitDetails,
  price,
  discount,
  onPaymentClick,
  paymentMethod,
  onPaymentMethodChange,
}: CheckoutViewProps & {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (value: PaymentMethod) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onPaymentClick) onPaymentClick();
  };
  return (
    <section className="flex w-full overflow-x-hidden min-h-screen justify-center pt-10 pb-10">
      <form
        className="flex flex-col gap-8 w-full justify-center max-w-[768px] mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:justify-center">
          <h1 className="text-2xl font-semibold text-gray-darkest md:text-center">
            Checkout
          </h1>
          <p className="text-xs text-gray-dark md:text-center">
            Confirme os detalhes do seu agendamento e escolha a forma de
            pagamento.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="w-full flex flex-col gap-6">
            <AppointmentResume
              specialistName={appointmentDetails.specialistName}
              specialistRole={appointmentDetails.specialistRole}
              specialistPhotoUrl={appointmentDetails.specialistPhotoUrl}
              appointmentDate={appointmentDetails.appointmentDate}
              appointmentTime={appointmentDetails.appointmentTime}
              timeZone={appointmentDetails.timeZone}
            />
            <PaymentOptions
              value={paymentMethod}
              onChange={onPaymentMethodChange}
            />
          </div>

          <div className="w-full flex flex-col gap-4 md:bg-white md:p-6 md:rounded-md md:border md:border-gray-100">
            <BenefitCheck
              checked={benefitDetails.checked}
              onChange={benefitDetails.onChange}
              benefitTitle={benefitDetails.benefitTitle}
              benefitDiscount={benefitDetails.benefitDiscount}
            />
            <CheckoutCard price={price} discount={discount} />
            <PrimaryButton text="Ir para o pagamento" type="submit" />
          </div>
        </div>
      </form>
    </section>
  );
}
