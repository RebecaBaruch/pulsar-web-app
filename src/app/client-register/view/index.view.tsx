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
    <section className="flex flex-row w-screen h-screen">
      <div className="flex flex-row w-full h-full lg:p-0 lg:m-0">
        <div className="w-full lg:w-1/2 flex justify-center px-6 lg:px-12">
          <div className="flex flex-col items-center justify-start w-full max-w-lg pt-10 lg:max-w-md lg:p-0">
            <StepBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepTitles={stepTitles}
            />
            <div className="flex flex-col gap-15 mt-10">
              <img
                src="/images/horizontal-logo.png"
                alt="Logo da Pulsar"
                className="lg:w-[150px] w-[150px]"
              />
              {stepComponent}
            </div>
          </div>
        </div>
        <div className="flex flex-row hidden lg:block w-full max-w-1/2 lg:h-full"></div>
      </div>
    </section>
  );
}
