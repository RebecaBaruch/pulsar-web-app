"use client";

import { useEffect, useState } from "react";
import LoggedNavBar from "@/components/NavBar/LoggedNavBar";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default function SpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && (!user || user.role !== "SPECIALIST")) {
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
