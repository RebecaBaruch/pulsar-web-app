import React from "react";
import { Skeleton } from "@/components/Skeleton";

export const ScheduleSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-[100vh] w-full gap-4 md:gap-8 overflow-hidden overscroll-none">
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 md:gap-6">
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-28 md:h-8 md:w-36" />
            <Skeleton className="h-4 w-48 md:w-64" />
          </div>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-4 w-full">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="w-full h-full">
          <div className="hidden md:flex flex-row items-center justify-between gap-4 mb-6 w-full">
            <Skeleton className="h-9 w-40" />
            <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-12" />
                <Skeleton className="h-9 w-12"/>
                <Skeleton className="h-9 w-18" />
            </div>
          </div>

          <div className="h-full md:h-60 w-full">
            <Skeleton className="h-full w-full" />
          </div>

        </div>
      </div>
    </div>
  );
};