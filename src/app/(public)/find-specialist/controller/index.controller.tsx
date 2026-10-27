"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FindSpecialistView from "../view/index.view";
import { applyFiltersUtil } from "@/utils/apply-filters";
import { fetchSpecialistsList } from "../../services/publicSpecialistApi";
import { RoutesUrls } from "@/utils/enum/routes-url";
import type { SpecialistType } from "../components/SpecialistCard/type";

export default function FindSpecialistController() {
  const router = useRouter();
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
      } catch (error) {
        if (cancelled) return;
        if (error instanceof Error && error.message === "AUTH_REQUIRED") {
          toast.error("Entre na sua conta para buscar especialistas.");
          router.push(RoutesUrls.LOGIN);
          return;
        }
        toast.error("Não foi possível carregar os especialistas.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

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
