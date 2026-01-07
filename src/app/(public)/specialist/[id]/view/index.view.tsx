"use client";

import React from "react";
// NavBar and Footer are now provided by the (public) layout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faUsers,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Tag from "@/components/Tag";
import Calendar from "../components/Calendar";
import TimeSlotSelector from "../components/TimeSlotSelector";
import ReviewCard from "../components/ReviewCard";
import { reviewsMock } from "../mock/reviews";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { SpecialistCardProps } from "@/app/(public)/find-specialist/components/SpecialistCard/type";

interface SpecialistDetailsViewProps {
  loading: boolean;
  specialist: SpecialistCardProps | null;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  availableDates?: string[];
  onMonthChange?: (date: Date) => void;
  timeSlots?: string[];
  timeLoading?: boolean;
}

export default function SpecialistDetailsView({
  loading,
  specialist,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availableDates,
  onMonthChange,
  timeSlots,
  timeLoading,
}: SpecialistDetailsViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleSchedule = () => {
    if (!isAuthenticated) {
      // Save the current URL to redirect back after login
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push(RoutesUrls.LOGIN);
    } else {
      // Proceed with booking
      if (selectedDate && selectedTime) {
        alert(
          `Agendamento realizado para ${selectedDate.toLocaleDateString()} às ${selectedTime}`
        );
        // Here you would typically call an API to create the appointment
      } else {
        alert("Por favor, selecione uma data e horário");
      }
    }
  };

  if (loading || !specialist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  const about =
    "Sou um psicólogo clínico com mais de 10 anos de experiência ajudando pessoas a superar desafios emocionais e mentais. Minha abordagem é baseada em Terapia Cognitivo-Comportamental (TCC), focada em resultados práticos e duradouros.";

  return (
    <>
      <div className="w-full px-4 py-6 max-w-[1440px] mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-2xl p-6 sticky top-6">
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src={specialist.imgSrc}
                  alt={specialist.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h1 className="text-2xl font-bold">{specialist.name}</h1>
                <p className="text-sm text-gray-600">
                  {specialist.role} • {specialist.crm}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <FontAwesomeIcon icon={faLocationDot} /> {specialist.location}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-blue-dark text-white px-3 py-2 rounded-full">
                  <FontAwesomeIcon icon={faStar} className="text-yellow" />
                  <span className="font-medium">
                    {specialist.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-w text-gray-dark px-3 py-2 rounded-full text-sm">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>{specialist.reviews} atendimentos</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2">Sobre</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{about}</p>
              </div>

              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-3">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {specialist.tags.map((tag, index) => (
                    <Tag
                      key={index}
                      label={tag.label}
                      variant={index === 0 ? "green" : "blue"}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sessão online</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {specialist.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar and Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mobile view: Profile info at top on smaller screens */}
            <div className="lg:hidden bg-white shadow-md rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={specialist.imgSrc}
                  alt={specialist.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-xl font-bold">{specialist.name}</h1>
                  <p className="text-sm text-gray-600">
                    {specialist.role} • {specialist.crm}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {specialist.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 bg-blue-dark text-white px-3 py-2 rounded-full text-sm">
                  <FontAwesomeIcon icon={faStar} className="text-yellow" />
                  <span className="font-medium">
                    {specialist.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-w text-gray-dark px-3 py-2 rounded-full text-sm">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>{specialist.reviews} atendimentos</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {specialist.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    label={tag.label}
                    variant={index === 0 ? "green" : "blue"}
                  />
                ))}
              </div>
            </div>

            {/* Calendar Section */}
            <div>
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={(d) => setSelectedDate(d)}
                availableDates={availableDates}
                onMonthChange={onMonthChange}
              />
            </div>

            {/* Time Slots Section */}
            <div>
              <TimeSlotSelector
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                timeSlots={timeSlots}
                loading={timeLoading}
              />
            </div>

            {/* Schedule Button */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Valor da sessão online
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {specialist.price}
                  </p>
                </div>
                <button
                  onClick={handleSchedule}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all"
                >
                  {isAuthenticated
                    ? "Confirmar agendamento"
                    : "Fazer login para agendar"}
                </button>
              </div>
              {!isAuthenticated && (
                <p className="text-sm text-gray-500 mt-2 text-center md:text-right">
                  Você precisa fazer login para agendar uma sessão
                </p>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                Avaliações ({reviewsMock.length})
              </h2>
              <div className="space-y-4">
                {reviewsMock.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>

            {/* Specialist Profile Section (visible on mobile) */}
            <div className="lg:hidden bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Sobre</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {about}
              </p>

              <h3 className="font-semibold mb-3">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {specialist.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    label={tag.label}
                    variant={index === 0 ? "green" : "blue"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer is provided by (public)/layout */}
    </>
  );
}
