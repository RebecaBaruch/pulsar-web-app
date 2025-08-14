"use client";

import React from "react";

export default function LandingPageView() {
  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-32 lg:px-8">
          {/* Texto */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Construa algo incrível com Next.js & Tailwind
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Essa é uma hero section responsiva usando apenas classes do
              Tailwind. Funciona em qualquer tamanho de tela, sem CSS adicional.
            </p>
            <div className="mt-8 flex gap-4 sm:justify-center lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none"
              >
                Começar agora
              </a>
              <a
                href="#"
                className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-gray-900 transition"
              >
                Saiba mais
              </a>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative mt-10 sm:mt-16 lg:mt-0 lg:col-span-6">
            <img
              className="w-full rounded-xl shadow-lg"
              src="https://via.placeholder.com/600x400"
              alt="Hero image"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
