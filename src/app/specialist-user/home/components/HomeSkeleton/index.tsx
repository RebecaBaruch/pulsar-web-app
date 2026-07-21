"use client";

import React from "react";

export default function HomeSkeleton() {
  return (
    <div className="flex flex-col w-full gap-8 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="h-7 w-48 bg-gray-200 rounded-md" />
        <div className="h-4 w-72 bg-gray-200 rounded-md" />
      </div>

      <div className="w-full h-40 bg-gray-200 rounded-xl" />

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1 h-[340px] bg-gray-200 rounded-xl" />
        <div className="flex-1 h-[340px] bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}