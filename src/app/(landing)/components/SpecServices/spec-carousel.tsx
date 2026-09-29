"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SpecCard from "./spec-card";

// Importações dos Ícones FontAwesome (Solid)
import {
  faComments,
  faStethoscope,
  faHandHoldingHeart,
  faDumbbell,
  faAppleWhole,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type SpecData = {
  icon: IconProp;
  title: string;
  introDescription: string;
  description: string;
  href: string;
};

const data: SpecData[] = [
  {
    icon: faComments,
    title: "Psicólogos",
    introDescription: "Psicoterapia e saúde emocional.",
    description:
      "Acolhimento profissional para ansiedade, autoestima e superar desafios diários.",
    href: "/",
  },
  {
    icon: faStethoscope,
    title: "Psiquiatra",
    introDescription: "Cuidado clínico e saúde mental.",
    description:
      "Tratamento especializado para insônia, crises de ansiedade e depressão.",
    href: "/",
  },
  {
    icon: faHandHoldingHeart,
    title: "Terapeuta",
    introDescription: "Autoconhecimento e equilíbrio.",
    description:
      "Acompanhamento terapêutico para desenvolvimento pessoal e bem-estar.",
    href: "/",
  },
  {
    icon: faDumbbell,
    title: "Educador físico",
    introDescription: "Exercícios e vida saudável.",
    description:
      "Orientação profissional para inserir treinos com segurança na sua rotina.",
    href: "/",
  },
  {
    icon: faAppleWhole,
    title: "Nutricionista",
    introDescription: "Plano alimentar personalizado.",
    description:
      "Nutrição equilibrada respeitando seus objetivos e relação com a comida.",
    href: "/",
  },
  {
    icon: faChartLine,
    title: "Assessor financeiro",
    introDescription: "Planejamento e clareza financeira.",
    description:
      "Apoio para organizar suas finanças, definir metas e ter tranquilidade.",
    href: "/",
  },
];

export default function SpecCarousel() {
  return (
    <section className="w-full">
      {/* Mobile: Swiper Carousel */}
      <div className="block md:hidden overflow-visible">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1.2}
          spaceBetween={16}
          centeredSlides={false}
          pagination={{ el: ".custom-pagination", clickable: true }}
          className="!overflow-visible py-2"
        >
          {data.map((item, idx) => (
            <SwiperSlide key={idx} className="!h-auto">
              <SpecCard
                icon={item.icon}
                title={item.title}
                introDescription={item.introDescription}
                description={item.description}
                href={item.href}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-4 flex justify-center" />
      </div>

      {/* Desktop / Tablet: Grid de 3 colunas */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6 items-stretch">
        {data.map((item, index) => (
          <SpecCard
            key={index}
            icon={item.icon}
            title={item.title}
            introDescription={item.introDescription}
            description={item.description}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}