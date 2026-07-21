import React from "react";
import { Skeleton } from "@/components/Skeleton";

export const ScheduleSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-4 md:gap-8">
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 md:gap-6">
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-28 md:h-8 md:w-36" />
            <Skeleton className="h-4 w-48 md:w-64" />
          </div>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-4 w-full">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>

        <div className="w-full">
          <div className="hidden md:flex flex-row items-center justify-between gap-4 mb-6 w-full">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-16 rounded-xl" />
              <div className="flex gap-1">
                <Skeleton className="h-9 w-9 rounded-xl" />
                <Skeleton className="h-9 w-9 rounded-xl" />
              </div>
              <Skeleton className="h-6 w-40 ml-2" />
            </div>

            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>

          <div className="border border-slate-100 rounded-2xl p-4 bg-white shadow-sm flex flex-col gap-4 w-full">
            <div className="grid grid-cols-7 gap-2 border-b border-slate-100 pb-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {[...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7 gap-2 items-center">
                  {rowIndex === 1 ? (
                    <>
                      <Skeleton className="h-12 w-full rounded-xl col-span-2" />
                      <Skeleton className="h-12 w-full rounded-xl col-span-3" />
                      <Skeleton className="h-12 w-full rounded-xl col-span-2" />
                    </>
                  ) : (
                    [...Array(7)].map((_, colIndex) => (
                      <Skeleton key={colIndex} className="h-14 w-full rounded-xl" />
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};