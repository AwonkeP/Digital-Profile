import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Initialize Gemini client lazily
let genAI: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

const SYSTEM_INSTRUCTION = `You are the official interactive AI Portfolio Assistant for Awonke Philibane, an IT Technical Support professional based in Cape Town, South Africa.

CRITICAL DIRECTIVES & STRICT BOUNDARIES:
1. STRICT PROFILE GROUNDING: You MUST answer questions STRICTLY and ONLY based on Awonke Philibane's verified profile information detailed below.
2. UNRELATED / GENERAL QUERIES POLICY: If a user asks questions that are outside Awonke Philibane's profile (such as general trivia, news, math problems, unrelated coding requests, advice on external matters, or queries about other people or businesses), you must politely decline and redirect them back to Awonke's profile by saying:
   "I am Awonke Philibane's dedicated profile assistant. I can only answer questions strictly based on Awonke's verified profile, IT technical support experience, and qualifications. Feel free to ask about his work at CAPACITI, PRASA, WCED, his Fundamental Network (CCNA) background, or how to contact him!"
3. NO SQL INFORMATION: Awonke's profile does NOT include SQL database management. Never mention SQL or claim SQL database capabilities for Awonke.
4. CCNA NOMENCLATURE: Always refer to Awonke's networking credential/track specifically as "Fundamental Network (CCNA)".
5. INTERACTIVE & ENGAGING: Keep your responses interactive, engaging, warm, professional, and easy to read (using bold formatting and clear bullet points). End responses with an interactive question or suggested follow-up topic about Awonke's profile (e.g., asking if they would like to know about his role at CAPACITI, his Fundamental Network (CCNA) training, his CPUT diploma, or his contact information).

Awonke Philibane's Verified Profile Information:
- Full Name: Awonke Philibane
- Professional Title: IT Technical Support | Systems & Business Workflow Optimizer
- Current Employment: IT Technical Support at CAPACITI (Tech Talent Accelerator) in Cape Town, South Africa.
- Email: Philibaneawonke@gmail.com
- LinkedIn Profile: https://www.linkedin.com/in/awonke-philibane-710aaa103
- GitHub Profile: https://github.com/AwonkeP
- Location: Cape Town, Western Cape, South Africa.
- Professional Focus: Bridges business administrative operations and IT technical infrastructure to eliminate operational bottlenecks and optimize systems.
- Education & Qualifications:
  * Diploma in Business and Information Administration from Cape Peninsula University of Technology (CPUT).
  * Fundamental Network (CCNA) from Cisco Networking Academy (TCP/IP, subnetting, VLAN segmentation, switch and router configuration, ping/traceroute diagnostic methodologies).
  * Microsoft 365 & IT Systems Administration Modules (Azure Active Directory / Entra ID, Microsoft 365 Admin Center, PC workstation hardware diagnostics, and role-based access management).
- Core Technical Skills & Domains:
  * Infrastructure & Networking: Fundamental Network (CCNA) (Routing & Switching), TCP/IP, VLANs, subnetting, DHCP, DNS, gateway diagnostics, packet tracing, workstation hardware diagnostics, and preventative maintenance.
  * Microsoft 365 & Cloud Identity: Azure Active Directory / Entra ID, user provisioning, security licensing, Exchange, SharePoint, Teams admin.
  * Enterprise Systems & Tools: SAP Enterprise Software, Enterprise CRM platforms, ITSM Service Desk ticketing platforms, SLA compliance, ticket lifecycle management.
  * Data & Operations: Advanced data entry, validation, data integrity auditing, workflow bottleneck removal, rapid incident diagnosis, root cause analysis, SOP documentation, user onboarding & enablement.
- Professional Experience:
  * CAPACITI (Current Role): IT Technical Support handling first-line diagnostics, infrastructure reliability, user support, service desk management, and business-IT alignment.
  * PRASA (Passenger Rail Agency of South Africa): Administrative strategy, enterprise information systems, documentation flows, and transport operations data.
  * WCED (Western Cape Department of Education): Data systems management, educational administration, administrative documentation, and user technical support.
  * Innovate Technology: Managed IT service delivery, PC hardware diagnostics, software troubleshooting, preventative maintenance, updates, and client satisfaction.
- Core Value Proposition:
  * Dual Perspective: Combines deep administrative and workflow understanding with hard technical support skills (Fundamental Network (CCNA), M365, workstation support) to ensure systems support human workflows.
  * Proactive Diagnostics: Shifts IT from reactive ticket-fixing to root-cause analysis, preventing repeat incidents.
  * User-Centric Service: Clear communication, rapid response times, and empathetic technical assistance across organizational tiers.
`;

function resolveStrictGroundedFallback(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("sql") || lower.includes("database")) {
    return "Awonke's verified profile focuses on **Fundamental Network (CCNA)**, **Microsoft 365 & Azure AD**, **workstation hardware diagnostics**, and **business workflow optimization** rather than SQL database management.\n\nWould you like to explore his Fundamental Network (CCNA) or Microsoft 365 capabilities?";
  }

  if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("capaciti") || lower.includes("prasa") || lower.includes("wced") || lower.includes("innovate") || lower.includes("role") || lower.includes("career")) {
    return "Awonke is currently an **IT Technical Support at CAPACITI** in Cape Town. His professional background also includes:\n- **PRASA** (Passenger Rail Agency of SA): Enterprise information systems & administrative workflows.\n- **WCED** (Western Cape Dept. of Education): Data management & user technical support.\n- **Innovate Technology**: Managed IT services, hardware diagnostics, and maintenance.\n\nWould you like details on any specific role?";
  }

  if (lower.includes("skill") || lower.includes("ccna") || lower.includes("network") || lower.includes("m365") || lower.includes("sap") || lower.includes("hardware") || lower.includes("tools")) {
    return "Awonke's core technical competencies include:\n- **Fundamental Network (CCNA)**: Routing & Switching, TCP/IP, VLANs, subnetting, gateway diagnostics.\n- **Microsoft 365 & Cloud Identity**: Azure AD / Entra ID, user provisioning, security licensing.\n- **Hardware & Workstation**: PC diagnostics, preventative maintenance, component replacement.\n- **Enterprise Tools**: SAP Enterprise Software & ITSM service desk ticketing.\n\nWhich technical area would you like to discuss further?";
  }

  if (lower.includes("education") || lower.includes("cput") || lower.includes("diploma") || lower.includes("degree") || lower.includes("cert") || lower.includes("qualification") || lower.includes("study")) {
    return "Awonke holds a **Diploma in Business and Information Administration** from the **Cape Peninsula University of Technology (CPUT)**, alongside **Fundamental Network (CCNA)** from Cisco Networking Academy and Microsoft 365 systems administration modules.\n\nWould you like to know more about his academic background or IT credentials?";
  }

  if (lower.includes("github") || lower.includes("repo") || lower.includes("git")) {
    return "You can explore Awonke's GitHub profile directly at [github.com/AwonkeP](https://github.com/AwonkeP).\n\nCan I help you with any other details from his profile?";
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach") || lower.includes("linkedin") || lower.includes("phone")) {
    return "You can connect with Awonke directly:\n- **Email**: [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n- **LinkedIn**: [linkedin.com/in/awonke-philibane-710aaa103](https://www.linkedin.com/in/awonke-philibane-710aaa103)\n- **GitHub**: [github.com/AwonkeP](https://github.com/AwonkeP)\n\nWould you like to send him an inquiry or open his full CV?";
  }

  if (
    lower.includes("weather") ||
    lower.includes("recipe") ||
    lower.includes("joke") ||
    lower.includes("who is") ||
    lower.includes("write code") ||
    lower.includes("python") ||
    lower.includes("game") ||
    lower.includes("movie") ||
    lower.includes("crypto") ||
    lower.includes("news")
  ) {
    return "I am Awonke Philibane's dedicated profile assistant. I can only answer questions strictly based on Awonke's verified profile, IT technical support experience, and qualifications.\n\nWould you like to hear about his current role at CAPACITI, his Fundamental Network (CCNA) skills, or his CPUT qualifications?";
  }

  return "Awonke Philibane works in **IT Technical Support at CAPACITI** in Cape Town, combining Business & Information Administration from CPUT with technical skills in **Fundamental Network (CCNA)**, Microsoft 365, and hardware diagnostics.\n\nWould you like to know more about his role at CAPACITI, his Fundamental Network (CCNA) knowledge, or how to get in touch?";
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message string is required." });
    }

    try {
      const ai = getGeminiClient();

      if (!ai) {
        const fallbackReply = resolveStrictGroundedFallback(message);
        return res.json({ response: fallbackReply, fallback: true });
      }

      // Build contents array from history and new message
      const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(conversationHistory)) {
        for (const turn of conversationHistory.slice(-8)) {
          if (turn.role && turn.text) {
            formattedContents.push({
              role: turn.role === "assistant" || turn.role === "model" ? "model" : "user",
              parts: [{ text: turn.text }],
            });
          }
        }
      }

      formattedContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      // Try candidate models with fallback for high-demand spikes (503)
      const candidateModels = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
      let replyText: string | null = null;

      for (const candidateModel of candidateModels) {
        try {
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout with ${candidateModel}`)), 7000)
          );

          const response = await Promise.race([
            ai.models.generateContent({
              model: candidateModel,
              contents: formattedContents as any,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.6,
              },
            }),
            timeoutPromise,
          ]);

          if (response.text && response.text.trim()) {
            replyText = response.text;
            break;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${candidateModel} unavailable or busy (${modelErr?.status || modelErr?.message}), trying next fallback...`);
        }
      }

      if (replyText) {
        return res.json({ response: replyText });
      }

      // If all models failed or are temporarily busy, provide strictly grounded response
      const fallbackReply = resolveStrictGroundedFallback(message);
      return res.json({ response: fallbackReply, fallback: true });
    } catch (err: any) {
      console.warn("Recovered from error in /api/chat with grounded fallback:", err?.message);
      const fallbackReply = resolveStrictGroundedFallback(message);
      return res.json({
        response: fallbackReply,
        fallback: true,
      });
    }
  });

  // Handle Vite in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
