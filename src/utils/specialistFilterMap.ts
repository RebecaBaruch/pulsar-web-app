/** Maps UI filter labels to backend `specialistType` enum values. */
const FILTER_TO_BACKEND: Record<string, string> = {
  Psicólogo: "PSICOLOGO",
  Psiquiatra: "PSIQUIATRA",
  Terapeuta: "TERAPEUTA",
  "Educador físico": "EDUCADOR_FISICO",
  Nutricionista: "NUTRICIONISTA",
  "Assessor financeiro": "ASSESSOR_FINANCEIRO",
};

export function specialistTypeFromFilter(label: string): string | undefined {
  return FILTER_TO_BACKEND[label];
}
