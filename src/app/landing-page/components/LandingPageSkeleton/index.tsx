import React from "react";
import { Skeleton } from "@/components/skeleton";

export default function LandingPageSkeleton() {
  return (
    <div className="overflow-x-hidden">
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

      <section className="w-full h-[70dvh] px-4 h-auto md:h-[70dvh]">
        <div
          className="
            p-6 py-12 lg:p-18 h-[70dvh] max-w-[1440px] mx-auto
            flex flex-col md:flex-row justify-start items-start md:items-center
            rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800
          "
        ></div>
      </section>
    </div>
  );
}
