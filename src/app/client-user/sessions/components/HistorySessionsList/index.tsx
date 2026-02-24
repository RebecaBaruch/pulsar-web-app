"use client";
import React from "react";
import HistorySessionCard, {
  HistorySessionCardProps,
} from "./HistorySessionCard";
import EmptyStateScreen from "../EmptyStateScreen";
import SessionsSkeleton from "../SessionsSkeleton";

interface HistorySessionsListProps {
  sessions: HistorySessionCardProps[];
}

export default function HistorySessionsList({ sessions }: HistorySessionsListProps) {
  if (!sessions) {
    return <SessionsSkeleton />;
  }
  if (sessions.length === 0) {
    return <EmptyStateScreen type="history" />;
  }

  return (
    <div className="px-4 transition-all duration-300 ease-in-out">
      {sessions.map((session: HistorySessionCardProps) => (
        <HistorySessionCard key={session.specialistId} {...session} />
      ))}
    </div>
  );
}
