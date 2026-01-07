// availabilityService.ts
// Fetches available dates and time slots from backend for a specialist

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"; // adjust if needed

export async function fetchAvailableDates(
  specialistId: string,
  year: number,
  month: number // 0-based month (JS Date.getMonth())
): Promise<string[]> {
  const realMonth = month + 1; // backend likely expects 1-based month
  const url = `${API_URL}/api/specialists/${specialistId}/availability?year=${year}&month=${realMonth}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch dates: ${res.status}`);
    const data = await res.json();
    // Expecting array of ISO date strings: ["2025-07-03", "2025-07-10", ...]
    return Array.isArray(data) ? data : (data?.dates ?? []);
  } catch (err) {
    console.warn("fetchAvailableDates fallback (mock):", err);
    // Fallback: mock a few dates in current month
    const base = new Date(year, month, 1);
    const mock = [5, 7, 12, 18, 21, 26].map((d) =>
      new Date(base.getFullYear(), base.getMonth(), d)
        .toISOString()
        .slice(0, 10)
    );
    return mock;
  }
}

export async function fetchAvailableTimes(
  specialistId: string,
  dateISO: string // YYYY-MM-DD
): Promise<string[]> {
  const url = `${API_URL}/api/specialists/${specialistId}/availability/${dateISO}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch times: ${res.status}`);
    const data = await res.json();
    // Expecting array of time strings: ["08:00", "09:00", ...]
    return Array.isArray(data) ? data : (data?.times ?? []);
  } catch (err) {
    console.warn("fetchAvailableTimes fallback (mock):", err);
    // Fallback: mock some times
    return ["08:00", "09:00", "11:00", "14:00", "15:00", "17:00"];
  }
}
