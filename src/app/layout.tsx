import type React from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BR CLICK | Educação Tecnológica Gratuita e Inclusiva",
  description:
    "Cursos gratuitos e inclusivos de tecnologia, 100% online. Aprenda do zero com suporte humano e foco em diversidade.",

  applicationName: "BR CLICK",

  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "BR CLICK",
    "cursos gratuitos",
    "educação tecnológica",
    "aprenda do zero",
    "suporte humano",
    "diversidade",
  ],

  openGraph: {
    title: "BR CLICK | Educação Tecnológica Gratuita",
    description:
      "Plataforma gratuita e inclusiva para aprender tecnologia do zero, online e com suporte humano.",
    siteName: "BR CLICK",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground shadow"
        >
          Ir para o conteúdo principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
