"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SpecialistSidebar from "@/components/NavBar/SpecialistSidebar";
import NotificationBell from "@/components/NotificationBell";
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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
      <div className="flex flex-row lg:flex-col justify-between items-center w-full lg:w-52 bg-white shadow-sm lg:shadow-none flex-shrink-0">
        <SpecialistSidebar />
        <div className="lg:hidden px-3">
          <NotificationBell />
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 overflow-auto bg-white p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
