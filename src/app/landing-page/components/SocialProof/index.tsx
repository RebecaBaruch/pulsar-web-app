import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TestimonyCard from "./testimony-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    title: "“Acolhimento de verdade”",
    description:
      "“A Pulsar me acolheu num dos momentos mais difíceis da minha vida. A terapeuta foi essencial para meu processo de cura”",
    profilePic: "/images/testimony1.png",
    author: "Amanda Torres",
    authorBio: "Designer Gráfica",
  },
  {
    title: "“Me senti ouvido e respeitado”",
    description:
      "“O atendimento foi humanizado do início ao fim. Me senti respeitado, ouvido e bem orientado. Recomendo de olhos fechados!”",
    profilePic: "/images/testimony1.png",
    author: "Carlos Henrique",
    authorBio: "Professor de História",
  },
  {
    title: "“Cuidado integral que transforma”",
    description:
      "“Consegui entender melhor meus limites. A abordagem integrada com psicóloga e nutricionista fez toda a diferença pra mim.”",
    profilePic: "/images/testimony1.png",
    author: "Renata Lopes",
    authorBio: "Empreendedora",
  },
  {
    title: "“Profissionais incríveis”",
    description:
      "“Cada especialista que me atendeu na Pulsar foi incrível. Senti que estavam realmente comprometidos com meu bem-estar.”",
    profilePic: "/images/testimony1.png",
    author: "Paulo Silva",
    authorBio: "Advogado",
  },
  {
    title: "“Ajudou a alcançar meu sonho”",
    description:
      "“A Pulsar transformou minha vida. O suporte emocional que recebi me ajudou a superar desafios e encontrar um novo propósito.”",
    profilePic: "/images/testimony1.png",
    author: "Mariana Costa",
    authorBio: "Psicóloga",
  },
];

export default function SocialProof() {
  return (
    <section className="w-full bg-blue ">
      <div
        className="
          flex flex-col justify-center items-center
          mx-auto max-w-[1440px] px-3 lg:px-25"
      >
        <div
          className="
            flex flex-col justify-center items-center gap-4 min-w-0 w-full py-20"
        >
          <div className="flex flex-col w-full justify-center items-center text-center gap-2">
            <h2 className="text-lg lg:text-base text-white font-semibold">
              O que dizem sobre nós
            </h2>
            <h1 className="text-4xl text-white font-semibold">
              Vozes que Pulsam com a Gente
            </h1>
            <p className="text-white">
              Veja como ajudamos pessoas a viverem com mais leveza, saúde
              emocional e propósito.
            </p>
          </div>
          <div className="w-full mt-8">
            <div className="flex flex-row justify-between gap-4 items-center h-fit">
              <button className="swiper-button-prev-custom flex items-center justify-center w-3 h-3 md:w-5 md:h-5 bg-green text-black p-3 rounded-full">
                <FontAwesomeIcon icon={faChevronLeft} size="xs" />
              </button>
              <Swiper
                loop={true}
                grabCursor={true}
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={12}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 18,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 18,
                  },
                  1188: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="flex justify-between w-full h-[400px] sm:h-[280px] md:h-[250px]"
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
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
              <button className="swiper-button-next-custom flex items-center justify-center w-3 h-3 md:w-5 md:h-5 bg-green text-black p-3 rounded-full">
                <FontAwesomeIcon icon={faChevronRight} size="xs" />
              </button>
            </div>
            <div className="swiper-pagination-bullet-active custom-pagination mt-4 flex justify-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
