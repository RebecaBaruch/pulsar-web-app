"use client";
import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";

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

const specialtiesOptions = [
  { value: "Terapeuta", label: "Terapeuta" },
  { value: "Nutricionista", label: "Nutricionista" },
  { value: "Psicólogo", label: "Psicólogo" },
  { value: "Educador físico", label: "Educador físico" },
  { value: "Psiquiatra", label: "Psiquiatra" },
  { value: "Assessor financeiro", label: "Assessor financeiro" },
];

const sortOptions = [
  { value: "Maior nota", label: "Maior nota" },
  { value: "Menor preço", label: "Menor preço" },
  { value: "Maior preço", label: "Maior preço" },
];

export default function FiltersBar({
  filters,
  setFilters,
  expertsCount,
}: FiltersBarProps) {
  const handleSpecialtiesChange = (
    selected: MultiValue<{ value: string; label: string }>
  ) => {
    setFilters({
      ...filters,
      specialties: selected.map((s) => s.value),
    });
  };

  const handleSortChange = (
    selected: SingleValue<{ value: string; label: string }>
  ) => {
    setFilters({
      ...filters,
      sort: selected ? selected.value : "",
    });
  };

  return (
    <div className="flex flex-wrap flex-row justify-between items-center gap-6 mt-12 px-5 max-w-[1440px] mx-auto w-full">
      <span className="text-sm text-gray-dark font-medium">
        {expertsCount} especialistas encontrados
      </span>

      <div className="flex gap-4">
        <div className="flex flex-row flex-3 justify-between items-center">
          <Select
            isMulti
            placeholder="Tipo de especialista"
            value={specialtiesOptions.filter((opt) =>
              filters.specialties.includes(opt.value)
            )}
            onChange={handleSpecialtiesChange}
            options={specialtiesOptions}
            classNamePrefix="react-select"
            isSearchable={false}
            className="w-full"
            styles={{
              control: (base, state) => ({
                ...base,
                borderRadius: "9999px",
                padding: "1px 2px",
                borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                boxShadow: state.isFocused ? "0 0 0 2px #bfdbfe" : "none",
                "&:hover": { borderColor: "#3b82f6" },
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#e0f2fe",
                borderRadius: "9999px",
                padding: "2px 6px",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "#1e3a8a",
                fontWeight: 500,
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#1e3a8a",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#bfdbfe", color: "#1e40af" },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#3b82f6"
                  : state.isFocused
                    ? "#dbeafe"
                    : "white",
                color: state.isSelected ? "white" : "#111827",
                cursor: "pointer",
              }),
            }}
          />
        </div>

        <Select
          placeholder="Ordenar por"
          options={sortOptions}
          value={sortOptions.find((opt) => opt.value === filters.sort) || null}
          onChange={handleSortChange}
          isSearchable={false}
          classNamePrefix="react-select"
          styles={{
            control: (base, state) => ({
              ...base,
              borderRadius: "9999px",
              padding: "1px 2px",
              borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
              boxShadow: state.isFocused ? "0 0 0 2px #bfdbfe" : "none",
              "&:hover": { borderColor: "#3b82f6" },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? "#3b82f6"
                : state.isFocused
                  ? "#dbeafe"
                  : "white",
              color: state.isSelected ? "white" : "#111827",
              cursor: "pointer",
            }),
          }}
        />
      </div>
    </div>
  );
}
