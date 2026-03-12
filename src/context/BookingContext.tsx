"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type BookingDetails = {
  specialistId: string;
  specialistName: string;
  specialistRole: string;
  specialistPhotoUrl: string;
  appointmentDate: string;
  appointmentTime: string;
  timeZone: string;
};

interface BookingContextProps {
  booking: BookingDetails | null;
  setBooking: (details: BookingDetails | null) => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(
  undefined,
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
