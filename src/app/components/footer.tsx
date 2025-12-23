"use client";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { scrollTo } from "../lib/utils";

export function Footer() {
  return (
    <footer className="bg-foreground text-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-foreground font-bold text-xl">
              BC
            </div>
            <div>
              <p className="text-lg font-semibold">BR CLICK</p>
              <p className="text-sm text-background/70">
                Educação tecnológica gratuita, inclusiva e acessível.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-background/80">
            <span>Contato rápido:</span>
            <a
              className="underline hover:text-background"
              href="mailto:contato@brclick.com.br"
            >
              contato@brclick.com.br
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo("#inicio")}
            className="text-background/80 hover:text-background text-sm"
          >
            Início
          </button>
          <button
            onClick={() => scrollTo("#por-que")}
            className="text-background/80 hover:text-background text-sm"
          >
            Por que BR CLICK?
          </button>
          <button
            onClick={() => scrollTo("#cursos")}
            className="text-background/80 hover:text-background text-sm"
          >
            Cursos
          </button>
          <button
            onClick={() => scrollTo("#faq")}
            className="text-background/80 hover:text-background text-sm"
          >
            Dúvidas
          </button>
          <button
            onClick={() => scrollTo("#contato")}
            className="text-background/80 hover:text-background text-sm"
          >
            Contato
          </button>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Facebook, label: "Facebook" },
            { icon: Instagram, label: "Instagram" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Youtube, label: "YouTube" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <div className="border-t border-background/15 pt-4 text-sm text-background/70">
          © 2025 BR CLICK. Tecnologia gratuita para transformar o Brasil.
        </div>
      </div>
    </footer>
  );
}
