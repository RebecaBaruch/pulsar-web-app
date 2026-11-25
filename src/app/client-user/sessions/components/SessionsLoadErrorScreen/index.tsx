"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type SessionsLoadErrorScreenProps = {
  onRetry?: () => void;
  detail?: string;
};

export default function SessionsLoadErrorScreen({
  onRetry,
  detail,
}: SessionsLoadErrorScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4"
      role="alert"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 md:h-20 md:w-20"
        aria-hidden
      >
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-2xl text-amber-600 md:text-3xl"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <div className="w-full">
          <h2 className="font-semibold text-gray-darkest md:text-lg">
            Não foi possível carregar suas sessões agora
          </h2>
          <p className="mt-1 text-xs text-gray-dark md:text-sm">
            {detail ??
              "Tente novamente em instantes. Se o problema continuar, entre em contato com o suporte."}
          </p>
        </div>
        {onRetry ? (
          <div className="w-fit">
            <PrimaryButton text="Tentar novamente" onClick={onRetry} />
          </div>
        ) : null}
      </div>
    </div>
  );
}