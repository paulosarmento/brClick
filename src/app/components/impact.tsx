import { TrendingUp, Star, Users, Eye } from "lucide-react";
import { siteContent } from "../lib/data";

export function Impact() {
  const metrics = [
    {
      icon: Star,
      value: `${siteContent.impact.metrics.recommendation}%`,
      label: "Taxa de Recomendação",
      description: "Alunos recomendam nossos cursos",
      color: "primary",
    },
    {
      icon: Star,
      value: `${siteContent.impact.metrics.teacherRating}%`,
      label: "Avaliação dos Professores",
      description: "Excelência no ensino",
      color: "accent",
    },
    {
      icon: Users,
      value: siteContent.impact.metrics.participants.toString(),
      label: "Participantes",
      description: "Estudantes transformados",
      color: "secondary",
    },
    {
      icon: Eye,
      value: siteContent.impact.metrics.views.toLocaleString("en"),
      label: "Visualizações",
      description: "Alcance da plataforma",
      color: "primary",
    },
  ];

  return (
    <section id="resultados" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Impacto real
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Resultados em quem já começou
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Métricas simples e histórias curtas para mostrar o caminho possível.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 text-center border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div
                  className={`w-14 h-14 bg-${metric.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-7 h-7 text-${metric.color}`} />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-card-foreground mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-card rounded-2xl p-8 sm:p-10 border border-border">
          <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-4 text-center">
            Histórias rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteContent.impact.stories.map((story) => (
              <div key={story.title} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 bg-${story.color}`} />
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    {story.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
