import { format } from "date-fns";
import { AppointmentData } from "../../types";

export const ROW_HEIGHT_MOBILE = 80;
export const ROW_HEIGHT_DESKTOP = 112;
export const ALL_DAY_MINUTES = 24 * 60;

export function appointmentEndTime(
  startTime: string,
  durationMinutes: number,
): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  return format(endDate, "HH:mm");
}

export function isAllDayAppointment(app: AppointmentData): boolean {
  return app.durationMinutes >= ALL_DAY_MINUTES;
}

export function getCurrentTimeOffset(
  currentTime: Date,
  timeSlots: string[],
  rowHeight: number,
): number | null {
  if (timeSlots.length === 0) return null;

  const firstSlotHour = parseInt(timeSlots[0].split(":")[0], 10);
  const lastSlotHour = parseInt(
    timeSlots[timeSlots.length - 1].split(":")[0],
    10,
  );
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  if (currentHour < firstSlotHour || currentHour > lastSlotHour) return null;

  return (currentHour - firstSlotHour + currentMinutes / 60) * rowHeight;
}
