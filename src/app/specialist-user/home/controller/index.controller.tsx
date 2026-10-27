"use client";

import React from "react";
import { toast } from "sonner";
import Home from "../view/index.view";
import HomeSkeleton from "../components/HomeSkeleton";
import {
  fetchNextSpecialistSession,
  fetchSpecialistDashboard,
  type SpecialistNextSession,
} from "../../services/specialistApi";
import type { TodayAgendaData } from "../components/TodayAgenda";
import type { WeeklyOverviewData } from "../components/WeeklyOverview";
import { useAuth } from "@/auth/useAuth";
import { getFirstName, getTimeGreeting } from "@/utils/timeGreeting";

const emptyToday: TodayAgendaData = {
  completed: 0,
  remaining: 0,
  total: 0,
  progressPercentage: 0,
};

const emptyWeekly: WeeklyOverviewData = {
  completed: 0,
  total: 0,
  completedPercentage: 0,
};

export default function HomeController() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [todayAgendaData, setTodayAgendaData] =
    React.useState<TodayAgendaData>(emptyToday);
  const [weeklyOverviewData, setWeeklyOverviewData] =
    React.useState<WeeklyOverviewData>(emptyWeekly);
  const [nextSession, setNextSession] =
    React.useState<SpecialistNextSession | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [dashboard, session] = await Promise.all([
          fetchSpecialistDashboard(),
          fetchNextSpecialistSession(),
        ]);
        if (cancelled) return;
        setTodayAgendaData(dashboard.today);
        setWeeklyOverviewData(dashboard.weekly);
        setNextSession(session);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar o resumo da agenda.");
          setTodayAgendaData(emptyToday);
          setWeeklyOverviewData(emptyWeekly);
          setNextSession(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const greeting = getTimeGreeting();
  const firstName = getFirstName(user?.name);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <Home
      greeting={greeting}
      userFirstName={firstName}
      todayAgendaData={todayAgendaData}
      weeklyOverviewData={weeklyOverviewData}
      nextSession={nextSession}
    />
  );
}
