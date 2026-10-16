"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LandingPageView from "../view/index.view";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function LandingPageController() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && user?.role === "SPECIALIST") {
      router.replace(RoutesUrls.SPECIALIST_HOME);
    }
  }, [user, loading, router]);

  if (loading || user?.role === "SPECIALIST") {
    return null;
  }

  return <LandingPageView />;
}
