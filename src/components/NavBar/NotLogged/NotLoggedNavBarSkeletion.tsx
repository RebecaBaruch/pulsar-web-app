import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function NotLoggedNavBarSkeleton() {
  return (
    <nav className="w-full bg-white mb-6">
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
  );
}
