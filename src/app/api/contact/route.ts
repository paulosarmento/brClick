import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const bodySchema = z.object({
  name: z.string().optional(),
  socialName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  address: z.string().optional(),
  selfDeclaration: z.string().optional(),
  isPcd: z.string().optional(),
  pcdType: z.string().optional(),
  pcdDescription: z.string().optional(),
  needsAccessibility: z.string().optional(),
  socialProgram: z.string().optional(),
  availability: z.string().optional(),
  discovery: z.string().optional(),
  message: z.string().optional(),
});

const normalizePhone = (phone?: string) =>
  phone ? phone.replace(/\D/g, "") : "";

const normalizeText = (value?: string, fallback = "-") =>
  value && value.trim().length > 0 ? value.trim() : fallback;

export async function POST(request: Request) {
  try {
    if (!process.env.WEBHOOK_URL) {
      throw new Error("WEBHOOK_URL não configurada");
    }

    const body = await request.json();

    const parsed = bodySchema.safeParse(body);

    const data = parsed.success ? parsed.data : {};

    const messageData = {
      content: "📩 Nova inscrição BR CLICK",
      embeds: [
        {
          title: "Nova Inscrição - BR CLICK",
          color: 0x4983f5,
          fields: [
            {
              name: "Nome Completo",
              value: normalizeText(data.name),
              inline: true,
            },
            {
              name: "Nome Social",
              value: normalizeText(data.socialName),
              inline: true,
            },
            { name: "E-mail", value: normalizeText(data.email), inline: false },
            {
              name: "Telefone",
              value: normalizePhone(data.phone) || "Não informado",
              inline: true,
            },
            { name: "Gênero", value: normalizeText(data.gender), inline: true },
            {
              name: "Data de Nascimento",
              value: normalizeText(data.birthDate),
              inline: true,
            },
            { name: "CPF", value: normalizeText(data.cpf), inline: true },
            { name: "RG", value: normalizeText(data.rg), inline: true },
            {
              name: "Endereço",
              value: normalizeText(data.address),
              inline: false,
            },
            {
              name: "Autodeclaração",
              value: normalizeText(data.selfDeclaration),
              inline: true,
            },
            { name: "É PcD?", value: normalizeText(data.isPcd), inline: true },
            {
              name: "Tipo de Deficiência",
              value: normalizeText(data.pcdType),
              inline: true,
            },
            {
              name: "Descrição PcD",
              value: normalizeText(data.pcdDescription),
              inline: false,
            },
            {
              name: "Precisa de Acessibilidade",
              value: normalizeText(data.needsAccessibility),
              inline: true,
            },
            {
              name: "Programa Social",
              value: normalizeText(data.socialProgram),
              inline: true,
            },
            {
              name: "Disponibilidade",
              value: normalizeText(data.availability),
              inline: true,
            },
            {
              name: "Como Conheceu",
              value: normalizeText(data.discovery),
              inline: false,
            },
            {
              name: "Observações",
              value: normalizeText(data.message, "Nenhuma observação"),
              inline: false,
            },
          ],
        },
      ],
    };

    await axios.post(process.env.WEBHOOK_URL, messageData, {
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json({ success: true });
  }
}
