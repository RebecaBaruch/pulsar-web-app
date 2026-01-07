"use client";

import React from "react";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && user) {
      // Redirect logged-in users to their appropriate home page
      router.replace(
        user.role === "CLIENT"
          ? RoutesUrls.CLIENT_HOME
          : RoutesUrls.SPECIALIST_HOME
      );
    }
  }, [user, loading, router]);

  // Don't render auth pages if user is already logged in
  if (loading || user) return null;

  return <>{children}</>;
}
