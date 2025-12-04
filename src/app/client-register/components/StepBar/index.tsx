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
    <div className="w-full mb-8">
      <div className="w-full h-1.5 bg-gray-200 relative rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: progressWidth }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mb-2 text-right">
        Etapa {activeIndex} de {totalCountedSteps}
      </p>
    </div>
  );
}
