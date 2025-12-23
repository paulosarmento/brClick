import { BookOpen, Target, UserCheck } from "lucide-react";

export function About() {
  return (
    <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sobre o BR CLICK
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Educação tecnológica gratuita, inclusiva e feita para quem está
            começando.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-card text-card-foreground flex flex-col rounded-xl border-2 py-6 shadow-sm transition-colors hover:border-primary/50">
            <div className="px-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-2xl font-bold mb-4">O Que É</h3>

              <p className="text-muted-foreground leading-relaxed">
                Plataforma aberta de educação tech, criada para democratizar
                aprendizado com diversidade e inclusão.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-card text-card-foreground flex flex-col rounded-xl border-2 py-6 shadow-sm transition-colors hover:border-secondary/50">
            <div className="px-8">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>

              <h3 className="text-2xl font-bold mb-4">Como Funciona</h3>

              <p className="text-muted-foreground leading-relaxed">
                Módulos curtos, prática guiada, materiais acessíveis e suporte
                humano para não travar.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-card text-card-foreground flex flex-col rounded-xl border-2 py-6 shadow-sm transition-colors hover:border-accent/50">
            <div className="px-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-accent" />
              </div>

              <h3 className="text-2xl font-bold mb-4">Para Quem É</h3>

              <p className="text-muted-foreground leading-relaxed">
                Para iniciantes com computador e internet. Zero experiência
                prévia necessária, só vontade de evoluir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
