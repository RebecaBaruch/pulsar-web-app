"use client";

import React from "react";
import SpecialistDetailsView from "../view/index.view";
import { useAuth } from "@/auth/useAuth";
import { useParams, useRouter } from "next/navigation";
import { specialistsMock } from "@/app/(public)/find-specialist/mock/mocks";
import { reviewsMock } from "../mock/reviews";
import {
  fetchAvailableDates,
  fetchAvailableTimes,
} from "../services/availabilityService";
import { useBooking } from "@/context/BookingContext";

export default function SpecialistDetailsController() {
  return <SpecialistDetailsControllerInner />;
}

function SpecialistDetailsControllerInner() {
  const params = useParams();
  const router = useRouter();
  const specialistId = params?.id as string;
  const [loading, setLoading] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  const [availableDates, setAvailableDates] = React.useState<string[]>([]);
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [timeLoading, setTimeLoading] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = React.useState(false);
  const closeLoginModal = () => setOpen(false);

  // Find specialist by id (using index for now from mock data)
  const specialist = React.useMemo(() => {
    const index = parseInt(specialistId, 10);
    return specialistsMock[index] || null;
  }, [specialistId]);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch available dates whenever month changes
  React.useEffect(() => {
    if (!specialist) return;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    fetchAvailableDates(String(specialistId), year, month).then(
      setAvailableDates
    );
  }, [currentMonth, specialist, specialistId]);

  // Fetch available times when a date is selected
  React.useEffect(() => {
    if (!selectedDate || !specialist) {
      setTimeSlots([]);
      return;
    }
    const iso = selectedDate.toISOString().slice(0, 10);
    setTimeLoading(true);
    fetchAvailableTimes(String(specialistId), iso)
      .then(setTimeSlots)
      .finally(() => setTimeLoading(false));
  }, [selectedDate, specialist, specialistId]);

  const { setBooking } = useBooking();

  const handleSchedule = () => {
    if (!isAuthenticated) {
      setOpen(true);
      return;
    }
    if (selectedDate && selectedTime && isAuthenticated && specialist) {
      // Set booking details in context
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
      alert("Por favor, selecione uma data e horário");
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
