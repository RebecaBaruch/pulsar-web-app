"use client";
import React from "react";
import NextSessionCard, { NextSessionCardProps } from "./NextSessionCard";
import EmptyStateScreen from "../EmptyStateScreen";
import SessionsLoadErrorScreen from "../SessionsLoadErrorScreen";
import SessionsSkeleton from "../SessionsSkeleton";

interface NextSessionsListProps {
  sessions: NextSessionCardProps[];
  loadError?: string | null;
  onRetry?: () => void;
}

export default function NextSessionsList({
  sessions,
  loadError = null,
  onRetry,
}: NextSessionsListProps) {
  if (!sessions) {
    return <SessionsSkeleton />;
  }
  if (loadError) {
    return (
      <SessionsLoadErrorScreen detail={loadError} onRetry={onRetry} />
    );
  }
  if (sessions.length === 0) {
    return <EmptyStateScreen type="next" />;
  }

  return (
    <div className="transition-all duration-300 ease-in-out">
      {sessions.map((session: NextSessionCardProps) => (
        <NextSessionCard
          key={session.sessionId ?? `${session.specialistId}-${session.startTimeIso ?? session.sessionDate}-${session.sessionTime}`}
          {...session}
        />
      ))}
    </div>
  );
}
