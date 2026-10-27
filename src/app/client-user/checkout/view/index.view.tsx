"use client";

import React from "react";
import AppointmentResume, {
  AppointmentResumeProps,
} from "../components/AppointmentResume";
import BenefitCheck, { BenefitCheckProps } from "../components/BenefitCheck";
import CheckoutCard from "../components/CheckoutCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import {
  ClientPageHeader,
  ClientPageShell,
  clientCardClass,
} from "@/components/ClientPage";
import PaymentOptions, { PaymentMethod } from "../components/PaymentOptions";

type CheckoutViewProps = {
  appointmentDetails: AppointmentResumeProps;
  benefitDetails: BenefitCheckProps;
  price: number;
  discount?: number;
  onPaymentClick?: () => void;
  submitting?: boolean;
};

export default function CheckoutView({
  appointmentDetails,
  benefitDetails,
  price,
  discount,
  onPaymentClick,
  submitting,
  paymentMethod,
  onPaymentMethodChange,
}: CheckoutViewProps & {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (value: PaymentMethod) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onPaymentClick && !submitting) onPaymentClick();
  };
  return (
    <ClientPageShell>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <ClientPageHeader
          title="Checkout"
          description="Confirme os detalhes do seu agendamento e escolha a forma de pagamento."
          align="center"
        />

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

          <div
            className={`flex w-full flex-col gap-4 md:p-6 ${clientCardClass}`}
          >
            <BenefitCheck
              checked={benefitDetails.checked}
              onChange={benefitDetails.onChange}
              benefitTitle={benefitDetails.benefitTitle}
              benefitDiscount={benefitDetails.benefitDiscount}
            />
            <CheckoutCard price={price} discount={discount} />
            <PrimaryButton
              text={submitting ? "Processando…" : "Ir para o pagamento"}
              type="submit"
              isDisabled={submitting}
            />
          </div>
        </div>
      </form>
    </ClientPageShell>
  );
}
