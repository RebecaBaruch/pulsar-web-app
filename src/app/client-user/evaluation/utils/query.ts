import { RoutesUrls } from "@/utils/enum/routes-url";
import { EvaluationSpecialist } from "../types";

export const EVALUATION_QUERY_KEYS = {
  notificationId: "notificationId",
  name: "name",
  role: "role",
  code: "code",
  photo: "photo",
} as const;

export function buildEvaluationPath(specialist: EvaluationSpecialist): string {
  const params = new URLSearchParams();

  if (specialist.notificationId) {
    params.set(EVALUATION_QUERY_KEYS.notificationId, specialist.notificationId);
  }
  params.set(EVALUATION_QUERY_KEYS.name, specialist.name);
  if (specialist.role) params.set(EVALUATION_QUERY_KEYS.role, specialist.role);
  if (specialist.credentialCode) {
    params.set(EVALUATION_QUERY_KEYS.code, specialist.credentialCode);
  }
  if (specialist.photoUrl) {
    params.set(EVALUATION_QUERY_KEYS.photo, specialist.photoUrl);
  }

  const query = params.toString();
  return query
    ? `${RoutesUrls.CLIENT_EVALUATION}?${query}`
    : RoutesUrls.CLIENT_EVALUATION;
}

export function specialistFromSearchParams(
  searchParams: URLSearchParams,
): EvaluationSpecialist | null {
  const name = searchParams.get(EVALUATION_QUERY_KEYS.name)?.trim();
  if (!name) return null;

  return {
    notificationId:
      searchParams.get(EVALUATION_QUERY_KEYS.notificationId)?.trim() ||
      undefined,
    name,
    role: searchParams.get(EVALUATION_QUERY_KEYS.role)?.trim() ?? "",
    credentialCode: searchParams.get(EVALUATION_QUERY_KEYS.code)?.trim() ?? "",
    photoUrl: searchParams.get(EVALUATION_QUERY_KEYS.photo)?.trim() || undefined,
  };
}
