import { Accessibility, HandHeart, ShieldCheck } from "lucide-react";
import { siteContent } from "../lib/data";

export function Features() {
  const iconMap = {
    shield: ShieldCheck,
    accessibility: Accessibility,
    handshake: HandHeart,
  } as const;

  return (
    <section
      id="por-que"
      className="bg-background px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="pilares-title"
    >
      <div className="container mx-auto max-w-5xl space-y-12">
        {/* Cabeçalho */}
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Por que BR CLICK
          </p>

          <h2
            id="pilares-title"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Simples, gratuito e pronto para você começar
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em 5 segundos você entende: é online, gratuito, acessível e com
            apoio humano.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteContent.features.map((pillar) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap];

            return (
              <div
                key={pillar.title}
                className="
                  group
                  rounded-2xl
                  border border-border
                  bg-card
                  p-6
                  shadow-sm
                  transition-all
                  hover:-translate-y-1
                  hover:border-primary/60
                  hover:shadow-md
                  focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
                "
              >
                {/* Ícone */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>

                {/* Título */}
                <h3 className="mt-4 text-xl font-semibold text-card-foreground">
                  {pillar.title}
                </h3>

                {/* Descrição */}
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
