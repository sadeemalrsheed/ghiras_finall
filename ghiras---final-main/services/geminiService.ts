import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { PlantDiagnosisResult } from "../types";

// Initialize Gemini Client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. Mocking responses.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzePlantImage = async (base64Image: string): Promise<PlantDiagnosisResult> => {
  const ai = getClient();

  // If no API key or mock mode needed
  if (!ai) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          plantName: "Tomato (Mock)",
          isHealthy: false,
          confidence: 88,
          diseaseName: "Early Blight",
          treatments: [
            "Remove infected leaves immediately.",
            "Apply copper-based fungicide.",
            "Improve air circulation around the plant."
          ],
          tips: [
            "Water at the base, not on leaves.",
            "Rotate crops next season."
          ]
        });
      }, 2000);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `Analyze this plant image. 
            Return a JSON object with the following structure:
            {
              "plantName": "string",
              "isHealthy": boolean,
              "confidence": number (0-100),
              "diseaseName": "string or null",
              "treatments": ["string", "string"] (empty if healthy),
              "tips": ["string", "string"]
            }
            Ensure the language of the response matches the detected input language or defaults to English if ambiguous, but preferably provide bilingual context if possible or stick to English for consistency in data structure.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plantName: { type: Type.STRING },
            isHealthy: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            diseaseName: { type: Type.STRING, nullable: true },
            treatments: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["plantName", "isHealthy", "confidence", "treatments", "tips"]
        }
      }
    });

    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr) as PlantDiagnosisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze image");
  }
};

export const createChatSession = (): Chat | null => {
  const ai = getClient();
  if (!ai) return null;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are AgriBot, an expert agricultural assistant for a smart farming platform in Saudi Arabia.
      Your capabilities:
      1. Diagnose plant diseases conceptually.
      2. Explain how NPK sensors and soil moisture sensors work.
      3. Advise on crops suitable for Saudi regions (Central, East, West, South, North).
      4. Speak both Arabic and English fluently. Detect the user's language and reply in the same language.
      
      Keep answers concise, helpful, and encouraging.`,
    }
  });
};
