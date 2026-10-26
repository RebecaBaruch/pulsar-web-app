"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import TextareaField from "@/components/TextareaField";
import SpecialistSummary from "../components/SpecialistSummary";
import StarRating from "../components/StarRating";
import { EvaluationFormValues, EvaluationSpecialist } from "../types";

type EvaluationViewProps = {
  specialist: EvaluationSpecialist | null;
  submitting?: boolean;
  onSubmit: (values: EvaluationFormValues) => void;
  onCancel: () => void;
  onGoHome: () => void;
};

export default function EvaluationView({
  specialist,
  submitting = false,
  onSubmit,
  onCancel,
  onGoHome,
}: EvaluationViewProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating < 1 || submitting) return;
    onSubmit({ rating, comment: comment.trim() });
  };

  return (
    <section className="flex min-h-screen w-full justify-center overflow-x-hidden pt-10 pb-10">
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700"
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faStar} className="text-sm" />
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-gray-darkest">
              Avalie o especialista
            </h1>
            <p className="text-sm text-gray-500">
              Deixe o seu feedback! A sua opinião é muito importante pra gente.
            </p>
          </div>
        </div>

        {!specialist ? (
          <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray">
              Não encontramos a sessão para avaliar. Abra a avaliação a partir
              da notificação no sino.
            </p>
            <PrimaryButton text="Voltar para a home" onClick={onGoHome} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-5"
          >
            <SpecialistSummary specialist={specialist} />

            <StarRating value={rating} onChange={setRating} />

            <TextareaField
              label="Como foi a sua experiência? (Opcional)"
              placeholder="Descreva aqui"
              value={comment}
              onChange={setComment}
              maxLength={500}
              rows={4}
              enableRichText={false}
            />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:w-40">
                <SecondaryButton
                  text="Cancelar"
                  onClick={onCancel}
                  isDisabled={submitting}
                />
              </div>
              <div className="w-full sm:w-48">
                <PrimaryButton
                  type="submit"
                  text={submitting ? "Enviando..." : "Avaliar"}
                  icon={faStar}
                  isDisabled={rating === 0 || submitting}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
