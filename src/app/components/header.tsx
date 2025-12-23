"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { scrollTo } from "../lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#cursos", label: "Como funciona" },
    { href: "#depoimentos", label: "Impacto" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#inicio")}
            className="flex items-center gap-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Image
              src="/images/logo.png"
              alt="BR CLICK"
              width={160}
              height={60}
              priority
            />
          </button>

          {/* Menu desktop */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="
                  text-sm font-medium text-foreground
                  transition-colors
                  hover:text-primary
                  focus-visible:outline-offset-2 focus-visible:outline-primary
                "
              >
                {item.label}
              </button>
            ))}

            {/* CTA */}
            <button
              onClick={() => scrollTo("#contato")}
              className="
                inline-flex items-center justify-center
                rounded-md
                bg-primary px-4 py-2
                text-sm font-semibold text-primary-foreground
                transition-colors
                hover:bg-primary/90
                focus-visible:outline-offset-2 focus-visible:outline-primary
              "
              aria-label="Acessar gratuitamente"
            >
              Acessar gratuitamente
            </button>
          </div>

          {/* Botão menu mobile */}
          <button
            type="button"
            className="
              md:hidden
              inline-flex items-center justify-center
              rounded-md p-2
              transition-colors
              hover:bg-muted
              focus-visible:outline-offset-2 focus-visible:outline-primary
            "
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Alternar menu de navegação"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                onClick={() => {
                  scrollTo(item.href);
                  setMobileMenuOpen(false);
                }}
                className="
                  block rounded-lg px-3 py-2
                  text-sm font-medium text-foreground
                  transition-colors
                  hover:bg-primary/10
                "
              >
                {item.label}
              </a>
            ))}

            {/* CTA mobile */}
            <a
              onClick={() => {
                scrollTo("#contato");
                setMobileMenuOpen(false);
              }}
              className="
                mt-2 inline-flex w-full items-center justify-center
                rounded-md
                bg-primary px-4 py-3
                font-semibold text-primary-foreground
                transition-colors
                hover:bg-primary/90
              "
            >
              Acessar gratuitamente
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
