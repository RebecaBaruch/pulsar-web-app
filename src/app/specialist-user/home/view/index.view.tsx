"use client";

import NextSessionHeader from "@/components/NextSessionHeader";
import React from "react";
import { TodayAgenda, TodayAgendaData } from "../components/TodayAgenda";
import { WeeklyOverview, WeeklyOverviewData } from "../components/WeeklyOverview";

export type HomeViewProps = {
  todayAgendaData: TodayAgendaData;
  weeklyOverviewData: WeeklyOverviewData;
}

export default function HomeView({ todayAgendaData, weeklyOverviewData }: HomeViewProps) {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-black">
         Boa tarde, Alex! 👋
        </h1>
        <p className="text-xs md:text-base text-gray-dark">
          Confira como está sua agenda para hoje e os próximos dias.
        </p>
      </div>
      <NextSessionHeader />

      <div className="flex flex-col md:flex-row gap-4">
          <TodayAgenda data={todayAgendaData} />
          <WeeklyOverview data={weeklyOverviewData} />
      </div>
    </div>
  );
}
