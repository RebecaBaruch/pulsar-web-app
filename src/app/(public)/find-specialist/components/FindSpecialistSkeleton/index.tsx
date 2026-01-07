"use client";

import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function FindSpecialistSkeleton({ length }: { length: number }) {
  return (
    <div className="flex flex-col justify-start gap-2 w-screen max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
      <div className="flex flex-col justify-start items-start w-full p-10 gap-4">
        <Skeleton className="w-[30%] h-8 rounded-xl" />
        <div className="flex flex-row justify-between w-full">
          <Skeleton className="w-[15%] h-4 rounded-xl" />
          <div className="flex flex-row justify-between w-[25%] gap-4">
            <Skeleton className="w-1/2 h-8 rounded-xl" />
            <Skeleton className="w-1/2 h-8 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="w-full px-10 mt-8 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length }).map((_, i) => (
          <Skeleton key={i} className="w-full h-64" />
        ))}
      </div>
    </div>
  );
}
