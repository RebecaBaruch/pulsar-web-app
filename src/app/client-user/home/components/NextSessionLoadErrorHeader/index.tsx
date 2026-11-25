"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type NextSessionLoadErrorHeaderProps = {
  onRetry?: () => void;
  detail?: string;
};

const DEFAULT_DETAIL =
  "Tente novamente em instantes. Se o problema continuar, entre em contato com o suporte.";

export default function NextSessionLoadErrorHeader({
  onRetry,
  detail,
}: NextSessionLoadErrorHeaderProps) {
  return (
    <div
      className="flex w-full flex-row items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 md:items-center md:gap-6 md:rounded-lg md:p-6"
      role="alert"
    >
      <div
        className="order-2 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full bg-amber-100 md:order-1 md:h-15 md:w-15"
        aria-hidden
      >
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-2xl text-amber-600"
        />
      </div>

      <div className="order-1 flex min-w-0 flex-1 flex-col gap-2 text-left md:order-2 md:gap-1">
        <div>
          <h2 className="text-sm font-semibold leading-tight text-gray-darkest md:text-base">
            Não foi possível carregar sua próxima sessão agora
          </h2>
          <p className="mt-0.5 text-xs leading-snug text-gray-dark md:mt-1 md:text-sm">
            {detail ?? DEFAULT_DETAIL}
          </p>
        </div>

        {onRetry ? (
          <div className="md:hidden">
            <PrimaryButton
              text="Tentar novamente"
              size="compact"
              fullWidth={false}
              onClick={onRetry}
            />
          </div>
        ) : null}
      </div>

      {onRetry ? (
        <div className="order-3 hidden w-auto shrink-0 md:block md:min-w-[12.5rem]">
          <PrimaryButton text="Tentar novamente" onClick={onRetry} />
        </div>
      ) : null}
    </div>
  );
}