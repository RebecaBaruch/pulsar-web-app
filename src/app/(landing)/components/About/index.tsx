"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 lg:px-16 lg:py-[64px]">
      <div className="w-full bg-gray-50 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Conteúdo de Texto / História */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-12 text-left">
            <div>
              {/* Tag + Título */}
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-xs sm:text-sm text-blue font-semibold uppercase tracking-wider">
                  Por que existimos
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black leading-tight">
                  Onde nasce o cuidado
                </h2>
              </div>

              {/* Depoimento / História Enxuta */}
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                <p>
                  “A Pulsar nasceu após a perda do meu pai para a dependência
                  química. Essa dor revelou a escassez de tratamentos integrados
                  e verdadeiramente empáticos na saúde mental.
                </p>
                <p>
                  Criamos um espaço onde o acolhimento vai além da consulta.
                  Valorizamos a escuta, o cuidado multidisciplinar e o bem-estar
                  de quem atende, porque quem cuida também precisa ser cuidado.”
                </p>
              </div>

              {/* Destaque / Manifesto */}
              <div className="mt-6 pl-4 border-l-4 border-blue bg-blue/5 py-3 pr-3 rounded-r-xl">
                <p className="text-sm sm:text-base text-black font-semibold">
                  A Pulsar é sobre isso:{" "}
                  <span className="text-blue">
                    humanidade, presença e verdade em cada atendimento.
                  </span>
                </p>
              </div>
            </div>

            {/* Assinatura */}
            <div className="pt-6 border-t border-gray-200/60 flex flex-col items-start mt-8">
              <span className="text-sm sm:text-base font-bold text-black">
                Alex Machado
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                Psicólogo e cofundador da Pulsar
              </span>
            </div>
          </div>

          {/* Imagem Lateral / Inferior */}
          <div className="flex-1 relative min-h-[320px] sm:min-h-[400px] lg:min-h-[auto] w-full">
            <Image
              src="/images/alex-dog.svg"
              alt="Alex Machado, psicólogo e cofundador da Pulsar, com seu cão de assistência"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
