"use client";

import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function LoginUserTypeSkeleton() {
  return (
    <div className="flex flex-col w-full md:w-full lg:w-fit gap-15 md:gap-8 lg:gap-10 xl:gap-12">
      <Skeleton className="w-[150px] h-10" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="flex flex-col gap-6 w-110">
        <Skeleton className="w-full h-24 rounded-full" />
        <Skeleton className="w-full h-24 rounded-full" />
      </div>
    </div>
  );
}
