import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function LandingPageSkeleton() {
  return (
    <div className="overflow-x-hidden bg-white">
      <section className="w-full h-[70dvh] px-4 h-auto md:h-[70dvh]">
        <div
          className="
            p-6 py-12 lg:p-18 h-[70dvh] max-w-[1440px] mx-auto
            flex flex-col md:flex-row justify-start items-start md:items-center
            rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-light
          "
        ></div>
      </section>
    </div>
  );
}
