"use client";

import React from "react";
import Home from "../view/index.view";
import HomeSkeleton from "../components/HomeSkeleton";
import {
  mockTodayAgendaData,
  mockWeeklyOverviewData,
} from "../mock/mockAgendaData";

export default function HomeController() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <Home
      todayAgendaData={mockTodayAgendaData}
      weeklyOverviewData={mockWeeklyOverviewData}
    />
  );
}
