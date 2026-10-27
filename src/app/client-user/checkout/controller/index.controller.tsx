"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CheckoutView from "../view/index.view";
import { PaymentMethod } from "../components/PaymentOptions";
import { useBooking } from "@/context/BookingContext";
import { buildSessionWindow } from "@/utils/sessionSchedule";
import {
  createAndProcessPayment,
  fetchSpecialistDetails,
  scheduleSession,
} from "../../services/clientUserApi";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function CheckoutController() {
  return <CheckoutControllerInner />;
}

function CheckoutControllerInner() {
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("pix");
  const [submitting, setSubmitting] = React.useState(false);
  const [specialistLoading, setSpecialistLoading] = React.useState(true);
  const [price, setPrice] = React.useState(100);
  const { booking } = useBooking();
  const specialistId = booking?.specialistId;

  React.useEffect(() => {
    if (!specialistId) {
      setSpecialistLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const details = await fetchSpecialistDetails(specialistId);
        if (cancelled || !details?.price) return;
        setPrice(details.price);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar o valor da sessão.");
        }
      } finally {
        if (!cancelled) setSpecialistLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [specialistId]);

  const appointmentDetails = booking
    ? {
        specialistName: booking.specialistName,
        specialistRole: booking.specialistRole,
        specialistPhotoUrl: booking.specialistPhotoUrl,
        appointmentDate: booking.appointmentDate
          ? new Date(booking.appointmentDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
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

  const discount = checked ? Math.round(price * 0.1) : 0;

  const benefitDetails = {
    checked,
    onChange: handleBenefitChange,
    benefitTitle: "Benefício corporativo",
    benefitDiscount: discount > 0 ? `R$${discount}` : undefined,
  };

  const handlePayment = async () => {
    if (!booking || submitting) return;

    setSubmitting(true);

    try {
      const { startTime, endTime } = buildSessionWindow(
        booking.appointmentDate,
        booking.appointmentTime,
      );

      const scheduled = await scheduleSession({
        specialistId: booking.specialistId,
        startTime,
        endTime,
      });

      const payment = await createAndProcessPayment({
        sessionId: scheduled.sessionId,
        specialistId: booking.specialistId,
        price,
        discount,
        paymentMethod,
      });

      if (payment.paymentUrl) {
        window.location.href = payment.paymentUrl;
        return;
      }

      toast.success("Pagamento iniciado com sucesso.");
      router.push(RoutesUrls.CLIENT_SESSIONS);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao processar pagamento.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!appointmentDetails) {
    return (
      <div className="p-8 text-center text-gray-dark">
        Especialista não encontrado ou dados do agendamento ausentes.
      </div>
    );
  }

  if (specialistLoading) {
    return (
      <div className="p-8 text-center text-gray-dark">Carregando checkout…</div>
    );
  }

  return (
    <CheckoutView
      appointmentDetails={appointmentDetails}
      benefitDetails={benefitDetails}
      price={price}
      discount={discount > 0 ? discount : undefined}
      paymentMethod={paymentMethod}
      onPaymentMethodChange={handlePaymentMethodChange}
      onPaymentClick={handlePayment}
      submitting={submitting}
    />
  );
}
