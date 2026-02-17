
import { GoogleGenAI, Type } from "@google/genai";

// Use gemini-3-flash-preview for basic text tasks like quote generation and study planning.
export const getDailyQuote = async (daysLeft: number) => {
  // Always initialize GoogleGenAI using the process.env.API_KEY directly.
  // Creating a new instance before the call ensures it uses the most current API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `請針對一位正準備 116 學年度統測（距離考試還有 ${daysLeft} 天）的台灣高職考生，提供一段非常有力量、正向且溫暖的勵志金句。並以 JSON 格式回傳，包含 text (金句內容) 和 author (作者 or 來源)。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          author: { type: Type.STRING }
        },
        required: ["text", "author"]
      }
    }
  });
  // Use the .text property directly as it is a getter returning the extracted string.
  return JSON.parse(response.text || '{}');
};

export const generateStudyPlan = async (subject: string, remainingDays: number) => {
  // Always initialize GoogleGenAI using the process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `針對 116 統測考生，目前距離考試還有 ${remainingDays} 天。請針對科目「${subject}」提供一個簡短但具體的讀書計畫建議。內容包含目前的重點方向與應對策略。請以繁體中文回答。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subject: { type: Type.STRING },
          goal: { type: Type.STRING, description: "本階段的主要目標" },
          advice: { type: Type.STRING, description: "具體的讀書建議" }
        },
        required: ["subject", "goal", "advice"]
      }
    }
  });
  // Use the .text property directly as it is a getter returning the extracted string.
  return JSON.parse(response.text || '{}');
};
