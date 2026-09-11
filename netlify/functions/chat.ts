import { GoogleGenAI } from "@google/genai";

export default async (req: Request) => {
  // CORS preflight handling
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { message, systemPrompt, conversationHistory } = body || {};

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Valid message required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Hand off gracefully to client-side grounded fallback
      return new Response(JSON.stringify({ fallback: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const formattedContents = [];

    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory.slice(-8)) {
        if (item && item.text) {
          formattedContents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.text }],
          });
        }
      }
    }

    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const effectiveSystemInstruction = systemPrompt || "You are the AI Profile Assistant for Awonke Philibane.";
    const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];
    let replyText: string | null = null;

    for (const candidateModel of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: candidateModel,
          contents: formattedContents as any,
          config: {
            systemInstruction: effectiveSystemInstruction,
            temperature: 0.7,
          },
        });

        if (response.text && response.text.trim()) {
          replyText = response.text;
          break;
        }
      } catch {
        // Try next candidate model
      }
    }

    if (replyText) {
      return new Response(JSON.stringify({ response: replyText }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ fallback: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ fallback: true, error: error?.message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
