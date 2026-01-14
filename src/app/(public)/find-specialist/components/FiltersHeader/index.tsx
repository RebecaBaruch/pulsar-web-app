"use client";
import React from "react";
import SelectInput from "@/components/SelectInput";
import { specialtiesOptions, sortOptions } from "./filters";
import { faClose, faSortAmountDown } from "@fortawesome/free-solid-svg-icons";
import Badge from "@/components/Badge";

type FiltersBarProps = {
  expertsCount: number;
  filters: {
    specialties: string[];
    sort: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      specialties: string[];
      sort: string;
    }>
  >;
};

export default function FiltersHeader({
  filters,
  setFilters,
  expertsCount,
}: FiltersBarProps) {
  const removeSpecialty = (value: string) => {
    setFilters({
      ...filters,
      specialties: filters.specialties.filter((s) => s !== value),
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <span className="text-sm text-gray-700">{expertsCount} resultados</span>

        <div className="flex w-full md:w-fit items-center gap-3">
          <SelectInput
            placeholder="Especialidade"
            options={specialtiesOptions}
            isMulti
            value={filters.specialties}
            showResult={false}
            onChange={(v) =>
              setFilters({ ...filters, specialties: Array.isArray(v) ? v : [] })
            }
          />

          <SelectInput
            placeholder="Ordenar"
            icon={faSortAmountDown}
            options={sortOptions}
            value={filters.sort}
            onChange={(v) => setFilters({ ...filters, sort: String(v) })}
          />
        </div>
      </div>
      {filters.specialties.length > 0 && (
        <div className="flex items-start md:item-center gap-4 flex-wrap pt-2">
          <span className="text-sm text-gray-dark font-medium">
            Filtros aplicados:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {filters.specialties.map((s) => (
              <Badge
                label={s}
                variant="gray"
                key={s}
                buttonIcon={faClose}
                onClick={() => removeSpecialty(s)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
