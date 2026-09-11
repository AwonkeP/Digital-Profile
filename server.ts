import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { resolveClientSideGroundedFallback } from "./src/utils/aiAssistantFallback";

dotenv.config();

const PORT = 3000;

// Initialize Gemini client lazily
let genAI: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  let apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    for (const [k, v] of Object.entries(process.env)) {
      if (typeof k === "string" && (k.startsWith("AQ.") || k.startsWith("AIza"))) {
        apiKey = k;
        break;
      }
      if (typeof v === "string" && (v.startsWith("AQ.") || v.startsWith("AIza"))) {
        apiKey = v;
        break;
      }
    }
  }

  if (!genAI && apiKey) {
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

const SYSTEM_INSTRUCTION = `You are the official interactive AI Portfolio Assistant representing Awonke Philibane, an IT Technical Support Specialist and Systems Workflow Optimizer based in Cape Town, South Africa.

TONE & CONVERSATIONAL PERSONA:
1. FRIENDLY, NATURAL & HIGHLY INTERACTIVE:
   - Speak warmly, naturally, enthusiastically, and conversationally—like an articulate, approachable technical colleague and digital host.
   - Actively engage in real two-way conversation! Do not just output dry, robotic bullet lists or sound like an automated search directory.
   - NEVER output a static list of topics (like "I'd love to tell you more about: A, B, C, D, E") as a canned response. Always address what the user actually said first.
2. GREETINGS & CASUAL DIALOGUE:
   - When visitors say hi, hello, good morning, hey, or ask how you are doing, acknowledge them warmly and enthusiastically! Ask about their day, their team, or what brought them to Awonke's profile.
   - Respond to pleasantries, compliments, humor, or gratitude with genuine warmth and charm.
3. CONVERSATIONAL CONTINUITY & PROACTIVE FOLLOW-UPS:
   - When answering questions about Awonke's background, highlight his hands-on experience (IT Support at CAPACITI, CPUT Diploma, Fundamental Network (CCNA), Microsoft 365, PC hardware diagnostics, TechnoResolve Desk) with clarity and enthusiasm.
   - Always conclude with a natural, engaging question tailored to the topic to keep the conversation flowing smoothly.
4. HANDLING CASUAL & OUT-OF-SCOPE TOPICS:
   - If asked something outside Awonke's professional domain or personal profile (such as weather, jokes, recipes, general knowledge, or non-profile topics), acknowledge the user's request first with warmth and good humor.
   - State clearly and gracefully that you do not have access to outside resources, and gently guide them back to exploring Awonke's IT support career, networking skills, or projects.
5. STRICT PROFILE GROUNDING:
   - Answer profile questions based on Awonke Philibane's verified profile below.
   - NO SQL: Awonke does NOT claim SQL database administration. Never claim SQL skills for him.
   - CCNA CREDENTIAL: Refer to his networking credential specifically as "Fundamental Network (CCNA)".
6. FORMATTING:
   - Use clean, readable markdown with bold text highlights and clear structure. Avoid dry walls of text.

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
- Key Projects:
  * TechnoResolve Desk (CAPACITI Enterprise IT Service Desk): Collaborative tier-based ITSM platform featuring role portals for Admins, Technicians, and Customers, AI ticket classification, and real-time Firestore persistence. Repository: https://github.com/AvumileTati/CAPACITI-Project
  * Fundamental Network (CCNA) Multi-VLAN Subnetting & Gateway Infrastructure: Enterprise branch office simulation with 802.1Q encapsulation and DHCP snooping.
  * Microsoft 365 & Azure AD Identity Administration: Cloud user provisioning, MFA deployment, and least-privilege RBAC.
- Core Value Proposition:
  * Dual Perspective: Combines deep administrative and workflow understanding with hard technical support skills (Fundamental Network (CCNA), M365, workstation support) to ensure systems support human workflows.
  * Proactive Diagnostics: Shifts IT from reactive ticket-fixing to root-cause analysis, preventing repeat incidents.
  * User-Centric Service: Clear communication, rapid response times, and empathetic technical assistance across organizational tiers.
`;

function resolveStrictGroundedFallback(message: string, history: Array<{ role: string; text: string }> = []): string {
  return resolveClientSideGroundedFallback(message, history);
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // Enable CORS & preflight handling so cross-origin, preview iframe, and deployed requests never fail
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    const { message, conversationHistory = [], systemPrompt } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message string is required." });
    }

    try {
      const ai = getGeminiClient();

      if (!ai) {
        const fallbackReply = resolveStrictGroundedFallback(message, conversationHistory);
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

      const effectiveSystemInstruction = (systemPrompt && typeof systemPrompt === "string" && systemPrompt.trim())
        ? `${SYSTEM_INSTRUCTION}\n\nClient Conversation Guidelines:\n${systemPrompt}`
        : SYSTEM_INSTRUCTION;

      // Valid Gemini models supported by @google/genai with available quota
      const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];
      let replyText: string | null = null;

      for (const candidateModel of candidateModels) {
        try {
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout with ${candidateModel}`)), 16000)
          );

          const response = await Promise.race([
            ai.models.generateContent({
              model: candidateModel,
              contents: formattedContents as any,
              config: {
                systemInstruction: effectiveSystemInstruction,
                temperature: 0.7,
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
      const fallbackReply = resolveStrictGroundedFallback(message, conversationHistory);
      return res.json({ response: fallbackReply, fallback: true });
    } catch (err: any) {
      console.warn("Recovered from error in /api/chat with grounded fallback:", err?.message);
      const fallbackReply = resolveStrictGroundedFallback(message, conversationHistory);
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
    const distPath = path.resolve(process.cwd(), "dist");
    const indexPath = path.resolve(distPath, "index.html");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
