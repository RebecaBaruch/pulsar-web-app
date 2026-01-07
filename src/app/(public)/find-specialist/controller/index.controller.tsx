"use client";

import React from "react";
import FindSpecialistView from "../view/index.view";
import { specialistsMock } from "../mock/mocks";
import { applyFiltersUtil } from "@/utils/apply-filters";

export default function FindSpecialistController() {
  const [loading, setLoading] = React.useState(true);
  const [specialists, setSpecialists] = React.useState(specialistsMock);
  const [filters, setFilters] = React.useState({
    specialties: [] as string[],
    sort: "",
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!loading) {
      const filtered = applyFiltersUtil(specialistsMock, filters);
      setSpecialists(filtered);
    }
  }, [filters, loading]);

  return (
    <FindSpecialistView
      loading={loading}
      specialists={specialists}
      filters={filters}
      setFilters={setFilters}
    />
  );
}
