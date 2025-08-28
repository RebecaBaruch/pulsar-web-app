import React from "react";

export default function HeroSection() {
  return (
    <section
      className="
        w-screen 
        p-4 
        h-auto md:h-[80vh]
      "
    >
      <div
        className="
          p-6
          py-12
          lg:p-18
          h-full
          max-w-[1440px] mx-auto
          bg-cover
          bg-center
          bg-no-repeat
          bg-[url('/images/hero-mobile.png')]
          md:bg-[url('/images/hero-desktop.png')]
          flex
          flex-col md:flex-row
          justify-start
          items-start md:items-center
          rounded-xl
          overflow-hidden
        "
      >
        {/* Imagem - Mobile vem primeiro */}
        <div className="relative flex-1 w-full order-1 md:order-2 mb-6 md:mb-0">
          <img
            src="/images/hero-image-desktop.png"
            alt="Hero"
            className="mx-auto md:absolute md:right-[15px] md:top-1/2 md:-translate-y-1/2 md:max-w-[500px]"
          />
        </div>

        {/* Texto - Mobile vem depois */}
        <div className="z-10 sm:w-full md:w-[55%] order-2 md:order-1 text-left">
          <h1 className="text-2xl font-bold text-white sm:text-4xl">
            Mais que psicologia, cuidado completo
          </h1>
          <p className="mt-2 text-sm text-white">
            Na Pulsar, você encontra apoio emocional, físico e financeiro com
            profissionais qualificados e humanos.
          </p>
          <button className="mt-6 inline-block rounded-full bg-green-400 px-4 py-3 text-sm text-[#0F1417] font-semibold hover:bg-green-500">
            Comece sua jornada
          </button>
        </div>
      </div>
    </section>
  );
}
