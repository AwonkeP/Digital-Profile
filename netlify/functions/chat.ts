import { GoogleGenAI } from "@google/genai";

// Grounded fallback response generator in case API key is exhausted or unavailable
function getGroundedProfileReply(query: string): string {
  const lower = (query || "").toLowerCase();

  if (lower.includes("capaciti") || lower.includes("role") || lower.includes("current") || lower.includes("job")) {
    return "Awonke currently works as an **IT Technical Support Specialist at CAPACITI** in Cape Town. His primary responsibilities include:\n\n- **First-Line Diagnostic Support:** Troubleshooting workstation hardware, OS environments, and user client issues.\n- **Service Desk Administration:** Managing ticketing workflows to meet strict SLA response times.\n- **Business-IT Alignment:** Optimizing workflows and identity management with Microsoft 365 and Azure AD (Entra ID).\n\nWould you like to know more about his specific technical achievements or the projects he has built?";
  }

  if (lower.includes("ccna") || lower.includes("network") || lower.includes("vlan") || lower.includes("switch") || lower.includes("router")) {
    return "Awonke holds the **Fundamental Network (CCNA)** credential through the Cisco Networking Academy. His core networking capabilities include:\n\n- **Routing & Switching:** Switch port configuration, inter-VLAN routing, and static/dynamic routing basics.\n- **Segmentation & Security:** 802.1Q VLAN trunking and subnet segmentation.\n- **Protocols & Diagnostics:** TCP/IP, DHCP snooping, DNS, and systematic troubleshooting using ping and traceroute.\n\nHe has also simulated enterprise multi-branch office architectures with full VLAN segregation.";
  }

  if (lower.includes("cput") || lower.includes("education") || lower.includes("diploma") || lower.includes("qualification")) {
    return "Awonke earned his **Diploma in Business and Information Administration** from the **Cape Peninsula University of Technology (CPUT)**.\n\nThis academic background provides him with a unique blend of IT technical capability and structured business process administration—allowing him to align technology systems with organizational productivity.";
  }

  if (lower.includes("technoresolve") || lower.includes("project")) {
    return "One of Awonke's key showcase projects is the **TechnoResolve Desk**:\n\n- **Purpose:** A collaborative enterprise IT service desk platform engineered to streamline ticket lifecycles.\n- **Capabilities:** Tier-based support routing, SLA prioritization, hardware asset tracking, and AI-assisted classification.\n- **Focus:** Minimizing resolution times and providing clear operational audit trails.";
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("hire") || lower.includes("phone")) {
    return "You can connect with Awonke directly:\n\n- **Email:** [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n- **Location:** Cape Town, Western Cape, South Africa\n- **LinkedIn / GitHub:** Available on this portfolio's header and contact section.\n\nFeel free to reach out for IT technical support, systems administration, or workflow optimization opportunities!";
  }

  return "Hello! I am Awonke Philibane's interactive AI Profile Assistant.\n\nI can answer any questions about his **IT Technical Support role at CAPACITI**, his **Fundamental Network (CCNA)** credentials, his **Diploma in Business & Information Administration (CPUT)**, or his **TechnoResolve Desk** service platform.\n\nWhat would you like to explore?";
}

// Universal response generator
async function executeChatLogic(bodyData: any): Promise<{ statusCode: number; headers: Record<string, string>; body: string }> {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  try {
    const { message, systemPrompt, conversationHistory } = bodyData || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "A non-empty message string is required." }),
      };
    }

    // Resolve API key in priority order:
    // 1. Google_API_Key (exact Netlify environment variable)
    // 2. GEMINI_API_KEY
    // 3. GOOGLE_API_KEY
    // 4. Any key in env starting with AQ. or AIza
    let chosenKey =
      process.env.Google_API_Key ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.API_KEY;

    if (!chosenKey) {
      for (const [k, v] of Object.entries(process.env)) {
        if (typeof v === "string" && (v.startsWith("AQ.") || v.startsWith("AIza"))) {
          chosenKey = v;
          break;
        }
      }
    }

    // If no key is found, safely return grounded profile response
    if (!chosenKey) {
      const fallbackReply = getGroundedProfileReply(message);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ response: fallbackReply, fallback: true }),
      };
    }

    // Prevent @google/genai from prioritizing an un-enabled Firebase GOOGLE_API_KEY
    if (chosenKey.startsWith("AQ.") && process.env.GOOGLE_API_KEY && !process.env.GOOGLE_API_KEY.startsWith("AQ.")) {
      delete process.env.GOOGLE_API_KEY;
    }

    const ai = new GoogleGenAI({ apiKey: chosenKey });

    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
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

    const effectiveSystemInstruction =
      systemPrompt ||
      "You are the interactive AI Profile Assistant for Awonke Philibane. Ground your answers strictly in his verified IT Technical Support profile at CAPACITI, Cisco CCNA networking credentials, and CPUT diploma.";

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
      } catch (genErr: any) {
        console.warn(`Model ${candidateModel} failed: ${genErr?.status || genErr?.message}`);
      }
    }

    if (replyText) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ response: replyText }),
      };
    }

    // Graceful fallback if quota or model is temporarily unavailable
    const fallbackReply = getGroundedProfileReply(message);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: fallbackReply, fallback: true }),
    };
  } catch (err: any) {
    console.error("Netlify chat error:", err);
    const fallbackReply = getGroundedProfileReply(bodyData?.message || "");
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: fallbackReply, fallback: true, error: err?.message }),
    };
  }
}

// Netlify Functions V1 / AWS Lambda export (Universal Compatibility)
export const handler = async (event: any, context: any) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed. Use POST." }),
    };
  }

  let body = {};
  try {
    body = typeof event.body === "string" ? JSON.parse(event.body) : (event.body || {});
  } catch {
    body = {};
  }

  return await executeChatLogic(body);
};

// Netlify Functions V2 export (Web Request/Response)
export default async function (req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const result = await executeChatLogic(body);
  return new Response(result.body, {
    status: result.statusCode,
    headers: result.headers,
  });
}
