"use client";

import React from "react";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { usePathname, useRouter } from "next/navigation";

const RECOVERY_ROUTES = [
  RoutesUrls.FORGOT_PASSWORD,
  RoutesUrls.RESET_PASSWORD,
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isRecoveryRoute = RECOVERY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  React.useEffect(() => {
    if (!loading && user && !isRecoveryRoute) {
      router.replace(
        user.role === "CLIENT"
          ? RoutesUrls.CLIENT_HOME
          : RoutesUrls.SPECIALIST_HOME,
      );
    }
  }, [user, loading, router, isRecoveryRoute]);

  if (loading || (user && !isRecoveryRoute)) return null;

  return <>{children}</>;
}
