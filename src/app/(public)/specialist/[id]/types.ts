import { SpecialistType } from "@/app/(public)/find-specialist/components/SpecialistCard/type";
export interface SpecialistDetails {
  name: string;
  role: string;
  crm: string;
  location: string;
  rating: number;
  reviews: number;
  badges: { label: string }[];
  price: string;
  imgSrc: string;
  about?: string;
  specialties?: string[];
  education?: string[];
  experience?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export type BookingCardProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  onMonthChange?: (date: Date) => void;
  availableDates?: string[];
  timeSlots?: string[];
  timeLoading?: boolean;
  isAuthenticated: boolean;
  onSchedule: () => void;
}

export interface SpecialistDetailsViewProps {
  loading: boolean;
  specialist: SpecialistType | null;
  bookingCard: BookingCardProps;
  reviews: Review[];
  showLoginModal: boolean;
  onCloseLoginModal: () => void;
}