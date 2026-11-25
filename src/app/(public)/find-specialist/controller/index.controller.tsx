"use client";

import React from "react";
import { toast } from "sonner";
import FindSpecialistView from "../view/index.view";
import { applyFiltersUtil } from "@/utils/apply-filters";
import { fetchSpecialistsList } from "../../services/publicSpecialistApi";
import type { SpecialistType } from "../components/SpecialistCard/type";
import { useAuth } from "@/auth/useAuth";

export default function FindSpecialistController() {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [allSpecialists, setAllSpecialists] = React.useState<SpecialistType[]>(
    [],
  );
  const [filters, setFilters] = React.useState({
    specialties: [] as string[],
    sort: "",
  });

  React.useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const list = await fetchSpecialistsList({ page: 0, size: 60 });
        if (!cancelled) setAllSpecialists(list);
      } catch {
        if (cancelled) return;
        toast.error("Não foi possível carregar os especialistas.");
        if (!cancelled) setAllSpecialists([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated]);

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