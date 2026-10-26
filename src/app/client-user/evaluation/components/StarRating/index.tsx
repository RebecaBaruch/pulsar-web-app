"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div className="flex flex-col gap-2">
      <span className="block text-xs font-medium text-gray-700">Avaliação</span>
      <div
        className="flex items-center gap-2"
        role="radiogroup"
        aria-label="Nota da sessão"
        onMouseLeave={() => setHovered(0)}
      >
        {STAR_VALUES.map((starValue) => {
          const isActive = starValue <= active;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={value === starValue}
              aria-label={`Nota ${starValue} de 5`}
              onMouseEnter={() => setHovered(starValue)}
              onFocus={() => setHovered(starValue)}
              onBlur={() => setHovered(0)}
              onClick={() => onChange(starValue)}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded border text-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                isActive
                  ? "border-yellow bg-yellow-100 text-yellow"
                  : "border-gray-light bg-blue-lightest text-gray-300 hover:border-yellow/60 hover:bg-yellow-100/60 hover:text-yellow"
              }`}
            >
              <FontAwesomeIcon
                icon={isActive ? faStarSolid : faStarRegular}
                className={isActive ? "text-yellow" : "text-gray-300"}
              />
            </button>
          );
        })}
      </div>
      <p className="h-4 text-xs text-gray">
        {value > 0 ? `Sua nota: ${value} de 5` : "Selecione uma nota de 1 a 5"}
      </p>
    </div>
  );
}
