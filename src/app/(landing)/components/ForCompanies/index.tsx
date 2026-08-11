import React from "react";
import Image from "next/image";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { contactWhatsappUtil } from "@/utils/contact-whatsapp";

export default function ForCompanies() {
  return (
    <section className="max-auto lg:max-w-[1280px] w-full p-4 lg:p-[64px] bg-blue-lightest py-10">
      <div className="flex flex-col justify-center items-center md:flex-row md:items-center gap-10 md:gap-10 gap-5">
        <div className=" order-2 flex flex-col gap-4 w-full lg:order-1 min-w-0 text-left">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl lg:text-3xl text-black font-semibold">
              Leve a Pulsar para a sua empresa
            </h1>

            <p className="text-black break-words text-sm md:text-base">
              Invista no bem-estar dos seus colaboradores com a Pulsar.
              Oferecemos parcerias para empresas que valorizam a saúde mental no
              ambiente corporativo. Com atendimentos online, programas
              personalizados e profissionais qualificados, ajudamos a construir
              equipes mais equilibradas, engajadas e produtivas.
            </p>

            <span className="text-blue font-semibold break-words text-sm md:text-base">
              Fale com a gente e descubra como levar esse cuidado para o seu
              time.
            </span>
          </div>

          <div className="w-fit">
            <PrimaryButton
              icon={faWhatsapp}
              text="Quero conversar por WhatsApp"
              onClick={() =>
                contactWhatsappUtil(
                  "+55 11 97612-1123",
                  "Olá! Gostaria de saber mais sobre a Pulsar para empresas. Podemos conversar?",
                )
              }
            />
          </div>
        </div>
        <div className="order-1 w-full md:w-1/2 lg:order-2">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <Image
              src="/images/alex-monica.svg"
              alt="Alex e Mônica"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
