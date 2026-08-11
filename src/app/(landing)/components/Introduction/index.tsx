"use client";
import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function Introduction() {
  const router = useRouter();
  return (
    <section className="max-auto lg:max-w-[1280px] p-4 lg:p-[64px]">
      <div>
        <div
          className="
            flex flex-col md:flex-row md:items-center
            md:gap-10 gap-5
          "
        >
          <div className="md:flex-1 min-w-0">
            <Image
              src="/images/happy-people.png"
              alt="Happy family"
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="md:flex-1/8 lg:flex-1 flex flex-col gap-4 min-w-0 text-left">
            <h1 className="mb-2 text-2xl lg:text-4xl text-black font-semibold">
              <span className="text-blue">Cuidar de você</span> é o nosso ponto
              de partida
            </h1>

            <p className="text-black break-words text-sm lg:text-base">
              Na Pulsar, você é cuidado de forma integral.
              <span className="font-semibold"> Criamos um espaço onde </span>
              <span className="font-semibold text-blue">
                {" "}
                corpo, mente e emoções caminham juntos.
              </span>{" "}
              Aqui, você encontra apoio para viver com mais leveza, equilíbrio e
              propósito — no seu tempo, do seu jeito.
              <span className="font-semibold text-blue">
                {" "}
                Dê agora o primeiro passo nessa jornada de cuidado.
              </span>
            </p>

            <div className="w-fit">
              <PrimaryButton
                text="Agendar com um especialista"
                onClick={() => router.replace(RoutesUrls.FIND_SPECIALIST)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
