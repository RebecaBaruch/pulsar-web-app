import Link from "next/link";
import React from "react";

export default function Introduction() {
  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto max-w-[1440px]
          px-6 lg:px-25 py-15
        "
      >
        <div
          className="
            flex flex-col md:flex-row md:items-center
            md:gap-10 gap-5
          "
        >
          <div className="md:flex-1 min-w-0">
            <img
              src="/images/happy-people.png"
              alt="Happy family"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="md:flex-1/8 lg:flex-1 min-w-0 text-left">
            <h1 className="mb-2 text-2xl lg:text-4xl text-black font-semibold">
              <span className="text-blue">Cuidar de você</span> é o nosso ponto
              de partida
            </h1>

            <p className="text-black break-words text-sm  lg:text-base">
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

            {/* <Link href={"https://wa.me/+5511976121123"}>
              <button className="mt-6 inline-block rounded-full bg-blue px-5 py-3 text-sm md:text-xs lg:text-sm text-white font-semibold hover:bg-blue-dark cursor-pointer">
                Ver catálogo de especialistas
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
