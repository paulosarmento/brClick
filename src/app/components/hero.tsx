"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { scrollTo } from "../lib/utils";

export function Hero() {
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-slate-900 text-background"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {!fallbackImage ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/woman-tech-student.png"
            className="h-full w-full object-cover"
            aria-hidden
            onError={() => setFallbackImage(true)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/images/woman-tech-student.png"
            alt="Estudante de tecnologia sorrindo"
            fill
            className="object-cover"
            priority
          />
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-900/75 to-slate-950/90"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:py-24 lg:py-28">
        {/* Badge */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary/30 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          Educação tecnológica gratuita e acessível
        </div>

        {/* Texto */}
        <div className="max-w-3xl space-y-5">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white"
          >
            O Futuro é Agora!
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-white/90">
            Educação tecnológica gratuita, online e inclusiva.
          </p>

          <p className="text-lg sm:text-xl text-white/85 leading-relaxed">
            Comece hoje com trilhas claras, suporte humano e materiais pensados
            para inclusão. Zero custo, 100% online.
          </p>

          <ul className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            {[
              "100% gratuito e online",
              "Acessível e inclusivo",
              "Mentoria humana",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => scrollTo("#contato")}
            aria-label="Inscreva-se gratuitamente"
            className="
                inline-flex items-center gap-2
                rounded-md bg-primary 
                px-7 py-4
                text-lg font-semibold text-primary-foreground
                transition-colors
                hover:bg-primary/90
                focus-visible:outline-offset-2 focus-visible:outline-primary
              "
          >
            Inscreva-se gratuitamente
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => scrollTo("#cursos")}
            aria-label="Ver como funciona"
            className="
              inline-flex items-center
              rounded-md
              border border-white/40
              bg-white/5
              px-7 py-4
              text-lg font-medium text-white
              transition-colors
              hover:bg-white/10
              focus-visible:outline-offset-2 focus-visible:outline-white
            "
          >
            Como funciona
          </button>
        </div>

        {/* Destaques */}
        <dl className="grid gap-4 sm:grid-cols-3 text-white">
          {[
            {
              label: "Nossa missão",
              value: "Formar talentos digitais do zero",
            },
            {
              label: "Para quem é",
              value: "Iniciantes com computador e internet",
            },
            {
              label: "Nosso diferencial",
              value: "Educação inclusiva com suporte real",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 backdrop-blur-sm"
            >
              <dt className="text-sm text-white/70">{item.label}</dt>
              <dd className="mt-1 text-xl font-semibold leading-tight">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
