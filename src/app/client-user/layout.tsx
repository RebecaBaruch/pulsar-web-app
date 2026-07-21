"use client";

import { useEffect } from "react";
import LoggedNavBar from "@/components/NavBar/LoggedNavBar";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { useAuth } from "@/auth/useAuth";
import { Toaster } from "sonner";

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
      <div className="container mx-auto px-3 md:px-8 lg:px-12">{children}</div>
      <Toaster position="top-center" richColors />
    </>
  );
}
