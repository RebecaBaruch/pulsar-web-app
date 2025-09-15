import { faCertificate, faCircleNodes, faHeartPulse, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const data = [
  {
    icon: <FontAwesomeIcon icon={faHeartPulse} />,
    title: "Acolhimento e empatia",
    description:
      "Cuidamos de cada pessoa com empatia e atenção individualizada, criando um ambiente acolhedor e seguro.",
  },
  {
    icon: <FontAwesomeIcon icon={faCertificate} />,
    title: "Profissionais Especializados",
    description:
      "Nossa equipe é composta por psicólogos, terapeutas e especialistas altamente qualificados e atualizados.",
  },
  {
    icon: <FontAwesomeIcon icon={faCircleNodes} />,
    title: "Abordagem Integrada",
    description:
      "Tratamos o ser humano de forma completa, integrando psicologia, nutrição, educação física e saúde financeira para seu bem-estar.",
  },
  {
    icon: <FontAwesomeIcon icon={faShieldHalved} />,
    title: "Tecnologia e Confidencialidade",
    description:
      "Utilizamos ferramentas digitais modernas para agendar, acompanhar e proteger seus dados com total sigilo e segurança.",
  },
];

export default function ChoosePulsar() {
  return (
    <section className="w-full">
      <div
        className="
          mx-auto max-w-[1440px]
          px-6 lg:px-25 py-10
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
              src="/images/woman.svg"
              alt="Blond woman"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="md:flex-1/8 lg:flex-1 min-w-0 text-left">
            <div className="flex flex-col mb-4">
              <h2 className="text-sm text-blue font-semibold">
                Nosso diferencial
              </h2>
              <h1 className="text-2xl text-black font-semibold">
                Por que escolher a Pulsar?
              </h1>
            </div>

            <div className="flex flex-col gap-4">
              {data.map((item, index) => (
                <div key={index} className="flex flex-row items-start gap-4">
                  <div className="flex justify-center bg-blue rounded-full w-8 h-8 p-2 text-white text-sm">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-2text-left">
                    <h1 className="text-base text-black font-semibold">
                      {item.title}
                    </h1>
                    <p className="text-sm text-gray-dark">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
