const SESSION_DURATION_MINUTES = 50;

/** Combines YYYY-MM-DD and HH:mm into ISO local datetime string for the API. */
export function buildSessionWindow(
  dateISO: string,
  time: string,
  durationMinutes = SESSION_DURATION_MINUTES,
): { startTime: string; endTime: string } {
  const normalizedTime = time.length === 5 ? `${time}:00` : time;
  const start = new Date(`${dateISO}T${normalizedTime}`);
  const end = new Date(start.getTime() + durationMinutes * 60_000);

  const pad = (n: number) => String(n).padStart(2, "0");
  const formatLocal = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  return {
    startTime: formatLocal(start),
    endTime: formatLocal(end),
  };
}

export function formatSessionDatePt(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  if (Number.isNaN(d.getTime())) return isoDateTime;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });
}

export function formatSessionTimePt(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  if (Number.isNaN(d.getTime())) return isoDateTime;
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function daysUntil(isoDateTime: string): number {
  const target = new Date(isoDateTime);
  const now = new Date();
  const diff = target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round(diff / 86_400_000));
}
