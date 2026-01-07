"use client";

import { useEffect } from "react";
import LoggedNavBar from "@/components/NavBar/LoggedNavBar";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useAuth } from "@/auth/useAuth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "CLIENT")) {
      router.replace(RoutesUrls.USER_TYPE);
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <>
      <LoggedNavBar />
      {children}
    </>
  );
}
