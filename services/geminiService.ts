
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const lookupWord = async (word: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the English word "${word}" for an English learner. Provide a definition, Chinese translation, and a natural example sentence.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            definition: { type: Type.STRING },
            translation: { type: Type.STRING },
            example: { type: Type.STRING }
          },
          required: ["word", "definition", "translation", "example"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Lookup Error:", error);
    return null;
  }
};

export const generateSummary = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following text in 2-3 concise sentences for a language learner:\n\n${content.substring(0, 2000)}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Failed to generate summary.";
  }
};
