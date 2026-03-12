"use client";
import React from "react";
import CheckoutView from "../view/index.view";
import { PaymentMethod } from "../components/PaymentOptions";
import { benefitDetailsMock } from "../mock/checkoutMock";
import { specialistsMock } from "@/app/(public)/find-specialist/mock/mocks";
import { useBooking } from "@/context/BookingContext";

export default function CheckoutController() {
  return <CheckoutControllerInner />;
}

function CheckoutControllerInner() {
  const [checked, setChecked] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("pix");
  const { booking } = useBooking();
  const specialistId = booking?.specialistId;
  const specialist = React.useMemo(() => {
    if (!specialistId) return null;
    const index = parseInt(specialistId, 10);
    return specialistsMock[index] || null;
  }, [specialistId]);

  const appointmentDetails = booking
    ? {
        specialistName: booking.specialistName,
        specialistRole: booking.specialistRole,
        specialistPhotoUrl: booking.specialistPhotoUrl,
        appointmentDate: booking.appointmentDate
          ? new Date(booking.appointmentDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
          : "",
        appointmentTime: booking.appointmentTime,
        timeZone: booking.timeZone,
      }
    : null;

  const handleBenefitChange = (value: boolean) => {
    setChecked(value);
  };

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
  };

  const price = specialist?.price ? parseInt(specialist.price.replace(/\D/g, "")) : 100;
  let discount: number | undefined = undefined;
  if (checked && benefitDetailsMock.benefitDiscount) {
    const match = benefitDetailsMock.benefitDiscount.match(/R\$(\d+)/);
    if (match) {
      discount = parseInt(match[1], 10);
    }
  }

  const benefitDetails = {
    checked,
    onChange: handleBenefitChange,
    benefitTitle: benefitDetailsMock.benefitTitle,
    benefitDiscount: benefitDetailsMock.benefitDiscount,
  };

  if (!appointmentDetails) {
    return <div>Especialista não encontrado ou dados do agendamento ausentes.</div>;
  }

  return (
    <CheckoutView
      appointmentDetails={appointmentDetails}
      benefitDetails={benefitDetails}
      price={price}
      discount={discount}
      paymentMethod={paymentMethod}
      onPaymentMethodChange={handlePaymentMethodChange}
      onPaymentClick={() => {}}
    />
  );
}
