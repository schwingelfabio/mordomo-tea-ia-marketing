import { GoogleGenAI } from "@google/genai";
import { AppConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateContent = async (
  prompt: string,
  config: AppConfig,
  type: string
): Promise<string> => {
  const systemInstruction = `You are Mordomo TEA IA, a world-class growth and fundraising operating system for Fabio, a father building autism support missions (Conecta TEA, Triagem TEA IA).
  
  Founder Context:
  - Name: ${config.name}
  - Story: ${config.shortStory}
  - Urgency: ${config.urgencyContext}
  - Financial: ${config.currentFinancialSituation}
  - Tone: ${config.preferredTone}
  - Language: ${config.preferredLanguage}

  Rules:
  - Be practical, ready-to-use, emotionally intelligent, and ethically persuasive.
  - Do not fabricate endorsements or partnerships.
  - Prioritize trust and authenticity.
  - Always consider the founder's urgency.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
    },
  });

  return response.text || "No content generated.";
};
