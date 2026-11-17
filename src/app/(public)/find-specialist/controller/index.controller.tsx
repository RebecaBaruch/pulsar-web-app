"use client";

import React from "react";
import { toast } from "sonner";
import FindSpecialistView from "../view/index.view";
import { applyFiltersUtil } from "@/utils/apply-filters";
import { fetchSpecialistsList } from "../../services/publicSpecialistApi";
import type { SpecialistType } from "../components/SpecialistCard/type";

export default function FindSpecialistController() {
  const [loading, setLoading] = React.useState(true);
  const [allSpecialists, setAllSpecialists] = React.useState<SpecialistType[]>(
    [],
  );
  const [filters, setFilters] = React.useState({
    specialties: [] as string[],
    sort: "",
  });

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const list = await fetchSpecialistsList({ page: 0, size: 60 });
        if (!cancelled) setAllSpecialists(list);
      } catch {
        if (cancelled) return;
        toast.error("Não foi possível carregar os especialistas.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const specialists = React.useMemo(
    () => applyFiltersUtil(allSpecialists, filters),
    [allSpecialists, filters],
  );

  return (
    <FindSpecialistView
      loading={loading}
      specialists={specialists}
      filters={filters}
      setFilters={setFilters}
    />
  );
}
