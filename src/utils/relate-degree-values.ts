/** Valores aceitos pelo backend (`relationshipDegree`). */
export const RELATIONSHIP_DEGREE_VALUES = [
  "CONJUGE",
  "FILHO",
  "IRMAO",
  "MAE",
  "NETO",
  "PAI",
  "SOBRINHO",
  "TIO",
  "AMIGO",
  "CUNHADO",
  "GENRO",
  "NORA",
  "SOGRO",
  "AVO",
  "COMPANHEIRO",
  "OUTRO",
] as const;

export type RelationshipDegree = (typeof RELATIONSHIP_DEGREE_VALUES)[number];

const LABELS: Record<RelationshipDegree, string> = {
  CONJUGE: "Cônjuge",
  FILHO: "Filho(a)",
  IRMAO: "Irmão(ã)",
  MAE: "Mãe",
  NETO: "Neto(a)",
  PAI: "Pai",
  SOBRINHO: "Sobrinho(a)",
  TIO: "Tio(a)",
  AMIGO: "Amigo(a)",
  CUNHADO: "Cunhado(a)",
  GENRO: "Genro",
  NORA: "Nora",
  SOGRO: "Sogro(a)",
  AVO: "Avô/Avó",
  COMPANHEIRO: "Companheiro(a)",
  OUTRO: "Outro",
};

/** Opções para `SelectInput` (value = código do banco, label = exibição). */
export const relationshipDegreeOptions = RELATIONSHIP_DEGREE_VALUES.map(
  (value) => ({
    value,
    label: LABELS[value],
  }),
);

/** Alias usado no fluxo de cadastro. */
export const relationshipOptions = relationshipDegreeOptions;

/** Rótulo amigável a partir do código do banco. */
export function relationshipDegreeLabel(
  value: string | undefined,
): string {
  if (!value?.trim()) return "";
  const code = value.trim().toUpperCase() as RelationshipDegree;
  return LABELS[code] ?? value;
}

const LEGACY_REGISTER_MAP: Record<string, RelationshipDegree> = {
  father: "PAI",
  mother: "MAE",
  stepchild: "FILHO",
  stepfather: "PAI",
  stepmother: "MAE",
  child: "FILHO",
  sibling: "IRMAO",
  grandparent: "AVO",
  uncle_aunt: "TIO",
  cousin: "SOBRINHO",
  nephew_niece: "SOBRINHO",
  brother_in_law: "CUNHADO",
  father_in_law: "SOGRO",
  son_in_law: "GENRO",
  godparent: "OUTRO",
  friend: "AMIGO",
  coworker: "AMIGO",
  neighbor: "AMIGO",
  other: "OUTRO",
};

/** Normaliza valor vindo do banco ou de versões antigas do front. */
export function normalizeRelationshipDegree(
  value: string | undefined,
): RelationshipDegree | "" {
  if (!value?.trim()) return "";

  const trimmed = value.trim();
  const upper = trimmed.toUpperCase() as RelationshipDegree;
  if (RELATIONSHIP_DEGREE_VALUES.includes(upper)) {
    return upper;
  }

  const legacy = LEGACY_REGISTER_MAP[trimmed.toLowerCase()];
  if (legacy) return legacy;

  return "";
}

export function isRelationshipDegree(
  value: string | undefined,
): value is RelationshipDegree {
  if (!value?.trim()) return false;
  return RELATIONSHIP_DEGREE_VALUES.includes(
    value.trim().toUpperCase() as RelationshipDegree,
  );
}
