"use client";

import React from "react";
import { toast } from "sonner";
import SpecialistDetailsView from "../view/index.view";
import { useAuth } from "@/auth/useAuth";
import { useParams, useRouter } from "next/navigation";
import { reviewsMock } from "../mock/reviews";
import {
  fetchAvailabilityDates,
  fetchAvailabilityTimes,
  fetchSpecialistById,
} from "../../../services/publicSpecialistApi";
import { useBooking } from "@/context/BookingContext";
import type { SpecialistType } from "@/app/(public)/find-specialist/components/SpecialistCard/type";

export default function SpecialistDetailsController() {
  return <SpecialistDetailsControllerInner />;
}

function SpecialistDetailsControllerInner() {
  const params = useParams();
  const router = useRouter();
  const specialistId = params?.id as string;
  const [loading, setLoading] = React.useState(true);
  const [specialist, setSpecialist] = React.useState<SpecialistType | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  const [availableDates, setAvailableDates] = React.useState<string[]>([]);
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [timeLoading, setTimeLoading] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = React.useState(false);
  const closeLoginModal = () => setOpen(false);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const details = await fetchSpecialistById(specialistId);
        if (!cancelled) setSpecialist(details);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar o especialista.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [specialistId]);

  React.useEffect(() => {
    if (!specialist) return;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    fetchAvailabilityDates(specialistId, year, month).then(setAvailableDates);
  }, [currentMonth, specialist, specialistId]);

  React.useEffect(() => {
    if (!selectedDate || !specialist) {
      setTimeSlots([]);
      return;
    }
    const iso = selectedDate.toISOString().slice(0, 10);
    setTimeLoading(true);
    fetchAvailabilityTimes(specialistId, iso)
      .then(setTimeSlots)
      .finally(() => setTimeLoading(false));
  }, [selectedDate, specialist, specialistId]);

  const { setBooking } = useBooking();

  const handleSchedule = () => {
    if (!isAuthenticated) {
      setOpen(true);
      return;
    }
    if (selectedDate && selectedTime && specialist) {
      setBooking({
        specialistId,
        specialistName: specialist.name,
        specialistRole: specialist.role,
        specialistPhotoUrl: specialist.imgSrc,
        appointmentDate: selectedDate.toISOString().slice(0, 10),
        appointmentTime: selectedTime,
        timeZone: "São Paulo, Brasil",
      });
      router.push(`/client-user/checkout`);
    } else {
      toast.error("Selecione uma data e horário.");
    }
  };

  if (!specialist && !loading) {
    return <div>Especialista não encontrado</div>;
  }

  return (
    <SpecialistDetailsView
      loading={loading}
      specialist={specialist}
      bookingCard={{
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        availableDates,
        onMonthChange: setCurrentMonth,
        timeSlots,
        timeLoading,
        isAuthenticated,
        onSchedule: handleSchedule,
      }}
      reviews={reviewsMock}
      showLoginModal={open}
      onCloseLoginModal={closeLoginModal}
    />
  );
}
