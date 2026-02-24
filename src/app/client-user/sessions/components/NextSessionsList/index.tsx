"use client";
import React from "react";
import NextSessionCard, { NextSessionCardProps } from "./NextSessionCard";
import EmptyStateScreen from "../EmptyStateScreen";
import SessionsSkeleton from "../SessionsSkeleton";

interface NextSessionsListProps {
  sessions: NextSessionCardProps[];
}

export default function NextSessionsList({ sessions }: NextSessionsListProps) {
  if (!sessions) {
    return <SessionsSkeleton />;
  }
  if (sessions.length === 0) {
    return <EmptyStateScreen type="next" />;
  }

  return (
    <div className="px-4 transition-all duration-300 ease-in-out">
      {sessions.map((session: NextSessionCardProps) => (
        <NextSessionCard key={session.specialistId} {...session} />
      ))}
    </div>
  );
}
