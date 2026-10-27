"use client";

import React from "react";
import { toast } from "sonner";
import Home from "../view/index.view";
import HomeSkeleton from "../components/HomeSkeleton";
import { fetchSpecialistDashboard } from "../../services/specialistApi";
import {
  mockTodayAgendaData,
  mockWeeklyOverviewData,
} from "../mock/mockAgendaData";

export default function HomeController() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [todayAgendaData, setTodayAgendaData] = React.useState(mockTodayAgendaData);
  const [weeklyOverviewData, setWeeklyOverviewData] = React.useState(
    mockWeeklyOverviewData,
  );

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchSpecialistDashboard();
        if (cancelled) return;
        setTodayAgendaData(data.today);
        setWeeklyOverviewData(data.weekly);
      } catch {
        if (!cancelled) {
          toast.error("Não foi possível carregar o resumo da agenda.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <Home
      todayAgendaData={todayAgendaData}
      weeklyOverviewData={weeklyOverviewData}
    />
  );
}
