"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "swiper/css/pagination";

import TestimonyCard from "./testimony-card";

const data = [
  {
    title: "Acolhimento humanizado",
    description:
      "A Pulsar me acolheu no momento mais difícil. A terapia online foi essencial para a minha saúde mental e recuperação.",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    author: "Amanda Torres",
    authorBio: "Designer Gráfica",
  },
  {
    title: "Escuta e respeito",
    description:
      "Atendimento atencioso do início ao fim. Me senti seguro, respeitado e muito bem orientado. Recomendo de olhos fechados!",
    profilePic: "https://randomuser.me/api/portraits/men/46.jpg",
    author: "Carlos Henrique",
    authorBio: "Professor",
  },
  {
    title: "Saúde integrada",
    description:
      "A abordagem combinando psicologia e nutrição transformou minha rotina. Consegui entender meus limites e viver melhor.",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    author: "Renata Lopes",
    authorBio: "Empreendedora",
  },
  {
    title: "Equipe comprometida",
    description:
      "Especialistas altamente qualificados e atenciosos. Senti um alinhamento genuíno com o meu bem-estar emocional.",
    profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
    author: "Paulo Silva",
    authorBio: "Advogado",
  },
  {
    title: "Transformação real",
    description:
      "O suporte terapêutico me ajudou a superar desafios e encontrar um novo equilíbrio pessoal e profissional.",
    profilePic: "https://randomuser.me/api/portraits/women/48.jpg",
    author: "Mariana Costa",
    authorBio: "Psicóloga",
  },
];

export default function SocialProof() {
  return (
    <section className="w-full bg-blue px-4 py-10 lg:px-16 lg:py-[64px] overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wider">
            O que dizem sobre nós
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold leading-tight">
            Vozes que pulsam com a gente
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            Depoimentos de quem transformou a saúde emocional e o bem-estar com
            o nosso atendimento.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative w-full">
          {/* Botão Anterior (Apenas Desktop) */}
          <button
            aria-label="Depoimento anterior"
            className="swiper-button-prev-custom hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 bg-green text-black hover:bg-green-dark rounded-full shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </button>

          <Swiper
            loop={true}
            grabCursor={true}
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="w-full pb-2"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="h-auto flex">
                <TestimonyCard
                  title={item.title}
                  description={item.description}
                  profilePic={item.profilePic}
                  author={item.author}
                  authorBio={item.authorBio}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botão Próximo (Apenas Desktop) */}
          <button
            aria-label="Próximo depoimento"
            className="swiper-button-next-custom hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 bg-green text-black hover:bg-green-dark rounded-full shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </button>

          {/* Paginação Dots Customizada */}
          <div className="custom-swiper-pagination flex justify-center gap-1.5 mt-6 [&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet-active]:!bg-green [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:rounded-full" />
        </div>
      </div>
    </section>
  );
}
