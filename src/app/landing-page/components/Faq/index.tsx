import React from "react";
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
      "O agendamento pode ser feito diretamente pelo nosso site ou entrando em contato pelo WhatsApp.",
  },
  {
    question: "Quais profissionais atendem na Pulsar?",
    answer:
      "Contamos com psicólogos, terapeutas, educador físico, nutricionista e assessor financeiro — tudo para seu bem-estar completo.",
  },
  {
    question: "O atendimento é presencial ou online?",
    answer:
      "Atualmente, todos os atendimentos da Pulsar são realizados 100% online, com a mesma qualidade, acolhimento e sigilo de uma sessão presencial — tudo no conforto da sua casa.",
  },
  {
    question: "A Pulsar atende convênio ou apenas particular?",
    answer:
      "Atendemos no formato particular, mas emitimos recibo para reembolso, caso seu plano de saúde aceite.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20">
      <div
        className="
          flex flex-col justify-center items-center
          mx-auto max-w-[1440px] px-3 lg:px-25"
      >
        <h2 className="text-black text-center text-3xl md:text-4xl font-semibold mb-6">
          Ainda com dúvidas?{" "}
          <span className="text-blue-600">A gente responde!</span>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Encontre aqui as respostas para as dúvidas mais comuns sobre nossos
          atendimentos.
        </p>

        <div className="space-y-4 w-full max-w-3xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 cursor-pointer"
              >
                <div className="flex gap-4">
                  <span className="font-bold">{index + 1}.</span>
                  <span>{faq.question}</span>
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="xs"
                  className={`text-blue transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
