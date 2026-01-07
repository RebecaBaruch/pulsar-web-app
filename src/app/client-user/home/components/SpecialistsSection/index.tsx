"use client";

import React from "react";
import { SpecialistCard } from "../SpecialistCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const specialists = [
  { title: "Psicólogo", image: "/images/psychologist.png", href: "/" },
  { title: "Terapeuta", image: "/images/therapist.png", href: "/" },
  {
    title: "Educador Físico",
    image: "/images/physical-educator.png",
    href: "/",
  },
  { title: "Nutricionista", image: "/images/nutritionist.png", href: "/" },
  {
    title: "Assessor Financeiro",
    image: "/images/financial-advisor.png",
    href: "/",
  },
];

export default function SpecialistsSection() {
  return (
    <section className="flex flex-col items-start w-full">
      <header className="flex flex-col w-full md:flex-row justify-between items-start mb-6">
        <h2 className="font-semibold text-lg">Encontre o que você precisa</h2>
        <a
          href="/"
          className="hidden md:flex flex-row gap-2 justify-center items-center text-sm text-primary text-blue font-medium hover:underline"
        >
          <span className="w-fit whitespace-nowrap">
            Todos os especialistas
          </span>
          <FontAwesomeIcon icon={faChevronRight} className="w-16" />
        </a>
      </header>

      <div className="flex gap-4 overflow-x-auto w-full lg:hidden pb-2">
        {specialists.map((item) => (
          <SpecialistCard key={item.title} {...item} />
        ))}
      </div>
      <a
        href="/"
        className="flex md:hidden flex-row gap-2 h-fit justify-center items-center text-sm text-primary text-blue font-medium hover:underline mt-4"
      >
        <span className="w-fit whitespace-nowrap">Todos os especialistas</span>
        <FontAwesomeIcon icon={faChevronRight} className="w-16" />
      </a>

      <div className="hidden lg:grid lg:grid-cols-5 gap-4">
        {specialists.map((item) => (
          <SpecialistCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
