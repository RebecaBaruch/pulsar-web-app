"use client";

import React from "react";
import { toast } from "sonner";
import SessionsView from "../view/index.view";
import { NextSessionCardProps } from "../components/NextSessionsList/NextSessionCard";
import { HistorySessionCardProps } from "../components/HistorySessionsList/HistorySessionCard";
import { fetchClientSessions } from "../../services/clientUserApi";

export default function SessionsController() {
  const [loading, setLoading] = React.useState(true);
  const [nextSessions, setNextSessions] = React.useState<
    NextSessionCardProps[]
  >([]);
  const [historySessions, setHistorySessions] = React.useState<
    HistorySessionCardProps[]
  >([]);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchClientSessions();
        if (cancelled) return;
        setNextSessions(data.nextSessions);
        setHistorySessions(data.historySessions);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar suas sessões.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SessionsView
      loading={loading}
      nextSessions={nextSessions}
      historySessions={historySessions}
    />
  );
}
