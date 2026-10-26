"use client";

import React from "react";
import Image from "next/image";
import { EvaluationSpecialist } from "../../types";

type SpecialistSummaryProps = {
  specialist: EvaluationSpecialist;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function SpecialistSummary({
  specialist,
}: SpecialistSummaryProps) {
  const subtitle = [specialist.role, specialist.credentialCode]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="flex items-center gap-3 rounded-lg bg-blue-100 p-4">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white">
        {specialist.photoUrl ? (
          <Image
            src={specialist.photoUrl}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xs font-bold text-blue">
            {getInitials(specialist.name)}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <h2 className="text-sm font-semibold text-gray-darkest">
          {specialist.name}
        </h2>
        {subtitle ? (
          <p className="text-xs text-gray">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
