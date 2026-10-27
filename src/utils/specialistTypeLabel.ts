import type { SpecialistType } from "@/types/backend";

const LABELS: Record<SpecialistType, string> = {
  PSICOLOGO: "Psicólogo",
  PSIQUIATRA: "Psiquiatra",
  TERAPEUTA: "Terapeuta",
  EDUCADOR_FISICO: "Educador Físico",
  NUTRICIONISTA: "Nutricionista",
  ASSESSOR_FINANCEIRO: "Assessor Financeiro",
};

export function specialistTypeLabel(type?: string | null): string {
  if (!type) return "Especialista";
  return LABELS[type as SpecialistType] ?? type;
}
