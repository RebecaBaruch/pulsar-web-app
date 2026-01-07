import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function HomeSkeleton() {
  return (
    <section className="flex w-screen overflow-x-hidden min-h-screen justify-center lg:items-center pt-16 pb-10">
      <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex flex-col gap-10 w-full">
          {/* Header skeleton */}
          <Skeleton className="h-12 w-64" />

          {/* Next session header skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* My sessions skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Specialists section skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
