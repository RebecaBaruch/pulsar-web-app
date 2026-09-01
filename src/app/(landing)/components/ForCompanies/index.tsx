"use client";

import React from "react";
import Image from "next/image";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";

export default function ForCompanies() {
  const handleWhatsappClick = () => {
    contactWhatsappUtil(
      "+55 11 97612-1123",
      "Olá! Gostaria de saber mais sobre a Pulsar para empresas. Podemos conversar?",
    );
  };

  return (
    <section className="w-full bg-blue-lightest px-4 py-10 lg:px-16 lg:py-[64px]">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Coluna de Imagem (Primeiro no mobile se preferir, ou invertida) */}
          <div className="order-1 lg:order-2 w-full">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/images/alex-monica.svg"
                alt="Profissionais da Pulsar - Alex e Mônica"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Coluna de Conteúdo */}
          <div className="order-2 lg:order-1 flex flex-col items-start gap-4 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm text-blue font-semibold uppercase tracking-wider block">
                Soluções Corporativas
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                Saúde mental e bem-estar para a sua empresa
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Promova a saúde mental no ambiente de trabalho com a Pulsar.
              Oferecemos atendimento psicológico online e programas
              personalizados para fortalecer o bem-estar, o engajamento e a
              produtividade do seu time.
            </p>

            <p className="text-sm sm:text-base font-semibold text-blue leading-snug">
              Fale conosco e leve esse cuidado para os seus colaboradores.
            </p>

            <div className="w-full sm:w-auto pt-2">
              <PrimaryButton
                icon={faWhatsapp}
                text="Conversar pelo WhatsApp"
                onClick={handleWhatsappClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
