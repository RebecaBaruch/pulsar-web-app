/** Returns a time-of-day greeting in Portuguese (e.g. "Boa tarde"). */
export function getTimeGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function getFirstName(fullName?: string | null): string {
  const trimmed = fullName?.trim();
  if (!trimmed) return "Especialista";
  return trimmed.split(/\s+/)[0] ?? trimmed;
}
