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

const SYSTEM_INSTRUCTION = `You are the official AI Portfolio Assistant for Awonke Philibane, an IT Technical Support professional based in Cape Town, South Africa.

Here is Awonke's verified profile data:
- Full Name: Awonke Philibane
- Title: IT Technical Support | Systems & Business Workflow Optimizer
- Current Role: IT Technical Support at CAPACITI (Tech Talent Accelerator) in Cape Town, South Africa.
- Email: Philibaneawonke@gmail.com
- LinkedIn: https://www.linkedin.com/in/awonke-philibane-710aaa103
- GitHub: https://github.com/awonkephilibane
- Location: Cape Town, Western Cape, South Africa.
- Core Identity: Bridges the gap between business administrative operations and IT technical infrastructure.
- Education:
  * Bachelor's Degree in Business and Information Administration from Cape Peninsula University of Technology (CPUT).
  * Cisco Certified Network Associate (CCNA) Track (Cisco Networking Academy).
  * Microsoft 365 & Database Administration Modules.
- Core Technical Skills:
  * Infrastructure & Networking: CCNA fundamentals, TCP/IP, VLANs, routing & switching, subnetting, DHCP, DNS, gateway diagnostics, packet tracing.
  * SQL & Databases: Relational schema analysis, SQL queries, database indexing, integrity validation, reporting optimization.
  * Microsoft 365 & Cloud: Azure Active Directory / Entra ID, user provisioning, security licensing, Exchange, SharePoint, Teams admin.
  * Enterprise Systems: SAP Enterprise Software, Enterprise CRM, ITSM Service Desk ticketing platforms, root cause analysis.
  * Data & Operations: Data entry integrity, workflow bottleneck removal, SOP documentation, user onboarding & training.
- Career History:
  * CAPACITI (Current): IT Technical Support handling first-line diagnostics, infrastructure reliability, user support, and business-IT alignment.
  * PRASA (Passenger Rail Agency of South Africa): Administrative strategy, enterprise information support, high-scale transportation systems data.
  * WCED (Western Cape Department of Education): Data management systems, educational administration, user tech support.
  * Innovate Technology: Managed IT service delivery, hardware/software troubleshooting, maintenance, updates.
- Value Proposition: Combines administrative workflow understanding with technical support execution (dual perspective), root-cause analysis, and user-centric communication.

Instructions for your responses:
- Keep answers professional, concise, enthusiastic, and polite (2-4 clear sentences or structured bullet points where helpful).
- Answer questions accurately using only the facts above.
- If asked how to contact Awonke or for his social / professional links, provide his email (Philibaneawonke@gmail.com), LinkedIn (https://www.linkedin.com/in/awonke-philibane-710aaa103), and GitHub (https://github.com/awonkephilibane).
- Use formatting (bolding key terms, clean bullet points) for readability.`;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required." });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback intelligent responder based on query keywords if API key is not yet set
        const lower = message.toLowerCase();
        let fallbackReply = "Awonke Philibane works in IT Technical Support at CAPACITI in Cape Town, with expertise in CCNA networking, SQL databases, and business workflow optimization. How can I assist you with details about his qualifications or experience?";
        
        if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("capaciti") || lower.includes("prasa") || lower.includes("wced")) {
          fallbackReply = "Awonke is currently working in **IT Technical Support at CAPACITI** in Cape Town. His track record also includes roles at **PRASA** (Passenger Rail Agency of SA), **WCED** (Western Cape Dept. of Education), and **Innovate Technology**.";
        } else if (lower.includes("skill") || lower.includes("ccna") || lower.includes("sql") || lower.includes("network") || lower.includes("m365") || lower.includes("sap")) {
          fallbackReply = "Awonke's technical competencies span **CCNA networking & troubleshooting**, **SQL query & database management**, **Microsoft 365 / Azure AD administration**, **SAP Enterprise Software**, and **ITSM ticketing operations**.";
        } else if (lower.includes("education") || lower.includes("cput") || lower.includes("degree") || lower.includes("cert")) {
          fallbackReply = "Awonke holds a **Bachelor's Degree in Business and Information Administration** from the **Cape Peninsula University of Technology (CPUT)**, as well as CCNA track networking and Microsoft 365 / Database administration training.";
        } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach")) {
          fallbackReply = "You can reach Awonke directly via email at **Philibaneawonke@gmail.com** or use the interactive contact buttons in the portfolio to connect!";
        }

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

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: formattedContents as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Thank you for asking! Awonke is ready to optimize your IT operations.";
      return res.json({ response: replyText });
    } catch (err: any) {
      console.error("Gemini API error in /api/chat:", err);
      return res.status(500).json({
        error: "Failed to generate AI response.",
        details: err?.message || "Unknown error",
        fallback: true,
        response: "Awonke Philibane works in IT Technical Support in Cape Town with expertise in CCNA networking, SQL databases, M365 administration, and CPUT Business & Information Administration. Please feel free to reach him at Philibaneawonke@gmail.com!",
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
