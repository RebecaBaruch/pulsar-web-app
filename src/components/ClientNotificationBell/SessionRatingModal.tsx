"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

type SessionRatingModalProps = {
  professionalName: string;
  onClose: () => void;
  onSubmit: (rating: number) => void;
};

const STAR_VALUES = [1, 2, 3, 4, 5];

export default function SessionRatingModal({
  professionalName,
  onClose,
  onSubmit,
}: SessionRatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const active = hovered || rating;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const modal = (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-rating-title"
        className="relative w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 cursor-pointer rounded p-1 text-gray hover:bg-gray-100 hover:text-gray-darkest"
          aria-label="Fechar avaliação"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h3
          id="session-rating-title"
          className="pr-6 text-lg font-semibold text-gray-darkest"
        >
          Como foi sua sessão?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray">
          Avalie sua sessão com{" "}
          <span className="font-semibold text-gray-darkest">
            {professionalName}
          </span>
          . O que achou do trabalho dele?
        </p>

        <div
          className="mt-5 flex items-center justify-center gap-1"
          role="radiogroup"
          aria-label="Nota da sessão"
          onMouseLeave={() => setHovered(0)}
        >
          {STAR_VALUES.map((value) => {
            const isActive = value <= active;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`Nota ${value} de 5`}
                className="cursor-pointer rounded p-1.5 text-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                onMouseEnter={() => setHovered(value)}
                onClick={() => setRating(value)}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  className={isActive ? "text-yellow" : "text-gray-300"}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-1 h-4 text-center text-xs text-gray">
          {rating > 0 ? `Sua nota: ${rating} de 5` : ""}
        </p>

        <div className="mt-4">
          <PrimaryButton
            text="Enviar avaliação"
            onClick={() => onSubmit(rating)}
            isDisabled={rating === 0}
            icon={faStar}
          />
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
