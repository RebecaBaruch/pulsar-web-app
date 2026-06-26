"use client";

import React from "react";

export default function ScheduleView() {
  return (
    <div className="flex flex-col w-full md:w-3/4 lg:w-fit gap-15 md:gap-8 lg:gap-10 xl:gap-12 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
        <p className="text-gray-600 mt-2">
          Gerencie seus compromissos e horários
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">
          Em breve você poderá gerenciar sua agenda aqui
        </p>
      </div>
    </div>
  );
}
