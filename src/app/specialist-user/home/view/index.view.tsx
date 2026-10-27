"use client";

import React from "react";
import NextSessionHeader from "@/components/NextSessionHeader";
import { TodayAgenda, TodayAgendaData } from "../components/TodayAgenda";
import { WeeklyOverview, WeeklyOverviewData } from "../components/WeeklyOverview";
import type { SpecialistNextSession } from "../../services/specialistApi";

export type HomeViewProps = {
  greeting: string;
  userFirstName: string;
  todayAgendaData: TodayAgendaData;
  weeklyOverviewData: WeeklyOverviewData;
  nextSession: SpecialistNextSession | null;
};

export default function HomeView({
  greeting,
  userFirstName,
  todayAgendaData,
  weeklyOverviewData,
  nextSession,
}: HomeViewProps) {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-bold text-black">
          {greeting}, {userFirstName}! 👋
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Confira como está sua agenda para hoje e os próximos dias.
        </p>
      </div>

      {nextSession ? (
        <NextSessionHeader
          profilePictureUrl={nextSession.profilePictureUrl}
          name={nextSession.name}
          description={nextSession.description}
          phoneNumber={nextSession.phoneNumber}
          daysCount={nextSession.daysCount}
          sessionDate={nextSession.sessionDate}
          sessionTime={nextSession.sessionTime}
        />
      ) : (
        <section className="rounded-lg border border-gray-100 bg-gray-50 p-6 text-sm text-gray-600">
          Nenhuma sessão agendada para os próximos dias.
        </section>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <TodayAgenda data={todayAgendaData} />
        <WeeklyOverview data={weeklyOverviewData} />
      </div>
    </div>
  );
}
