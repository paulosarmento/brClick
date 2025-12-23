import { ArrowRight, Brain, Code, Layout } from "lucide-react";
import { siteContent } from "../lib/data";

export function Courses() {
  const iconMap = {
    code: Code,
    layout: Layout,
    brain: Brain,
  } as const;

  return (
    <section
      id="cursos"
      className="bg-background px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="cursos-title"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 mb-12">
          <h2
            id="cursos-title"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Como funciona: três passos claros
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa saber para começar hoje: inscrição, estudo e
            publicação do seu primeiro projeto.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {siteContent.courses.map((course) => {
            const Icon = iconMap[course.icon as keyof typeof iconMap];

            return (
              <div
                key={course.title}
                className="
                  flex h-full flex-col
                  rounded-xl border border-border
                  bg-card shadow-sm
                "
              >
                {/* Header */}
                <div className="px-6 pt-6">
                  <div
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${course.badgeClass}`}
                  >
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>

                  <h3 className="text-2xl font-semibold text-card-foreground">
                    {course.title}
                  </h3>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-1 flex-col gap-5 px-6 py-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>

                  <ul className="space-y-2">
                    {course.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center gap-2 text-sm text-card-foreground/80"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${course.dotClass}`}
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>

                  {/* Botão */}
                  <button
                    className="
                      mt-auto
                      inline-flex w-full items-center justify-center gap-2
                      rounded-lg
                      border border-border
                      bg-background px-5 py-3
                      text-sm font-semibold text-foreground
                      shadow-sm
                      transition-all
                      hover:bg-muted hover:shadow-md
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      active:scale-[0.98]
                    "
                    aria-label={`Quero aprender sobre ${course.title}`}
                  >
                    Quero aprender
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
