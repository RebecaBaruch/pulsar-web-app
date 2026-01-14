"use client";

import React from "react";
import SpecialistInfo from "../components/SpecialistInfo";
import BookingCard from "../components/BookingCard";
import { SpecialistDetailsViewProps } from "../types";
import ReviewSection from "../components/ReviewSection";
import InfoDetailsSection from "../components/InfoDetailsSection";

export default function SpecialistDetailsView({
  loading,
  specialist,
  bookingCard,
  reviews,
}: SpecialistDetailsViewProps) {
  if (loading || !specialist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <section className="flex w-full overflow-x-hidden min-h-screen justify-center items-start pt-8">
      <div className="flex flex-col gap-12 w-full max-w-[1000px] mx-auto">
        <div className="w-full flex flex-col md:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left Column - Profile Info */}
          <div className="md:flex-1/2 lg:flex-3/5">
            <SpecialistInfo specialist={specialist} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="md:flex-1/2 lg:flex-2/5 w-full md:h-full flex flex-col justify-between gap-6 bg-white md:shadow-md rounded-md md:p-4">
            <BookingCard {...bookingCard} />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="w-full">
          <ReviewSection reviews={reviews} />
        </div>

        {/* InfoDetailsSection */}
        <InfoDetailsSection {...specialist} />
      </div>
      {/* Footer is provided by (public)/layout */}
    </section>
  );
}
