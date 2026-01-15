import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function SpecialistDetailsSkeleton() {
  return (
    <section className="flex w-full min-h-screen justify-center items-start pt-8">
      <div className="flex flex-col gap-12 w-full max-w-[1000px] mx-auto">

        {/* Top section */}
        <div className="w-full flex flex-col md:flex-row gap-16">

          {/* Left column – SpecialistInfo */}
          <div className="md:flex-3/5 flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <Skeleton className="w-20 h-20 rounded-md" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Right column – BookingCard */}
          <div className="md:flex-2/5 w-full bg-white rounded-md md:p-4 flex flex-col gap-6">
            <Skeleton className="h-4 w-1/2" />

            <div className="flex gap-6">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Reviews section */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-40" />

          <div className="flex gap-4">
            <Skeleton className="h-32 w-full md:w-[350px]" />
            <Skeleton className="h-32 w-full md:w-[350px]" />
          </div>
        </div>

        {/* InfoDetailsSection */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>

      </div>
    </section>
  );
}
