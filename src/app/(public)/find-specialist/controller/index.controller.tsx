"use client";

import React from "react";
import { toast } from "sonner";
import FindSpecialistView from "../view/index.view";
import { applyFiltersUtil } from "@/utils/apply-filters";
import { fetchSpecialistsList } from "../../services/publicSpecialistApi";
import type { SpecialistType } from "../components/SpecialistCard/type";
import { useAuth } from "@/auth/useAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  buildSpecialtySearchParams,
  specialtiesEqual,
  specialtiesFromSearchParams,
} from "@/utils/findSpecialistRoute";

export default function FindSpecialistController() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [allSpecialists, setAllSpecialists] = React.useState<SpecialistType[]>(
    [],
  );

  const specialties = React.useMemo(
    () => specialtiesFromSearchParams(searchParams),
    [searchParams],
  );
  const [sort, setSort] = React.useState("");

  const filters = React.useMemo(
    () => ({ specialties, sort }),
    [specialties, sort],
  );

  const setFilters = React.useCallback(
    (
      action: React.SetStateAction<{
        specialties: string[];
        sort: string;
      }>,
    ) => {
      const previous = { specialties, sort };
      const next = typeof action === "function" ? action(previous) : action;

      if (next.sort !== previous.sort) {
        setSort(next.sort);
      }

      if (!specialtiesEqual(next.specialties, previous.specialties)) {
        const query = buildSpecialtySearchParams(
          searchParams,
          next.specialties,
        );
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      }
    },
    [pathname, router, searchParams, specialties, sort],
  );

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