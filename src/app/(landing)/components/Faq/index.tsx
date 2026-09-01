"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Como agendar uma sessão na Pulsar?",
    answer:
      "Você pode agendar sua consulta diretamente pelo site em poucos cliques ou chamando nossa equipe pelo WhatsApp.",
  },
  {
    question: "Quais profissionais fazem parte da equipe?",
    answer:
      "Nossa equipe conta com psicólogos, terapeutas, nutricionistas, educadores físicos e consultores financeiros.",
  },
  {
    question: "O atendimento é presencial ou 100% online?",
    answer:
      "Atendemos exclusivamente online, garantindo flexibilidade, sigilo e o mesmo acolhimento da consulta presencial.",
  },
  {
    question: "Vocês atendem planos de saúde?",
    answer:
      "Os atendimentos são particulares, mas emitimos recibos e laudos necessários para solicitação de reembolso no seu convênio.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 lg:px-16 lg:py-[64px]">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          {/* <span className="text-xs sm:text-sm text-blue font-semibold uppercase tracking-wider block mb-1">
            Perguntas frequentes
          </span> */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            Ainda com dúvidas?{" "}
            <span className="text-blue">A gente responde!</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-3">
            Respostas rápidas para as perguntas mais frequentes sobre o nosso
            atendimento.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="w-full space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-100 shadow-sm hover:border-gray-200 transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-start justify-between p-4 sm:p-5 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/50 rounded-lg"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="font-bold text-blue text-sm sm:text-base leading-snug select-none">
                      0{index + 1}.
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue/5 flex items-center justify-center text-blue transition-transform duration-300">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`w-3 h-3 text-xs transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-5 pl-10 sm:pl-11 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
