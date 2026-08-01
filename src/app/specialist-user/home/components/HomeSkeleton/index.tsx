"use client";

import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function HomeSkeleton() {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-7 w-48 bg-gray-200" />
        <Skeleton className="h-4 w-72 bg-gray-200" />
      </div>

      <Skeleton className="w-full h-45 bg-gray-200" />

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Skeleton className="h-70 w-full bg-gray-200"/>
        <Skeleton className="h-70 w-full bg-gray-200"/>
      </div>
    </div>
  );
}