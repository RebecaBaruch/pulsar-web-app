"use client";

import React from "react";
import Home from "../view/index.view";
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function HomeController() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace(RoutesUrls.LOGIN);
    }
  }, [loading, user, router]);

  if (loading) return <Home loading={true} />;

  return <Home userName={user?.name} />;
}
