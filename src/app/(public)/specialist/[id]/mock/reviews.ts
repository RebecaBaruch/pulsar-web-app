import { Review } from "../types";

export const reviewsMock: Review[] = [
  {
    id: "1",
    userName: "Amanda Torres",
    userAvatar: "/images/avatar1.png",
    rating: 5.0,
    date: "Há 2 semanas",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac tincidunt odio.",
  },
  {
    id: "2",
    userName: "Carlos Harrison",
    userAvatar: "/images/avatar2.png",
    rating: 4.5,
    date: "Há 1 mês",
    comment:
      "Excelente profissional, muito atencioso e me ajudou muito nas sessões. Recomendo!",
  },
  {
    id: "3",
    userName: "Mariana Silva",
    userAvatar: "/images/avatar3.png",
    rating: 5.0,
    date: "Há 2 meses",
    comment: "Profissional incrível! Me sinto muito melhor após as consultas.",
  },
];
