import React, { Suspense } from "react";
import ResetPasswordController from "../controller/index.controller";

type ResetPasswordTokenPageProps = {
  params: Promise<{ token: string }>;
};

export default async function ResetPasswordTokenPage({
  params,
}: ResetPasswordTokenPageProps) {
  const { token } = await params;

  return (
    <Suspense fallback={null}>
      <ResetPasswordController tokenFromPath={token} />
    </Suspense>
  );
}
