"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { siteContent } from "../lib/data";
import { useState } from "react";
import { scrollTo } from "../lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Dúvidas Frequentes
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>

          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o BR CLICK e nossos cursos.
          </p>
        </div>

        {/* Lista FAQ */}
        <div className="space-y-4">
          {siteContent.faq.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`
                  rounded-xl border-2 bg-card
                  transition-all
                  ${isOpen ? "border-primary/40 shadow-sm" : "border-border"}
                `}
              >
                {/* Pergunta */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="
                    w-full
                    flex items-center justify-between gap-4
                    px-6 py-6
                    text-left
                    rounded-xl
                    transition-all
                    hover:bg-muted/50
                    focus:outline-none  focus:ring-primary focus:ring-offset-2
                  "
                >
                  {/* Texto da pergunta */}
                  <span className="font-semibold text-card-foreground">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`
                      h-5 w-5 shrink-0 text-muted-foreground
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                    aria-hidden
                  />
                </button>

                <div
                  className={`${
                    isOpen ? "h-px bg-border mx-6 mb-6" : "hidden"
                  }`}
                ></div>

                {/* Resposta */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Ainda tem dúvidas?</p>

          <button
            onClick={() => scrollTo("#contato")}
            className="
              inline-flex items-center gap-2
              text-primary font-semibold
              transition-colors
              hover:underline
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            "
          >
            Entre em contato conosco →
          </button>
        </div>
      </div>
    </section>
  );
}
