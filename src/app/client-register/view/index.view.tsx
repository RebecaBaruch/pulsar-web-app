"use client";

import React, { JSX } from "react";
import StepBar from "../components/StepBar";

type ClientRegisterViewProps = {
  stepComponent: JSX.Element;
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
};

export default function ClientRegisterView({
  stepComponent,
  currentStep,
  totalSteps,
  stepTitles,
}: ClientRegisterViewProps) {
  return (
    <section className="flex w-screen min-h-screen justify-center lg:items-start pt-8">
      <div className="mx-auto flex w-full flex-col p-4 lg:max-w-[440px] lg:py-10 gap-8">
        <img
          src="/images/horizontal-logo.png"
          alt="Logo da Pulsar"
          className="w-[100px]"
        />

        <div className="flex flex-col gap-6">
          <StepBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitles={stepTitles}
          />
          {stepComponent}
        </div>
      </div>
    </section>
  );
}
