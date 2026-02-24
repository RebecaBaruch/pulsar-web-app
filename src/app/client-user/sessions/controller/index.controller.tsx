"use client";
import React from "react";
import SessionsView from "../view/index.view";
import { mockNextSessions, mockHistorySessions } from "../mock/sessionsMock";
import { NextSessionCardProps } from "../components/NextSessionsList/NextSessionCard";
import { HistorySessionCardProps } from "../components/HistorySessionsList/HistorySessionCard";

export default function SessionsController() {
  // Simulate loading and fetch
  const [loading, setLoading] = React.useState(true);
  const [nextSessions, setNextSessions] = React.useState<
    NextSessionCardProps[]
  >([]);
  const [historySessions, setHistorySessions] = React.useState<
    HistorySessionCardProps[]
  >([]);

  React.useEffect(() => {
    setTimeout(() => {
      setNextSessions(mockNextSessions);
      setHistorySessions(mockHistorySessions);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <SessionsView
      loading={loading}
      nextSessions={nextSessions}
      historySessions={historySessions}
    />
  );
}
