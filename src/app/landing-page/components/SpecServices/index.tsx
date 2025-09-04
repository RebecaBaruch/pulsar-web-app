import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SpecCarousel from "./spec-carousel";
import BePulsarContent from "./be-pulsar";

export default function SpecServices() {
  return (
    <section className="w-full bg-blue-lightest">
      <div
        className="
          flex flex-col gap-15
          mx-auto max-w-[1440px] py-20
        "
      >
        <div className="flex flex-col items-center text-center px-6">
          <h1 className="text-3xl lg:text-4xl font-semibold text-black text-center">
            Cada pessoa é única.{" "}
            <span className="text-blue">Nossos serviços também.</span>
          </h1>
          <button className="mt-6 inline-block rounded-full border-2 border-blue px-4 py-3 text-sm text-blue font-semibold hover:bg-blue hover:text-white transition-colors cursor-pointer">
            Ver todos os especialistas
          </button>
        </div>

        <SpecCarousel />
        <BePulsarContent />
      </div>
    </section>
  );
}
