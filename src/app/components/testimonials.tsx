"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { siteContent } from "../lib/data";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export function Testimonials() {
  const testimonials = siteContent.testimonials.slice(0, 6);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* ------------------ Drag com mouse ------------------ */
  function handleMouseDown(e: React.MouseEvent) {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }

  function stopDragging() {
    setIsDragging(false);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }

  /* ------------------ Scroll por seta ------------------ */
  function scrollByDirection(direction: "left" | "right") {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const isMobile = window.innerWidth < 640;

    const amount = isMobile
      ? container.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 300
      : container.clientWidth * 0.9;

    container.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  /* ------------------ Controle das setas ------------------ */
  useEffect(() => {
    function updateArrows() {
      if (!sliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }

    const el = sliderRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  return (
    <section
      id="depoimentos"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="container mx-auto relative">
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            O que nossos alunos dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Depoimentos curtos e reais para mostrar o que é possível alcançar.
          </p>
        </div>

        {/* Carrossel */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={handleMouseMove}
          className="
            flex gap-6
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            pb-4
            cursor-grab active:cursor-grabbing
            select-none
            no-scrollbar
          "
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-card
              className="
                snap-start
                min-w-[85%]
                sm:min-w-[45%]
                lg:min-w-[32%]
                bg-card
                rounded-xl
                border-2
                p-8
                shadow-sm
                transition-all
                hover:border-primary/50
              "
            >
              {/* Estrelas */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                    aria-hidden
                  />
                ))}
              </div>

              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              <p className="text-muted-foreground mb-6 italic">
                {testimonial.content}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  draggable={false}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {testimonial.achievement}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SETA ESQUERDA */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByDirection("left")}
            aria-label="Depoimentos anteriores"
            className="
              absolute
              top-1/2
              left-0
              -translate-y-1/2
              h-11 w-11
              flex
              items-center justify-center
              rounded-full
              bg-background/90
              border
              shadow-md
              transition
              hover:bg-primary hover:text-primary-foreground
            "
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* SETA DIREITA */}
        {canScrollRight && (
          <button
            onClick={() => scrollByDirection("right")}
            aria-label="Próximos depoimentos"
            className="
              absolute
              top-1/2
              right-0
              -translate-y-1/2
              h-11 w-11
              flex
              items-center justify-center
              rounded-full
              bg-background/90
              border
              shadow-md
              transition
              hover:bg-primary hover:text-primary-foreground
            "
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Arraste ou use as setas para navegar →
        </p>
      </div>
    </section>
  );
}
