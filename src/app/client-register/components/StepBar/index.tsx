// src/app/register/components/SimpleStepBar.tsx

"use client";

import React from "react";

type SimpleStepBarProps = {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
};

export default function SimpleStepBar({
  currentStep,
  totalSteps,
  stepTitles,
}: SimpleStepBarProps) {
  const firstVisibleStep = 2;
  const lastVisibleStep = 5;
  const totalCountedSteps = 4;

  const activeIndex =
    currentStep >= firstVisibleStep ? currentStep - firstVisibleStep + 1 : 0;

  const progressWidth = `${(activeIndex / totalCountedSteps) * 100}%`;

  if (currentStep < firstVisibleStep || currentStep > lastVisibleStep) {
    return null;
  }

  return (
    <div className="mb-4 w-full">
      <div className="relative h-1 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: progressWidth }}
        />
      </div>
      <p className="mb-1 mt-1.5 text-right text-xs text-gray-500">
        Etapa {activeIndex} de {totalCountedSteps}
      </p>
    </div>
  );
}
