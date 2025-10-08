import React from "react";

import SpecCarousel from "./spec-carousel";
import BePulsarContent from "./be-pulsar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function SpecServices() {
  return (
    <section className="w-full bg-blue-lightest" id="specs-section">
      <div
        className="
          flex flex-col gap-15
          mx-auto max-w-[1440px] pt-10 pb-10
        "
      >
        <div className="flex flex-col items-center text-center px-6">
          <h1 className="text-3xl lg:text-4xl font-semibold text-black text-center">
            Cada pessoa é única.{" "}
            <span className="text-blue">Nossos serviços também.</span>
          </h1>
          <Link href={"https://wa.me/+5511976121123"}>
            <button className="mt-6 inline-block rounded-full border-2 border-blue px-4 py-3 text-sm text-blue font-semibold hover:bg-blue hover:text-white transition-colors cursor-pointer">
              Ver catálogo de especialistas <FontAwesomeIcon icon={faWhatsapp} />
            </button>
          </Link>
        </div>

        <SpecCarousel />
        <BePulsarContent />
      </div>
    </section>
  );
}
