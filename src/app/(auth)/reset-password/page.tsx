import React, { Suspense } from "react";
import ResetPasswordController from "./controller/index.controller";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordController />
    </Suspense>
  );
}