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
    <section className="flex flex-row w-screen min-h-screen justify-center md:items-start lg:items-center m-0 p-0 md:py-6 lg:p-0">
      <div
        className={`hidden ${currentStep === 1 ? "lg:block" : "lg:hidden"} lg:w-1/2 h-screen bg-blue rounded-r-2xl`}
      ></div>

      <div
        className={`w-full h-full ${currentStep === 1 ? "lg:w-1/2" : "lg:w-1/3"} flex justify-center md:items-center md:my-6 px-6 lg:px-0`}
      >
        <div
          className={`flex flex-col items-center justify-start w-full h-full max-w-lg pt-10 lg:bg-white md:rounded-xl ${currentStep === 1 ? "md:shadow-0 lg:max-w-lg" : "lg:shadow-md lg:max-w-2xl"} md:h-auto lg:p-6`}
        >
          <StepBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitles={stepTitles}
          />
          <div className="flex flex-col gap-15 md:gap-8 mt-10 md:mt-0 w-full">
            <img
              src="/images/horizontal-logo.png"
              alt="Logo da Pulsar"
              className="lg:w-[150px] w-[150px]"
            />
            {stepComponent}
          </div>
        </div>
      </div>
    </section>
  );
}
