
import { GoogleGenAI, Type } from "@google/genai";
import { UserSelection, DiagnosisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Service to get professional, localized car diagnostic information.
 * Uses Gemini-3-flash-preview for high reasoning capabilities on technical tasks.
 */
export async function getDetailedDiagnosis(selection: UserSelection): Promise<DiagnosisResult> {
  const prompt = `
    ACT AS A WORLD-CLASS ALGERIAN CAR MECHANIC (SCANNER EXPERT).
    You have a database of over 500 OBD-II codes including manufacturer specific ones (Renault/Dacia DF codes, PSA codes, VAG codes).
    
    Vehicle Details:
    - Brand: ${selection.brand}
    - Model: ${selection.model}
    - Year: ${selection.year}
    - OBD Code: ${selection.obdCode}
    - Fault Category: ${selection.faultType}

    TASK:
    1. Provide a "REAL" diagnosis, not a generic one. If the code implies a specific part common to this model (e.g., injector failure on Clio 4 dCi), mention it.
    2. LANGUAGE: 
       - Standard Arabic: Professional technical explanation.
       - Algerian Darija: Use raw mechanic slang (bougies, thermosta, shatmo, l'injecteurs, pompou taa lma, radiateur, dima-reur, debimetre, vanne EGR, turbo, culasse, joint de culasse, etc.). 
       - Example: "شوف التيرمو سطا تاع بلاك ما تحلش في الوقت، ولا الكومبريسور راه شايط".
    3. SOLUTION: Detailed steps to fix it in a local workshop.
    4. COST: Estimate in Algerian Dinar (DZD), accounting for local parts market (genuine vs "cassa").
    5. RISK: 1-10 level based on engine safety.
    6. CHART DATA: 5-7 data points showing a sensor reading failing (e.g., pressure drop, temperature spike).

    OUTPUT FORMAT: JSON ONLY.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING },
          standardArabic: { type: Type.STRING },
          algerianDarija: { type: Type.STRING },
          solution: { type: Type.STRING },
          estimatedCost: { type: Type.STRING },
          riskLevel: { type: Type.NUMBER },
          chartData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                value: { type: Type.NUMBER },
              },
            },
          },
          impactedParts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["code", "standardArabic", "algerianDarija", "solution", "estimatedCost", "riskLevel", "chartData"],
      },
    },
  });

  try {
    const text = response.text;
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse AI response:", e);
    throw new Error("فشل النظام في تحليل الكود. تأكد من صحة الكود والمحاولة مرة أخرى.");
  }
}
