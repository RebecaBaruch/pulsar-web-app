"use client";

import React, { JSX } from "react";
import StepBar from "../components/StepBar";
import Image from "next/image";

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
  const isWelcomeStep = currentStep === 1;

  return (
    <section className="flex min-h-screen w-full justify-center pt-6 sm:pt-8">
      <div
        className={`mx-auto flex w-full flex-col px-4 sm:px-6 ${
          isWelcomeStep ? "max-w-[350px] lg:max-w-[350px]" : "max-w-lg lg:max-w-xl"
        }`}
      >
        <div className="flex w-full flex-col md:rounded-xl md:bg-white lg:p-6 lg:shadow-md">
          <StepBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitles={stepTitles}
          />
          <div className="mt-4 flex w-full flex-col gap-6 sm:gap-8 md:mt-0">
            <Image
              src="/images/horizontal-logo.png"
              alt="Logo da Pulsar"
              width={100}
              height={33}
              className="h-auto w-[100px]"
            />
            {stepComponent}
          </div>
        </div>
      </div>
    </section>
  );
}
