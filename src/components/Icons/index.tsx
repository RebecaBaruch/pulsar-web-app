"use client";

import React from "react";

export type IconName =
  | "psycho"
  | "therapist"
  | "physical-educ"
  | "nutritionist"
  | "financial-advisor"
  | "psychi";

export default function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const map: Record<IconName, string> = {
    psycho: "psychologist-blue.svg",
    therapist: "therapist-blue.svg",
    "physical-educ": "phisycal-blue.svg",
    nutritionist: "nutri-blue.svg",
    "financial-advisor": "financial-blue.svg",
    psychi: "psychi-blue.svg",
  };

  const src = `/icons/${map[name]}`;
  return <img src={src} alt={name} className={className} />;
}
