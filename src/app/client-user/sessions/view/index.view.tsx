"use client";

import React from "react";
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
    <section className="flex w-full overflow-x-hidden min-h-screen justify-center pt-10 pb-10 scrollbar-hidden">
      <div className=" flex flex-col gap-8 w-full max-w-[768px] mx-auto overflow-y-auto h-[calc(100vh-7rem)] transition-all duration-300 ease-in-out">
        <SessionsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {loading ? (
          <SessionsSkeleton />
        ) : activeTab === "next" ? (
          <NextSessionsList sessions={nextSessions} />
        ) : (
          <HistorySessionsList sessions={historySessions} />
        )}
      </div>
    </section>
  );
}
