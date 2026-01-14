
export type SpecialistType = {
  name: string;
  role: string;
  crm: string;
  location: string;
  rating: number;
  specialties: { label: string }[];
  reviews: number;
  approach: { label: string}[];
  price: string;
  imgSrc: string;
  about?: string;
  education: string[];
  personalDescription: string;
};