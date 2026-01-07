import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SpecCard from "./spec-card";

const data = [
  {
    icon: "/icons/psycho.svg",
    title: "Psicólogos",
    introDescription: "Cuidando da sua saúde emocional.",
    description:
      "Acolhimento e escuta profissional para lidar com ansiedade, autoestima, traumas e outros desafios da vida.",
    href: "/",
  },
  {
    icon: "/icons/psychi.svg",
    title: "Psiquiatra",
    introDescription: "Tratamento com olhar clínico e humano.",
    description:
      "Psiquiatria para entender e cuidar de questões como insônia, crises de ansiedade e mais.",
    href: "/",
  },
  {
    icon: "/icons/therapist.svg",
    title: "Terapeuta",
    introDescription: "Autoconhecimento.",
    description:
      "Acompanhamento terapêutico para promover equilíbrio, desenvolvimento pessoal e bem-estar emocional.",
    href: "/",
  },
  {
    icon: "/icons/physical-educ.svg",
    title: "Educador físico",
    introDescription: "Movimento com propósito e saúde.",
    description:
      "Orientação profissional para inserir atividade física de forma segura e consciente na sua rotina.",
    href: "/",
  },
  {
    icon: "/icons/nutritionist.svg",
    title: "Nutricionista",
    introDescription: "Alimentação equilibrada para o seu dia a dia.",
    description:
      "Plano alimentar personalizado respeitando seu corpo, necessidades e relação com a comida.",
    href: "/",
  },
  {
    icon: "/icons/financial-advisor.svg",
    title: "Assessor financeiro",
    introDescription: "Bem-estar também é ter clareza financeira.",
    description:
      "Apoio para organizar suas finanças, traçar metas e lidar com o dinheiro com mais tranquilidade.",
    href: "/",
  },
];

export default function SpecCarousel() {
  return (
    <>
      <div className="block md:hidden overflow-visible">
        <div className="pl-6">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.15}
            spaceBetween={12}
            centeredSlides={false}
            pagination={{ el: ".custom-pagination", clickable: true }}
            className="!overflow-visible py-2"
          >
            {data.map((item, idx) => (
              <SwiperSlide key={idx} className="!w-auto">
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
      </div>

      <div className="hidden px-10 lg:px-25 md:grid md:grid-cols-3 md:gap-6">
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
    </>
  );
}
