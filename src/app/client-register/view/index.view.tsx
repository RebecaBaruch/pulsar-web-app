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
          lg:flex lg:justify-center lg:items-center
          mx-auto w-full max-w-[1440px] 2xl:rounded-xl 2xl:mb-15"
      >
        {stepComponent}
      </div>
    </section>
  );
}
