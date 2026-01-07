import React from "react";

export default function BePulsarContent() {
  return (
    <div
      className="
            flex flex-col md:flex-row md:items-center gap-10
            md:gap-10 gap-5 px-6 lg:px-25
          "
    >
      <div className="md:flex-1 order-2 lg:order-1 min-w-0 text-left">
        <h1 className="mb-2 text-lg lg:text-xl text-black font-semibold">
          Faça parte da rede Pulsar
        </h1>

        <p className="text-black break-words text-sm md:text-md">
          Se você é um profissional comprometido com o cuidado humano e acredita
          em um atendimento acolhedor, colaborativo e integral, a Pulsar é o seu
          lugar. Junte-se a uma rede multidisciplinar que valoriza o bem-estar
          em todas as suas dimensões — física emocional, alimentar e financeira.
          Entre em contato e compartilhe seu conhecimento com quem busca apoio
          de verdade.
        </p>

        <button className="mt-6 inline-block rounded-full bg-green px-5 py-3 text-sm md:text-md  text-black font-semibold hover:bg-green-mid cursor-pointer">
          Quero ser especialista Pulsar
        </button>
      </div>
      <div className="md:flex-1 order-1 lg:order-2 min-w-0">
        <img
          src="/images/be-pulsar.png"
          alt="Happy family"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
