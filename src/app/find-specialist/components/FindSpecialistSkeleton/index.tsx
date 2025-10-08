"use client";

import React from "react";
import { Skeleton } from "@/components/skeleton";

export default function FindSpecialistSkeleton({ length }: { length: number }) {
  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-900 mb-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4">
          <Skeleton className="h-8 w-24 rounded-md" />

          <div className="hidden md:flex space-x-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="hidden md:flex space-x-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="md:hidden">
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
        </div>
      </nav>

      <div className="flex items-center w-full px-10">
        <Skeleton className="w-full h-38 md:h-38 lg:h-60 rounded-xl" />
      </div>

      <div className="w-full px-10 mt-8 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length }).map((_, i) => (
          <Skeleton key={i} className="w-full h-64" />
        ))}
      </div>
    </>
  );
}
