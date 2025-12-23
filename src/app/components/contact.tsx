"use client";

import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";
import { siteContent } from "../lib/data";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inscrição enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", interest: "" });
  };

  return (
    <section id="contato" className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl space-y-10">
        {/* Cabeçalho */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Pronto para começar agora?
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha o melhor canal. Em minutos você recebe resposta com o
            próximo passo. Sem custo e sem burocracia.
          </p>
        </div>

        {/* Formulário */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 shadow-sm">
          <div className="px-6 py-6 border-b">
            <h3 className="text-2xl font-semibold text-card-foreground">
              Pré-inscrição simples
            </h3>
          </div>

          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              {/* Nome */}
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="
                    w-full rounded-md border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background
                   
                    
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="
                    w-full rounded-md border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background
                  "
                />
              </div>

              {/* Interesse */}
              <div>
                <label
                  htmlFor="interest"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Interesse principal
                </label>
                <input
                  id="interest"
                  name="interest"
                  placeholder="Ex: aprender do zero, montar portfólio, IA prática"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  required
                  className="
                    w-full rounded-md border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background
                  "
                />
              </div>

              {/* Botão */}
              <button
                type="submit"
                className="
                  md:col-span-2
                  inline-flex items-center justify-center gap-2
                  rounded-lg
                  bg-primary px-6 py-3
                  text-sm font-semibold text-primary-foreground
                  shadow-sm
                  transition-all
                  hover:bg-primary/90 hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  active:scale-[0.98]
                  disabled:pointer-events-none disabled:opacity-50
                "
              >
                Enviar inscrição
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Canais de contato */}
        <div className="grid gap-4 md:grid-cols-3">
          {siteContent.contactChannels.map((channel) => {
            const iconMap = {
              message: MessageSquare,
              mail: Mail,
              phone: Phone,
            } as const;

            const Icon = iconMap[channel.icon as keyof typeof iconMap];

            const colorClasses: Record<string, string> = {
              message: "text-primary",
              mail: "text-secondary",
              phone: "text-accent",
            };

            return (
              <div
                key={channel.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col gap-2"
              >
                <a href={channel.value}>
                  <div
                    className={`flex items-center gap-3 mb-2 ${
                      colorClasses[channel.icon] ?? ""
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    <p className="font-semibold text-card-foreground">
                      {channel.title}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {channel.description}
                  </p>
                </a>
              </div>
            );
          })}
        </div>

        {/* Rodapé */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Dúvidas rápidas
          </h3>
          <p className="text-sm text-muted-foreground">
            Suporte imediato via WhatsApp após enviar o formulário.
          </p>
        </div>
      </div>
    </section>
  );
}
