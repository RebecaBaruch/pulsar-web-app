import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function ForCompanies() {
  return (
    <section className="w-full bg-blue-lightest py-10">
      <div
        className="
            flex flex-col justify-center items-center md:flex-row mx-auto max-w-[1440px] md:items-center gap-10
            md:gap-10 gap-5 px-6 lg:px-25
          "
      >
        <div className=" order-2 w-full lg:order-1 min-w-0 text-left">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl lg:text-2xl text-black font-semibold">
              Leve a Pulsar para a sua empresa
            </h1>

            <p className="text-black break-words text-sm md:text-base">
              Invista no bem-estar dos seus colaboradores com a
              Pulsar. Oferecemos parcerias para empresas que valorizam a saúde
              mental no ambiente corporativo. Com atendimentos online, programas
              personalizados e profissionais qualificados, ajudamos a construir
              equipes mais equilibradas, engajadas e produtivas.
            </p>

            <span className="text-blue font-semibold break-words text-sm md:text-base">
              Fale com a gente e descubra como levar esse cuidado para o seu
              time.
            </span>
          </div>

          <Link href="/">
            <button className="flex flex-row gap-4 items-center mt-6 rounded-full bg-green px-4 py-3 text-sm md:text-xs lg:text-sm text-black font-semibold hover:bg-green-mid cursor-pointer">
              Quero ser especialista Pulsar
              <FontAwesomeIcon icon={faWhatsapp} />
            </button>
          </Link>
        </div>
        <div className="order-1 lg:order-2 min-w-0">
          <img
            src="/images/alex-monica.svg"
            alt="Alex and Mônica"
            className="w-[700px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
