"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { notifySessionReviewSubmitted } from "@/components/ClientNotificationBell/events";
import EvaluationView from "../view/index.view";
import { EvaluationFormValues } from "../types";
import { specialistFromSearchParams } from "../utils/query";

function EvaluationControllerInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = React.useState(false);

  const specialist = React.useMemo(
    () => specialistFromSearchParams(searchParams),
    [searchParams],
  );

  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push(RoutesUrls.CLIENT_HOME);
  };

  const handleGoHome = () => {
    router.push(RoutesUrls.CLIENT_HOME);
  };

  const handleSubmit = (values: EvaluationFormValues) => {
    if (values.rating < 1 || submitting) return;

    setSubmitting(true);

    window.setTimeout(() => {
      if (specialist?.notificationId) {
        notifySessionReviewSubmitted(specialist.notificationId);
      }
      toast.success("Avaliação enviada");
      router.push(RoutesUrls.CLIENT_SESSIONS);
    }, 400);
  };

  return (
    <EvaluationView
      specialist={specialist}
      submitting={submitting}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onGoHome={handleGoHome}
    />
  );
}

export default function EvaluationController() {
  return (
    <Suspense fallback={null}>
      <EvaluationControllerInner />
    </Suspense>
  );
}
