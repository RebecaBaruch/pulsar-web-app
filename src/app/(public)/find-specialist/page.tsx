import React, { Suspense } from "react";
import FindSpecialistController from "./controller/index.controller";
import FindSpecialistSkeleton from "./components/FindSpecialistSkeleton";

export default function FindSpecialistPage() {
  return (
    <Suspense fallback={<FindSpecialistSkeleton length={6} />}>
      <FindSpecialistController />
    </Suspense>
  );
}