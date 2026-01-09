"use client";

import React from "react";
import { SpecialistCard } from "../SpecialistCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const specialists = [
  { title: "Psicólogo", icon: "psycho", href: "/" },
  { title: "Terapeuta", icon: "therapist", href: "/" },
  { title: "Educador Físico", icon: "physical-educ", href: "/" },
  { title: "Nutricionista", icon: "nutritionist", href: "/" },
  { title: "Assessor Financeiro", icon: "financial-advisor", href: "/" },
  { title: "Psiquiatra", icon: "psychi", href: "/" },
];

export default function SpecialistsSection() {
  return (
    <section className="flex flex-col items-start w-full">
      <header className="flex flex-col w-full md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="font-semibold text-base">Encontre o que você precisa</h2>
        <a
          href="/"
          className="hidden md:flex flex-row gap-1 justify-center items-center text-xs text-primary text-blue font-medium underline hover:text-blue-dark"
        >
          <span className="w-fit whitespace-nowrap">
            Todos os especialistas
          </span>
          <FontAwesomeIcon icon={faChevronRight} size='xs' />
        </a>
      </header>

      <div className="flex gap-3 overflow-x-auto w-full lg:hidden pb-2">
        {specialists.map((item) => (
          <SpecialistCard key={item.title} {...item} />
        ))}
      </div>
      <a
        href="/"
        className="md:hidden flex flex-row gap-1 justify-center items-center mt-2 text-xs text-primary text-blue font-medium underline hover:text-blue-dark"
      >
        <span className="w-fit whitespace-nowrap">Todos os especialistas</span>
        <FontAwesomeIcon icon={faChevronRight} size='xs' />
      </a>

      <div className="hidden lg:grid lg:grid-cols-6 gap-3">
        {specialists.map((item) => (
          <SpecialistCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
