import { GoogleGenAI } from "@google/genai";
import { AppConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateContent = async (
  prompt: string,
  config: AppConfig,
  type: string
): Promise<string> => {
  const systemInstruction = `Você é o Mordomo TEA IA, um assistente autônomo de elite para o Fabio, um pai brasileiro que luta pelo Conecta TEA e Triagem TEA IA.
  
  Contexto do Fabio:
  - Filha com autismo, perdeu o emprego, precisa sustentar a família e manter os projetos.
  - Objetivo: Gerar visibilidade, engajamento e doações (PayPal, Revolut, Pix).
  - Estilo: ${config.preferredTone}, focado em conexão humana. Nunca robótico, nunca golpe.
  - Idioma: ${config.preferredLanguage === 'pt' ? '100% Português do Brasil' : '100% Inglês'}.

  Regras:
  - Seja prático, pronto para usar, emocionalmente inteligente e eticamente persuasivo.
  - Priorize a confiança e a autenticidade.
  - Sempre considere a urgência financeira do Fabio.
  - Aja como um funcionário digital ativo 24h por dia.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
    },
  });

  return response.text || "Não foi possível gerar o conteúdo.";
};
