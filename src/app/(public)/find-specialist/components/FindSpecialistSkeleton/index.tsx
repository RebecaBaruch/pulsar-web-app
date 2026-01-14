"use client";

import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function FindSpecialistSkeleton({ length }: { length: number }) {
  return (
    <div className="flex flex-col justify-start gap-2 w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-0">
      <div className="flex flex-col justify-start items-start w-full py-6 gap-4">
        <Skeleton className="w-[45%] h-8 rounded-xl" />
        <div className="flex flex-row justify-between w-full items-center">
          <Skeleton className="w-[25%] h-4 rounded-xl" />
          <div className="flex flex-row items-center gap-4">
            <Skeleton className="w-28 h-8 rounded-full" />
            <Skeleton className="w-28 h-8 rounded-full" />
          </div>
        </div>
      </div>

      <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length }).map((_, i) => (
          <Skeleton key={i} className="w-full h-64" />
        ))}
      </div>
    </div>
  );
}
