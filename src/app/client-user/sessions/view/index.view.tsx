"use client";

import React from "react";
import { clientCardClass, ClientPageShell } from "@/components/ClientPage";
import SessionsHeader, { ActiveTab } from "../components/SessionsHeader";
import NextSessionsList from "../components/NextSessionsList";
import HistorySessionsList from "../components/HistorySessionsList";
import SessionsSkeleton from "../components/SessionsSkeleton";
import { NextSessionCardProps } from "../components/NextSessionsList/NextSessionCard";
import { HistorySessionCardProps } from "../components/HistorySessionsList/HistorySessionCard";

interface SessionsViewProps {
  loading: boolean;
  loadError?: string | null;
  onRetry?: () => void;
  nextSessions: NextSessionCardProps[];
  historySessions: HistorySessionCardProps[];
}

export default function SessionsView({
  loading,
  loadError = null,
  onRetry,
  nextSessions,
  historySessions,
}: SessionsViewProps) {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("next");

  const listContent = loading ? (
    <SessionsSkeleton />
  ) : activeTab === "next" ? (
    <NextSessionsList
      sessions={nextSessions}
      loadError={loadError}
      onRetry={onRetry}
    />
  ) : (
    <HistorySessionsList
      sessions={historySessions}
      loadError={loadError}
      onRetry={onRetry}
    />
  );

  return (
    <ClientPageShell contentClassName="flex flex-col gap-4">
      <SessionsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div
        className={`${clientCardClass} max-h-[calc(100dvh-17rem)] overflow-x-hidden overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 transition-all duration-300 ease-in-out md:max-h-[calc(100dvh-14rem)]`}
        aria-label="Lista de sessões"
      >
        {listContent}
      </div>
    </ClientPageShell>
  );
}