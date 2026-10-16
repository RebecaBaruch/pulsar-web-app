import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function getMonthMatrix(month: Date): Date[] {
  const monthStart = startOfMonth(month);
  return eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(monthStart), { weekStartsOn: 0 }),
  });
}

export function getSelectedWeekIndex(monthMatrix: Date[], selectedDay: Date) {
  const selectedDayIndex = monthMatrix.findIndex((day) =>
    isSameDay(day, selectedDay),
  );
  return selectedDayIndex === -1 ? 0 : Math.floor(selectedDayIndex / 7);
}

export function getMonthLabels(year: number): string[] {
  return Array.from({ length: 12 }, (_, monthIndex) =>
    format(new Date(year, monthIndex, 1), "MMMM", { locale: ptBR }),
  );
}
