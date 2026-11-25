import { specialtiesOptions } from "@/app/(public)/find-specialist/components/FiltersHeader/filters";
import { RoutesUrls } from "@/utils/enum/routes-url";

export const FIND_SPECIALIST_SPECIALTY_QUERY = "especialidade";

export function findSpecialistHref(specialtyFilterValue: string): string {
  const params = new URLSearchParams({
    [FIND_SPECIALIST_SPECIALTY_QUERY]: specialtyFilterValue,
  });
  return `${RoutesUrls.FIND_SPECIALIST}?${params.toString()}`;
}

/** Maps a query-string value to a known filter label (case-insensitive). */
export function specialtyFromSearchParam(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const normalized = raw.trim().toLowerCase();
  return (
    specialtiesOptions.find((o) => o.value.toLowerCase() === normalized)
      ?.value ?? null
  );
}

export function specialtiesFromSearchParams(
  searchParams: URLSearchParams,
): string[] {
  const resolved = searchParams
    .getAll(FIND_SPECIALIST_SPECIALTY_QUERY)
    .map((value) => specialtyFromSearchParam(value))
    .filter((value): value is string => value != null);
  return [...new Set(resolved)];
}

export function specialtiesEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, index) => value === sortedB[index]);
}

/** Builds query string with specialty filters (empty string = no query). */
export function buildSpecialtySearchParams(
  current: URLSearchParams,
  specialties: string[],
): string {
  const params = new URLSearchParams(current.toString());
  params.delete(FIND_SPECIALIST_SPECIALTY_QUERY);
  for (const specialty of specialties) {
    params.append(FIND_SPECIALIST_SPECIALTY_QUERY, specialty);
  }
  return params.toString();
}