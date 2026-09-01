import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function LandingPageSkeleton() {
  return (
    <div className="overflow-x-hidden bg-white">
      <section className="w-full max-w-[1280px] mx-auto px-4 py-10 lg:px-16 lg:py-[32px]">
        <Skeleton className="p-6 py-12 lg:p-18 h-[70dvh] max-w-[1440px]" />
        <div className="flex flex-col md:flex-row gap-16 space-between w-full mt-[32px] md:mt-[64px]">
          <Skeleton className="w-full h-120" />
          <div className="flex flex-col gap-4 w-full">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-full h-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
