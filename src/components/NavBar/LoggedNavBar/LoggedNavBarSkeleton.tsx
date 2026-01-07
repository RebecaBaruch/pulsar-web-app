import React from "react";
import { Skeleton } from "@/components/Skeleton";

export default function LoggedNavBarSkeleton() {
  return (
    <div className="w-screen p-7 border-b border-gray-300">
      <nav className="w-full max-w-[1440px] mx-auto px-10 flex flex-row justify-between items-center flex-wrap">
        {/* Logo skeleton */}
        <Skeleton className="h-8 w-28" />

        {/* Mobile menu button skeleton */}
        <Skeleton className="lg:hidden h-6 w-6" />

        {/* Desktop navigation links skeleton */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-6 list-none p-0 m-0">
          <li>
            <Skeleton className="h-4 w-16" />
          </li>
          <li>
            <Skeleton className="h-4 w-24" />
          </li>
          <li>
            <Skeleton className="h-4 w-16" />
          </li>
        </ul>

        {/* Desktop icons skeleton */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-6 list-none p-0 m-0">
          <li>
            <Skeleton className="h-5 w-5 rounded-full" />
          </li>
          <li>
            <Skeleton className="h-5 w-5 rounded-full" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
