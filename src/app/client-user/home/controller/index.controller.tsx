"use client";

import React from "react";
import Home from "../view/index.view";
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";
import {
  ClientUserApiError,
  fetchClientSessions,
} from "../../services/clientUserApi";
import type { NextSessionCardProps } from "../../sessions/components/NextSessionsList/NextSessionCard";
import { daysUntil } from "@/utils/sessionSchedule";
import { getFirstName } from "@/utils/timeGreeting";

const LOAD_ERROR_FALLBACK =
  "Tente novamente em instantes. Se o problema continuar, entre em contato com o suporte.";

/** Listagem indisponível no backend: na home tratamos como “sem próxima sessão”. */
function isSessionsListUnavailable(error: unknown): boolean {
  return error instanceof ClientUserApiError && error.status === 503;
}

export default function HomeController() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sessionsLoading, setSessionsLoading] = React.useState(true);
  const [sessionsLoadError, setSessionsLoadError] = React.useState<
    string | null
  >(null);
  const [retryCount, setRetryCount] = React.useState(0);
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
      setSessionsLoading(true);
      try {
        const data = await fetchClientSessions();
        if (cancelled) return;
        setSessionsLoadError(null);
        setNextSession(data.nextSessions[0] ?? null);
      } catch (error) {
        if (cancelled) return;
        if (
          error instanceof ClientUserApiError &&
          (error.status === 401 || error.status === 403)
        ) {
          return;
        }
        setNextSession(null);
        if (isSessionsListUnavailable(error)) {
          setSessionsLoadError(null);
        } else {
          setSessionsLoadError(
            error instanceof ClientUserApiError
              ? error.message
              : LOAD_ERROR_FALLBACK,
          );
        }
      } finally {
        if (!cancelled) setSessionsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, user, retryCount]);

  const handleRetrySessions = React.useCallback(() => {
    setSessionsLoadError(null);
    setRetryCount((n) => n + 1);
  }, []);

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
      userName={getFirstName(user?.name, "você")}
      sessionsLoading={sessionsLoading}
      sessionsLoadError={sessionsLoadError}
      onRetrySessions={handleRetrySessions}
      nextSession={nextSessionMeta}
    />
  );
}