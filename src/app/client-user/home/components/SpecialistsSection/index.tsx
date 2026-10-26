"use client";

import React from "react";
import { SpecialistCard } from "../SpecialistCard";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import LinkButton from "@/components/LinkButton";
import { RoutesUrls } from "@/utils/enum/routes-url";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faComments,
  faStethoscope,
  faHandHoldingHeart,
  faDumbbell,
  faAppleWhole,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

// extract the type of the icon prop from the Icon component
type IconNameType = IconProp;

const specialists: Array<{ title: string; icon: IconNameType; href: string }> =
  [
    { title: "Psicólogo", icon: faComments, href: "/" },
    { title: "Psiquiatra", icon: faStethoscope, href: "/" },
    { title: "Terapeuta", icon: faHandHoldingHeart, href: "/" },
    { title: "Educador Físico", icon: faDumbbell, href: "/" },
    { title: "Nutricionista", icon: faAppleWhole, href: "/" },
    { title: "Assessor Financeiro", icon: faChartLine, href: "/" },
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
