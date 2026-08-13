"use client";

import React from "react";
import { SpecialistCard } from "../SpecialistCard";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import LinkButton from "@/components/LinkButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import Icon from "@/components/Icons";

// extract the type of the icon prop from the Icon component
type IconNameType = React.ComponentProps<typeof Icon>["name"];

const specialists: Array<{ title: string; icon: IconNameType; href: string }> =
  [
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
        <div className="hidden md:flex">
          <LinkButton
            href={RoutesUrls.FIND_SPECIALIST}
            text="Todos os especialistas"
            icon={faChevronRight}
          />
        </div>
      </header>

      <div className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full lg:hidden pb-2">
        {specialists.map((item) => (
          <SpecialistCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>

      <div className="md:hidden mt-4 w-full flex justify-end">
        <LinkButton
          href={RoutesUrls.FIND_SPECIALIST}
          text="Todos os especialistas"
          icon={faChevronRight}
        />
      </div>

      <div className="hidden lg:grid lg:grid-cols-6 gap-3">
        {specialists.map((item) => (
          <SpecialistCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
