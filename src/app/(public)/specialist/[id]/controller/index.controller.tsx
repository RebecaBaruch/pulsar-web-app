"use client";

import React from "react";
import SpecialistDetailsView from "../view/index.view";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useParams } from "next/navigation";
import { specialistsMock } from "@/app/(public)/find-specialist/mock/mocks";
import {reviewsMock} from "../mock/reviews";
import {
  fetchAvailableDates,
  fetchAvailableTimes,
} from "../services/availabilityService";

export default function SpecialistDetailsController() {
  const params = useParams();
  const specialistId = params?.id as string;

  const [loading, setLoading] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  const [availableDates, setAvailableDates] = React.useState<string[]>([]);
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [timeLoading, setTimeLoading] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSchedule = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push(RoutesUrls.LOGIN);
    } else {
      if (selectedDate && selectedTime) {
        alert(
          `Agendamento realizado para ${selectedDate.toLocaleDateString()} às ${selectedTime}`
        );
      } else {
        alert("Por favor, selecione uma data e horário");
      }
    }
  };

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
    />
  );
}
