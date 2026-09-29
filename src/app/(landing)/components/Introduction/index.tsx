"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function Introduction() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(RoutesUrls.FIND_SPECIALIST);
  };

  return (
    <section className="w-full bg-white py-10 lg:py-[64px]">
      <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full">
            <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-w-[540px] mx-auto">
              <Image
                src="/images/happy-people.svg"
                alt="Família sorrindo unida representando o cuidado integral da Pulsar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
              <span className="text-blue">Cuidar de você</span> é o nosso ponto
              de partida
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Na Pulsar, você é cuidado de forma integral.{" "}
              <span className="font-semibold text-gray-900">
                Criamos um espaço onde{" "}
              </span>
              <span className="font-semibold text-blue">
                corpo, mente e emoções caminham juntos.
              </span>{" "}
              Aqui, você encontra apoio para viver com mais leveza, equilíbrio e
              propósito — no seu tempo, do seu jeito.{" "}
              <span className="font-semibold text-blue block mt-2">
                Dê agora o primeiro passo nessa jornada de cuidado.
              </span>
            </p>

            <div className="w-full sm:w-auto pt-2">
              <PrimaryButton
                text="Agendar com um especialista"
                onClick={handleNavigation}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
