"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SpecialistSidebar from "@/components/NavBar/SpecialistSidebar";
import SpecialistHeader from "@/components/SpecialistHeader";
import { useAuth } from "@/auth/useAuth";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function SpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "SPECIALIST")) {
      router.replace(RoutesUrls.LOGIN);
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "SPECIALIST") {
    return null;
  }
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 lg:flex-row">
      <div className="flex w-full shrink-0 flex-row items-center bg-white shadow-sm lg:h-screen lg:w-52 lg:flex-col lg:shadow-none">
        <SpecialistSidebar />
      </div>

      <div className="flex min-h-0 flex-1 flex-col min-w-0 lg:min-h-screen">
        <SpecialistHeader />
        <main className="flex-1 overflow-auto bg-white p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
