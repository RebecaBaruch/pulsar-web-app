import { SpecialistType } from "@/app/(public)/find-specialist/components/SpecialistCard/type";
import Badge from "@/components/Badge";
import React from "react";

export default function InfoDetailsSection(specialist: SpecialistType) {
  return (
    <div className="flex flex-col w-full gap-2 md:gap-4 mb-2">
      <h2 className="text-lg font-bold">Perfil do especialista</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full order-2 md:order-1 md:flex-3/7 flex flex-col gap-8 md:gap-6 bg-white md:shadow-md rounded-md md:p-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-gray-darkest font-semibold">Abordagem</h3>
            <div className="flex flex-row gap-2 flex-wrap">
              {specialist.approach.map((approach, index) => (
                <Badge
                  key={index}
                  label={approach.label}
                  variant={index === 0 ? "black" : "gray"}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-gray-darkest font-semibold">Especialidades</h3>
            <div className="flex flex-row gap-2 flex-wrap">
              {specialist.specialties.map((specialty, index) => (
                <Badge key={index} label={specialty.label} variant="gray" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-gray-darkest font-semibold">Formação</h3>
            <ul className="flex flex-row gap-2 flex-wrap">
              {specialist.education.map((educationItem, index) => (
                <li key={index} className="text-sm text-gray-dark list-disc list-inside">
                  {educationItem}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full order-1 md:order-2 md:flex-4/7 bg-white">
          <h3 className="text-base text-gray-darkest font-semibold mb-2 md:mb-4">Descrição Pessoal</h3>
          <p className="text-sm text-gray-dark">
            {specialist.personalDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
