"use client";

import React, { JSX } from "react";

type ClientRegisterViewProps = {
  stepComponent: JSX.Element;
};

export default function ClientRegisterView({
  stepComponent,
}: ClientRegisterViewProps) {
  return (
    <section className="flex items-center w-full">
      <div
        className="
          flex flex-col gap-10 lg:justify-center lg:items-center
          mx-auto w-full max-w-[1440px] my-10 px-6 pt-6"
      >
        {stepComponent}
      </div>
    </section>
  );
}
