import React from "react";

export default function About() {
  return (
    <section className="flex items-center w-full" id="about-section">
      <div
        className="
          lg:flex lg:justify-center lg:items-center
          mx-auto w-full max-w-[1440px] 2xl:rounded-xl bg-gray-lightest overflow-hidden 2xl:mb-15"
      >
        <div
          className="
            flex flex-col md:flex-row md:items-center min-w-0"
        >
          <div className="flex flex-col gap-4 md:gap-2 lg:gap-4 md:w-1/2 lg:w-1/2 min-w-0 text-left px-5 py-10 md:py-0 md:px-10 lg:px-15 xlg:px-70">
            <div className="flex flex-col w-full">
              <h2 className="text-lg md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-blue font-semibold">
                Por que existimos
              </h2>
              <h1 className="text-2xl md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl text-black font-semibold">
                Onde nasce o cuidado
              </h1>
            </div>
            <div className="flex flex-col gap-4 text-gray-dark text-sm md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
              <p>
                “A Pulsar nasceu da dor de perder meu pai, que enfrentava a
                dependência química e faleceu em uma clínica de reabilitação.
                Essa experiência revelou a ausência de tratamentos
                verdadeiramente humanos e integrados.
              </p>
              <p>
                Por isso, criamos um espaço onde o cuidado vai além do tempo
                marcado. Aqui, valorizamos a escuta, o acolhimento e a atuação
                multidisciplinar, respeitando a complexidade de cada história.
              </p>
              <p>
                Também acreditamos que profissionais felizes cuidam melhor, por
                isso, na Pulsar, quem cuida também é cuidado.
              </p>
            </div>
            <div className="flex flex-row gap-3 text-sm md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
              <div className="flex flex-col text-black max-w-md font-semibold">
                A Pulsar é sobre isso:
                <span className="text-blue text-md md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold">
                  humanidade, presença e verdade em cada atendimento.
                </span>
              </div>
              <img
                src="/images/quot.svg"
                alt="Quotation mark"
                className="w-20 md:w-10 lg:w-20 h-auto object-contain mt-2"
              />
            </div>
            <div className="flex flex-col justify-end text-right">
              <h1 className="text-sm md:text-xs lg:text-sm xl:text-base 2xl:text-lg text-black font-semibold">
                Alex Machado
              </h1>
              <p className="text-xs lg:text-sm xl:text-base 2xl:text-lg text-gray-dark font-italic">
                Psicólogo e um dos fundadores da Pulsar
              </p>
            </div>
          </div>

          <div className="md:w-1/2 lg:w-1/2 min-w-0 h-full">
            <img
              src="/images/alex-dog.svg"
              alt="Alex and his dog"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
