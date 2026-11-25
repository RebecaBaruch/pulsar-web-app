"use client";

import React from "react";
import { toast } from "sonner";
import SessionsView from "../view/index.view";
import { NextSessionCardProps } from "../components/NextSessionsList/NextSessionCard";
import { HistorySessionCardProps } from "../components/HistorySessionsList/HistorySessionCard";
import {
  ClientUserApiError,
  fetchClientSessions,
} from "../../services/clientUserApi";
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { RoutesUrls } from "@/utils/enum/routes-url";

const LOAD_ERROR_FALLBACK =
  "Tente novamente em instantes. Se o problema continuar, entre em contato com o suporte.";

export default function SessionsController() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const [nextSessions, setNextSessions] = React.useState<
    NextSessionCardProps[]
  >([]);
  const [historySessions, setHistorySessions] = React.useState<
    HistorySessionCardProps[]
  >([]);

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.replace(RoutesUrls.LOGIN);
    }
  }, [authLoading, user, router]);

  React.useEffect(() => {
    if (authLoading || !user) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const data = await fetchClientSessions();
        if (cancelled) return;
        setLoadError(null);
        setNextSessions(data.nextSessions);
        setHistorySessions(data.historySessions);
      } catch (error) {
        if (cancelled) return;
        if (
          error instanceof ClientUserApiError &&
          (error.status === 401 || error.status === 403)
        ) {
          toast.error("Sua sessão expirou. Entre novamente.");
          await logout();
          router.replace(RoutesUrls.LOGIN);
          return;
        }
        setNextSessions([]);
        setHistorySessions([]);
        setLoadError(
          error instanceof ClientUserApiError
            ? error.message
            : LOAD_ERROR_FALLBACK,
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, retryCount, logout, router]);

  const handleRetry = React.useCallback(() => {
    setLoadError(null);
    setRetryCount((n) => n + 1);
  }, []);

  if (authLoading) {
    return (
      <SessionsView loading nextSessions={[]} historySessions={[]} />
    );
  }

  return (
    <SessionsView
      loading={loading}
      loadError={loadError}
      onRetry={handleRetry}
      nextSessions={nextSessions}
      historySessions={historySessions}
    />
  );
}