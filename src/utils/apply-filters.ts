import { SpecialistCardProps } from "@/app/(public)/find-specialist/components/SpecialistCard/type";

export type Filters = {
  specialties: string[];
  sort: string;
};

/**
 * Filtra e ordena uma lista de especialistas com base nos filtros fornecidos.
 * @param specialists Lista original de especialistas (mock ou API)
 * @param filters Objeto contendo critérios de filtro e ordenação
 * @returns Nova lista filtrada e ordenada
 */
export function applyFiltersUtil(
  specialists: SpecialistCardProps[],
  filters: Filters
): SpecialistCardProps[] {
  let filtered = [...specialists];

  // 🔹 Filtro por especialidade (com base no role)
  if (filters.specialties.length > 0) {
    filtered = filtered.filter((s) =>
      filters.specialties.some((sp) =>
        s.role.toLowerCase().includes(sp.toLowerCase())
      )
    );
  }

  // 🔹 Ordenação (tratando price como string “R$100”)
  if (filters.sort === "Maior nota") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (filters.sort === "Menor preço") {
    filtered.sort(
      (a, b) =>
        parseFloat(a.price.replace("R$", "").trim()) -
        parseFloat(b.price.replace("R$", "").trim())
    );
  } else if (filters.sort === "Maior preço") {
    filtered.sort(
      (a, b) =>
        parseFloat(b.price.replace("R$", "").trim()) -
        parseFloat(a.price.replace("R$", "").trim())
    );
  }

  return filtered;
}
