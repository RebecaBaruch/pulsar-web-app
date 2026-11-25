"use client";
import React from "react";
import HistorySessionCard, {
  HistorySessionCardProps,
} from "./HistorySessionCard";
import EmptyStateScreen from "../EmptyStateScreen";
import SessionsLoadErrorScreen from "../SessionsLoadErrorScreen";
import SessionsSkeleton from "../SessionsSkeleton";

interface HistorySessionsListProps {
  sessions: HistorySessionCardProps[];
  loadError?: string | null;
  onRetry?: () => void;
}

export default function HistorySessionsList({
  sessions,
  loadError = null,
  onRetry,
}: HistorySessionsListProps) {
  if (!sessions) {
    return <SessionsSkeleton />;
  }
  if (loadError) {
    return (
      <SessionsLoadErrorScreen detail={loadError} onRetry={onRetry} />
    );
  }
  if (sessions.length === 0) {
    return <EmptyStateScreen type="history" />;
  }

  return (
    <div className="transition-all duration-300 ease-in-out">
      {sessions.map((session: HistorySessionCardProps) => (
        <HistorySessionCard
          key={session.sessionId ?? `${session.specialistId}-${session.sessionDate}-${session.sessionTime}`}
          {...session}
        />
      ))}
    </div>
  );
}
