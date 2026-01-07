"use client";

import React from "react";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && user) {
      router.replace(
        user.role === "CLIENT"
          ? RoutesUrls.CLIENT_HOME
          : RoutesUrls.SPECIALIST_HOME
      );
    }
  }, [user, loading]);

  if (loading || user) return null;

  return <>{children}</>;
}
