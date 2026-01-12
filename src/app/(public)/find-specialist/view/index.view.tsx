"use client";

import React from "react";
import SpecialistCard from "../components/SpecialistCard";
import FindSpecialistSkeleton from "../components/FindSpecialistSkeleton";
import FiltersBar from "../components/FiltersBar";

type FindSpecialistViewProps = {
  loading: boolean;
  specialists: any[];
  filters: { specialties: string[]; sort: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ specialties: string[]; sort: string }>
  >;
};

export default function FindSpecialistView({
  loading,
  specialists,
  filters,
  setFilters,
}: FindSpecialistViewProps) {
  return (
    <>
      {loading ? (
        <FindSpecialistSkeleton length={specialists.length} />
      ) : (
        <section className="flex w-full overflow-x-hidden min-h-screen justify-center items-center pt-16">
          <div className="flex flex-col gap-2 w-full max-w-[940px] mx-auto px-5 md:px-8 lg:px-0">
            <h1 className="w-full mx-auto text-2xl text-black font-semibold">
              Encontre seu profissional ideal
            </h1>

            <FiltersBar
              expertsCount={specialists.length}
              filters={filters}
              setFilters={setFilters}
            />

            <div className="w-full mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <FindSpecialistSkeleton length={6} />
              ) : specialists.length > 0 ? (
                specialists.map((s, i) => (
                  <SpecialistCard key={i} {...s} index={i} />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  Nenhum especialista encontrado com os filtros selecionados.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
