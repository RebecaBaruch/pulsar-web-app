"use client";

import React from "react";
import { ClientPageShell } from "@/components/ClientPage";
import SessionsHeader, { ActiveTab } from "../components/SessionsHeader";
import NextSessionsList from "../components/NextSessionsList";
import HistorySessionsList from "../components/HistorySessionsList";
import SessionsSkeleton from "../components/SessionsSkeleton";
import { NextSessionCardProps } from "../components/NextSessionsList/NextSessionCard";
import { HistorySessionCardProps } from "../components/HistorySessionsList/HistorySessionCard";

interface SessionsViewProps {
  loading: boolean;
  nextSessions: NextSessionCardProps[];
  historySessions: HistorySessionCardProps[];
}

export default function SessionsView({
  loading,
  nextSessions,
  historySessions,
}: SessionsViewProps) {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("next");
  return (
    <ClientPageShell
      contentClassName="overflow-y-auto h-[calc(100vh-7rem)] scrollbar-hidden transition-all duration-300 ease-in-out"
    >
      <SessionsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading ? (
        <SessionsSkeleton />
      ) : activeTab === "next" ? (
        <NextSessionsList sessions={nextSessions} />
      ) : (
        <HistorySessionsList sessions={historySessions} />
      )}
    </ClientPageShell>
  );
}
