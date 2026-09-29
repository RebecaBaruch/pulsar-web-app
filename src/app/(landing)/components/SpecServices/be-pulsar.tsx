import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";

export default function BePulsarContent() {
  return (
    <div
      className="
            flex flex-col md:flex-row md:items-center w-full gap-10
            md:gap-12 pt-[64px]
          "
    >
      <div className="md:flex-1 order-2 lg:order-1 flex flex-col gap-4 min-w-0 text-left text-dark">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Faça parte da rede Pulsar
        </h2>

        <p className="break-words text-sm sm:text-base text-gray-700 leading-relaxed">
          Na Pulsar, valorizamos o cuidado humano e integral. Junte-se à nossa
          rede multidisciplinar de saúde física, emocional, alimentar e
          financeira. Faça parte e impacte vidas com seu trabalho.
        </p>

        <div className="md:w-fit pt-2">
          <PrimaryButton
            text="Quero ser especialista Pulsar"
            onClick={() =>
              contactWhatsappUtil(
                "+55 11 97612-1123",
                "Olá! Tenho interesse em ser um especialista da Pulsar. Podemos conversar sobre?",
              )
            }
          />
        </div>
      </div>
      <div className="md:flex-1 order-1 lg:order-2 min-w-0 rounded-lg rounded-tl-4xl rounded-br-4xl overflow-hidden">
        <Image
          src="/images/team-image.jpg"
          alt="Imagem de equipe de especialistas da Pulsar"
          className="w-full h-auto object-contain"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
