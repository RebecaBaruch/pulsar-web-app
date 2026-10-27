import type { TodayAgendaData } from "../home/components/TodayAgenda";
import type { WeeklyOverviewData } from "../home/components/WeeklyOverview";

function num(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function pct(completed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((completed / total) * 100);
}

export function mapDashboardResponse(data: unknown): {
  today: TodayAgendaData;
  weekly: WeeklyOverviewData;
} {
  const root =
    data && typeof data === "object" ? (data as Record<string, unknown>) : {};

  const todayBlock =
    (root.today as Record<string, unknown>) ??
    (root.todayAgenda as Record<string, unknown>) ??
    (root.daily as Record<string, unknown>) ??
    root;

  const weekBlock =
    (root.week as Record<string, unknown>) ??
    (root.weekly as Record<string, unknown>) ??
    (root.weeklyOverview as Record<string, unknown>) ??
    root;

  const todayCompleted = num(
    todayBlock.completed ??
      todayBlock.completedSessions ??
      todayBlock.done ??
      root.todayCompleted,
  );
  const todayTotal = num(
    todayBlock.total ??
      todayBlock.totalSessions ??
      todayBlock.scheduled ??
      root.todayTotal,
    todayCompleted,
  );
  const todayRemaining = num(
    todayBlock.remaining ?? todayBlock.pending ?? todayTotal - todayCompleted,
    Math.max(0, todayTotal - todayCompleted),
  );

  const weekCompleted = num(
    weekBlock.completed ??
      weekBlock.completedSessions ??
      root.weekCompleted,
    todayCompleted,
  );
  const weekTotal = num(
    weekBlock.total ?? weekBlock.totalSessions ?? root.weekTotal,
    Math.max(todayTotal, weekCompleted),
  );

  const todayProgress = num(
    todayBlock.progressPercentage ?? todayBlock.progress,
    pct(todayCompleted, todayTotal),
  );

  const weekProgress = num(
    weekBlock.completedPercentage ?? weekBlock.progress,
    pct(weekCompleted, weekTotal),
  );

  return {
    today: {
      completed: todayCompleted,
      remaining: todayRemaining,
      total: todayTotal,
      progressPercentage: todayProgress,
    },
    weekly: {
      completed: weekCompleted,
      total: weekTotal,
      completedPercentage: weekProgress,
    },
  };
}
