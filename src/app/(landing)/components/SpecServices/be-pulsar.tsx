import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";

export default function BePulsarContent() {
  return (
    <div
      className="
            flex flex-col md:flex-row md:items-center w-full gap-10
            md:gap-10 gap-5
          "
    >
      <div className="md:flex-1 order-2 lg:order-1 flex flex-col gap-4 min-w-0 text-left">
        <h1 className="text-base lg:text-3xl text-black font-semibold">
          Faça parte da rede Pulsar
        </h1>

        <p className="text-black break-words text-sm lg:text-base">
          Na Pulsar, valorizamos o cuidado humano e integral. Junte-se à nossa
          rede multidisciplinar de saúde física, emocional, alimentar e
          financeira. Faça parte e impacte vidas com seu trabalho.
        </p>

        <div className="w-fit">
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
      <div className="md:flex-1 order-1 lg:order-2 min-w-0">
        <Image
          src="/images/be-pulsar.png"
          alt="Happy family"
          className="w-full h-auto object-contain"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
