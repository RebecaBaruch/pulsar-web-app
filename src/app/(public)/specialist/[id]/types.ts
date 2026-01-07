export interface SpecialistDetails {
  name: string;
  role: string;
  crm: string;
  location: string;
  rating: number;
  reviews: number;
  tags: { label: string }[];
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
