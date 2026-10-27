"use client";

import React from "react";
import { toast } from "sonner";
import Home from "../view/index.view";
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import { fetchClientSessions } from "../../services/clientUserApi";
import type { NextSessionCardProps } from "../../sessions/components/NextSessionsList/NextSessionCard";
import { daysUntil } from "@/utils/sessionSchedule";

export default function HomeController() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sessionsLoading, setSessionsLoading] = React.useState(true);
  const [nextSession, setNextSession] =
    React.useState<NextSessionCardProps | null>(null);

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace(RoutesUrls.LOGIN);
    }
  }, [loading, user, router]);

  React.useEffect(() => {
    if (loading || !user) return;

    let cancelled = false;

    (async () => {
      try {
        const data = await fetchClientSessions();
        if (cancelled) return;
        setNextSession(data.nextSessions[0] ?? null);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar sua próxima sessão.");
        }
      } finally {
        if (!cancelled) setSessionsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, user]);

  if (loading) return <Home loading={true} />;

  const nextSessionMeta = nextSession
    ? {
        profilePictureUrl: nextSession.profilePic,
        name: nextSession.specialistName,
        description: `${nextSession.specialistType} • ${nextSession.credentialCode}`,
        phoneNumber: nextSession.specialistWpp,
        daysCount: daysUntil(
          nextSession.startTimeIso ?? nextSession.sessionDate,
        ),
        sessionDate: nextSession.sessionDate,
        sessionTime: nextSession.sessionTime,
      }
    : null;

  return (
    <Home
      userName={user?.name}
      sessionsLoading={sessionsLoading}
      nextSession={nextSessionMeta}
    />
  );
}
