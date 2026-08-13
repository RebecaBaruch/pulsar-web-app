"use client";

import React from "react";
import NextSessionHeader from "@/components/NextSessionHeader";
import { TodayAgenda, TodayAgendaData } from "../components/TodayAgenda";
import { WeeklyOverview, WeeklyOverviewData } from "../components/WeeklyOverview";

export type HomeViewProps = {
  todayAgendaData: TodayAgendaData;
  weeklyOverviewData: WeeklyOverviewData;
}

export default function HomeView({ todayAgendaData, weeklyOverviewData }: HomeViewProps) {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-bold text-black">
         Boa tarde, Alex! 👋
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Confira como está sua agenda para hoje e os próximos dias.
        </p>
      </div>
      <NextSessionHeader 
        name="Rebeca Baruch"
        description="Registro, SP"
        phoneNumber="5511999999999"
        daysCount={2}
        sessionDate="22 de Julho"
        sessionTime="10:00 AM"
      />

      <div className="flex flex-col md:flex-row gap-4">
          <TodayAgenda data={todayAgendaData} />
          <WeeklyOverview data={weeklyOverviewData} />
      </div>
    </div>
  );
}
