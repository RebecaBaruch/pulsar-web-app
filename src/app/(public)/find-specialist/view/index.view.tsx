"use client";

import NavBar from "@/components/NavBar";
import React from "react";
import SpecialistCard from "../components/SpecialistCard";
import FindSpecialistSkeleton from "../components/FindSpecialistSkeleton";
import FiltersBar from "../components/FiltersBar";
import Footer from "@/components/Footer";

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
        <>
          <NavBar />

          <div className="w-full px-4 mt-6 max-w-[1440px] mx-auto">
            <div className="relative w-full">
              <img
                src="/images/banner-pulsar-mobile.jpg"
                alt="Banner Pulsar"
                className="w-full h-auto rounded-xl md:hidden"
              />
              <img
                src="/images/banner-pulsar.jpg"
                alt="Banner Pulsar"
                className="hidden md:block w-full h-auto rounded-xl"
              />

              <div className="absolute inset-0 flex flex-col md:flex-row justify-start items-start md:items-center p-6 md:p-12">
                <div className="flex flex-col z-10 w-full md:w-[50%] gap-3 lg:gap-6">
                  <h1 className="order-2 md:order-1 text-left text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white">
                    Encontre o especialista ideal para você
                  </h1>
                  <img
                    src="/images/logo-azul-branca.svg"
                    alt="Pulsar logo"
                    className="order-1 md:order-2 w-[100px] md:w-[110px] lg:w-[130px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <FiltersBar
            expertsCount={specialists.length}
            filters={filters}
            setFilters={setFilters}
          />

          <div className="w-full px-5 mt-8 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-42">
            {loading ? (
              <FindSpecialistSkeleton length={6} />
            ) : specialists.length > 0 ? (
              specialists.map((s, i) => <SpecialistCard key={i} {...s} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                Nenhum especialista encontrado com os filtros selecionados.
              </p>
            )}
          </div>

          <Footer />
        </>
      )}
    </>
  );
}
