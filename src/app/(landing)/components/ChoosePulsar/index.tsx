"use client";

import React from "react";
import Image from "next/image";
import {
  faCertificate,
  faCircleNodes,
  faHeartPulse,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const data = [
  {
    icon: faHeartPulse,
    title: "Acolhimento humanizado",
    description:
      "Escuta qualificada e atenção individualizada para o seu bem-estar emocional e saúde mental.",
  },
  {
    icon: faCertificate,
    title: "Especialistas qualificados",
    description:
      "Equipe experiente com psicólogos, terapeutas e profissionais de saúde certificados.",
  },
  {
    icon: faCircleNodes,
    title: "Cuidado multidisciplinar",
    description:
      "Abordagem integrada combinando psicologia, nutrição, treino e saúde financeira.",
  },
  {
    icon: faShieldHalved,
    title: "Atendimento 100% seguro",
    description:
      "Plataforma digital com sigilo absoluto, criptografia e facilidade de agendamento online.",
  },
];

export default function ChoosePulsar() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 lg:px-16 lg:py-[64px] overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        {/* Bloco de Imagem com Badge Flutuante */}
        <div className="w-full md:flex-1 min-w-0 relative">
          <div className="relative w-full rounded-3xl">
            <Image
              src="/images/woman.svg"
              alt="Atendimento psicológico online com especialista Pulsar"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />

            {/* Float Card Azul (Responsivo e Integrado) */}
            <div className="absolute bottom-[-24px] left-3 right-3 sm:right-auto sm:max-w-xs bg-blue text-white p-3.5 sm:p-4 rounded-2xl shadow-lg backdrop-blur-sm bg-blue/95">
              <p className="text-xs sm:text-sm font-medium leading-snug">
                Acolhimento e escuta qualificada. Nosso{" "}
                <strong className="font-bold underline decoration-white/40">
                  atendimento 100% online
                </strong>{" "}
                facilita o seu cuidado onde estiver.
              </p>
            </div>
          </div>
        </div>

        {/* Bloco de Conteúdo */}
        <div className="w-full md:flex-1 min-w-0 text-left">
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-xs sm:text-sm text-blue font-semibold uppercase tracking-wider">
              Nosso diferencial
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black leading-tight">
              Por que escolher a Pulsar?
            </h2>
          </div>

          {/* Lista de Diferenciais */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 sm:gap-4 group"
              >
                {/* Ícone com Fundo Suave */}
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue/10 text-blue group-hover:bg-blue group-hover:text-white flex items-center justify-center transition-colors duration-300">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-sm sm:text-base"
                  />
                </div>

                {/* Texto do Diferencial */}
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="text-sm sm:text-base text-black font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
