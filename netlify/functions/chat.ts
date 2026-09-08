import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

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
- Key Projects:
  * TechnoResolve Desk (CAPACITI Enterprise IT Service Desk): Collaborative tier-based ITSM platform featuring role portals for Admins, Technicians, and Customers, AI ticket classification, and real-time Firestore persistence. Repository: https://github.com/AvumileTati/CAPACITI-Project
  * Fundamental Network (CCNA) Multi-VLAN Subnetting & Gateway Infrastructure: Enterprise branch office simulation with 802.1Q encapsulation and DHCP snooping.
  * Microsoft 365 & Azure AD Identity Administration: Cloud user provisioning, MFA deployment, and least-privilege RBAC.
`;

function resolveGroundedFallback(message: string, history: Array<{ role: string; text: string }> = []): string {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  // 1. Out-of-bounds queries
  if (
    lower.includes("weather") ||
    lower.includes("recipe") ||
    lower.includes("joke") ||
    lower.includes("write code for python") ||
    lower.includes("crypto") ||
    lower.includes("bitcoin") ||
    lower.includes("movie") ||
    lower.includes("politics")
  ) {
    return "I am Awonke Philibane's dedicated profile assistant. I can only answer questions strictly based on Awonke's verified profile, IT technical support experience, and qualifications.\n\nWould you like to hear about his role at CAPACITI, his Fundamental Network (CCNA) skills, or his CPUT qualifications?";
  }

  // 2. Strict SQL disclaimer
  if (lower.includes("sql") || lower.includes("database")) {
    return "Awonke's verified profile focuses on **Fundamental Network (CCNA)**, **Microsoft 365 & Azure AD**, **workstation hardware diagnostics**, and **business workflow optimization** rather than SQL database management.\n\nWould you like to explore his Fundamental Network (CCNA) credentials or Microsoft 365 capabilities?";
  }

  // 3. Capabilities / What can you do / Help
  if (
    lower.includes("capabilit") ||
    lower.includes("what can you do") ||
    lower.includes("what do you do") ||
    lower.includes("how can you help") ||
    lower.includes("what are your features") ||
    lower.includes("help") ||
    lower.includes("menu") ||
    lower.includes("options")
  ) {
    return "I can answer any questions about Awonke Philibane's verified background, qualifications, and IT capabilities:\n\n" +
      "### 🛠️ Awonke's Core Capabilities:\n" +
      "- **Fundamental Network (CCNA):** Routing & Switching, VLAN segmentation (802.1Q), subnetting (IPv4/CIDR), TCP/IP, and gateway diagnostics.\n" +
      "- **Microsoft 365 & Azure AD:** User provisioning, security licensing, Multi-Factor Authentication (MFA), Exchange, and Teams administration.\n" +
      "- **Workstation Hardware Support:** PC teardowns, component diagnostics, preventative maintenance, and OS deployment.\n" +
      "- **ITSM & Service Desk:** Ticket lifecycle management, SLA adherence, and user technical enablement.\n" +
      "- **Workflow Optimization:** Bridging business administrative workflows with IT infrastructure to eliminate operational bottlenecks.\n\n" +
      "### 💬 What You Can Ask Me:\n" +
      "- *\"Tell me about his role at CAPACITI\"*\n" +
      "- *\"What is his Fundamental Network (CCNA) experience?\"*\n" +
      "- *\"Tell me about the TechnoResolve Desk project\"*\n" +
      "- *\"What qualifications does he have?\"*\n" +
      "- *\"How can I contact Awonke?\"*\n\n" +
      "Which topic would you like to start with?";
  }

  // 4. Affirmations & Follow-up answers ("Yes", "Sure", "Yeah", "Tell me more", "Okay", "Please", "Go ahead", "Why not")
  const isAffirmation = /^(yes|yeah|yep|sure|ok|okay|please|tell me more|go ahead|why not|of course|definitely|absolutely|certainly|i would|y)\b/i.test(trimmed);

  if (isAffirmation) {
    const lastBotTurn = [...history].reverse().find((h) => h.role === "assistant" || h.role === "model");
    const lastBotText = (lastBotTurn?.text || "").toLowerCase();

    if (lastBotText.includes("capaciti") || lastBotText.includes("role at capaciti")) {
      return "At **CAPACITI**, Awonke is an **IT Technical Support Specialist** driving operational and technical excellence:\n\n" +
        "- **First-Line Technical Support:** Diagnosing workstation, software, and network incidents for internal teams and cohorts.\n" +
        "- **Network & Connectivity:** Managing local switch ports, subnet access, printer network interfaces, and gateway stability.\n" +
        "- **User Onboarding & Identity:** Provisioning Microsoft 365 accounts, setting up secure MFA, and managing role permissions.\n" +
        "- **ITSM & Service Desk:** Tracking incident resolution times against SLAs and creating user-friendly SOP guides.\n\n" +
        "Would you like to hear about his project work at CAPACITI (such as the TechnoResolve Desk) or his Fundamental Network (CCNA) background?";
    }

    if (lastBotText.includes("ccna") || lastBotText.includes("fundamental network") || lastBotText.includes("network")) {
      return "Awonke's **Fundamental Network (CCNA)** background from Cisco Networking Academy covers enterprise network architecture:\n\n" +
        "- **Routing & Switching:** Configuring Cisco Catalyst switches and branch routers.\n" +
        "- **VLANs & Trunking:** Designing 802.1Q tagged VLANs to isolate departments for security and broadcast control.\n" +
        "- **Subnetting & Addressing:** Designing IPv4 address schemes, CIDR subnetting, and DHCP scopes.\n" +
        "- **Diagnostic Methodology:** Utilizing packet tracing, ARP caches, ping/traceroute latency tests, and netstat.\n\n" +
        "Would you like to hear about his multi-VLAN branch office simulation project?";
    }

    if (lastBotText.includes("microsoft 365") || lastBotText.includes("m365") || lastBotText.includes("azure")) {
      return "Awonke's **Microsoft 365 & Cloud Identity** experience includes:\n\n" +
        "- **Azure Active Directory / Entra ID:** Managing user lifecycles, security groups, and conditional access policies.\n" +
        "- **Security & MFA:** Enforcing Multi-Factor Authentication and password hygiene.\n" +
        "- **Productivity Suite Admin:** Exchange Online mailbox administration, SharePoint team permissions, and Microsoft Teams.\n\n" +
        "Would you like to see how he implements this in enterprise workflows?";
    }

    if (lastBotText.includes("contact") || lastBotText.includes("touch") || lastBotText.includes("reach")) {
      return "You can reach Awonke Philibane directly through the following channels:\n\n" +
        "- **Email:** [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n" +
        "- **LinkedIn:** [linkedin.com/in/awonke-philibane-710aaa103](https://www.linkedin.com/in/awonke-philibane-710aaa103)\n" +
        "- **GitHub:** [github.com/AwonkeP](https://github.com/AwonkeP)\n" +
        "- **Location:** Cape Town, Western Cape, South Africa\n\n" +
        "You can also download his complete CV by clicking the **View Resume** button on the page!";
    }

    if (lastBotText.includes("project") || lastBotText.includes("technoresolve")) {
      return "Awonke's flagship collaborative project at CAPACITI is the **TechnoResolve Desk**:\n\n" +
        "- **Role Portals:** Tier-based interfaces for Customers (ticket submission & tracking), Technicians (ticket diagnosis & status updates), and Administrators (team analytics & assignment).\n" +
        "- **Smart Triage:** Automated ticket categorization and urgency ranking.\n" +
        "- **Real-time Persistence:** Built with modern cloud synchronization for live incident updates.\n" +
        "- **Repository:** [View on GitHub (AvumileTati/CAPACITI-Project)](https://github.com/AvumileTati/CAPACITI-Project)\n\n" +
        "Would you like to know more about his network simulation or Microsoft 365 projects?";
    }

    if (lastBotText.includes("technical area") || lastBotText.includes("skills")) {
      return "Here are the main technical tracks we can explore in detail:\n\n" +
        "1. **Fundamental Network (CCNA):** VLANs, trunking, subnetting, switch/router setups.\n" +
        "2. **Microsoft 365 & Azure AD:** User provisioning, security policies, cloud productivity.\n" +
        "3. **Workstation Hardware Diagnostics:** PC component repair, preventative maintenance.\n" +
        "4. **Enterprise ITSM & Service Desk:** Ticket workflows, SLAs, user support.\n\n" +
        "Which of these 4 areas would you like to dive into?";
    }

    return "Great! Here are the key areas you can explore:\n\n" +
      "- **Current Experience:** His role as IT Technical Support at CAPACITI.\n" +
      "- **Technical Competencies:** Fundamental Network (CCNA), Microsoft 365, and PC hardware diagnostics.\n" +
      "- **Projects:** The TechnoResolve Desk ITSM platform and branch network simulation.\n" +
      "- **Qualifications:** Diploma in Business & Information Administration from CPUT.\n\n" +
      "Which one would you like to hear about?";
  }

  // 5. Negation
  if (/^(no|nope|not now|nah|nothing|cancel|never mind|stop)\b/i.test(trimmed)) {
    return "No problem at all! Whenever you're ready, feel free to ask about Awonke's skills, projects, experience at CAPACITI, or how to get in touch. How can I help you next?";
  }

  // 6. About / Bio
  if (
    lower.includes("about") ||
    lower.includes("who is awonke") ||
    lower.includes("introduction") ||
    lower.includes("bio") ||
    lower.includes("background") ||
    lower.includes("summary")
  ) {
    return "Awonke Philibane is an **IT Technical Support Specialist** with a strong foundation in **Business and Information Administration**, currently driving service excellence at **CAPACITI** in Cape Town.\n\n" +
      "By combining technical proficiency in **Fundamental Network (CCNA)** and **Microsoft 365** with a focus on operational excellence, he ensures that technology serves as a seamless backbone for organizational productivity.\n\n" +
      "Would you like to explore his technical skills, his key projects, or his professional career history?";
  }

  // 7. Experience
  if (
    lower.includes("experience") ||
    lower.includes("work") ||
    lower.includes("job") ||
    lower.includes("career") ||
    lower.includes("employment")
  ) {
    return "Awonke's professional journey spans enterprise technical support and systems administration:\n\n" +
      "- **CAPACITI (Current):** IT Technical Support specializing in first-line diagnostics, network reliability, M365 user management, and service desk excellence.\n" +
      "- **PRASA (Passenger Rail Agency of SA):** Enterprise information systems, operational documentation, and data coordination.\n" +
      "- **WCED (Western Cape Dept. of Education):** Educational database administration and staff technical support.\n" +
      "- **Innovate Technology:** Client workstation diagnostics, OS installation, and preventative hardware maintenance.\n\n" +
      "Would you like more details on his current responsibilities at CAPACITI or his earlier roles?";
  }

  // 8. Individual organizations
  if (lower.includes("capaciti")) {
    return "At **CAPACITI** (Tech Talent Accelerator), Awonke serves as an **IT Technical Support Specialist**:\n\n" +
      "- Manages day-to-day hardware, operating system, and application support for internal staff and cohorts.\n" +
      "- Administers Microsoft 365 accounts, email distribution groups, and Azure AD security policies.\n" +
      "- Monitors local subnet and VLAN connectivity to maintain high network availability.\n" +
      "- Collaborated on the **TechnoResolve Desk**, an enterprise ITSM platform with automated ticket triage.\n\n" +
      "Would you like to know more about the TechnoResolve Desk project or his technical credentials?";
  }

  if (lower.includes("prasa")) {
    return "At **PRASA** (Passenger Rail Agency of South Africa), Awonke managed enterprise documentation flows, operational data systems, and administrative IT coordination to streamline commuter rail support processes.\n\nWould you like to hear about his subsequent roles at WCED or CAPACITI?";
  }

  if (lower.includes("wced")) {
    return "At the **Western Cape Department of Education (WCED)**, Awonke managed data systems and user support, maintaining educational databases and assisting staff with front-line technical troubleshooting.\n\nWould you like to hear about his technical work at CAPACITI?";
  }

  if (lower.includes("innovate")) {
    return "At **Innovate Technology**, Awonke focused on hands-on workstation and IT service delivery, performing PC hardware diagnostics, component replacements, preventative maintenance, and OS deployments.\n\nWould you like to explore his networking qualifications?";
  }

  // 9. Networking / CCNA
  if (
    lower.includes("ccna") ||
    lower.includes("network") ||
    lower.includes("vlan") ||
    lower.includes("routing") ||
    lower.includes("switching") ||
    lower.includes("subnet") ||
    lower.includes("cisco")
  ) {
    return "Awonke's **Fundamental Network (CCNA)** qualifications from Cisco Networking Academy include:\n\n" +
      "- **Routing & Switching:** Configuring routers, switches, default gateways, and static/dynamic routing basics.\n" +
      "- **VLANs & Segmentation:** Implementing 802.1Q encapsulation to segment departmental traffic and secure local networks.\n" +
      "- **IP Addressing & Subnetting:** IPv4 subnet calculations, VLSM, CIDR notation, and DHCP pool setup.\n" +
      "- **Troubleshooting:** Analyzing ping, traceroute, ARP tables, and cable diagnostics to resolve connectivity drops.\n\n" +
      "Would you like to hear about his branch office network simulation project?";
  }

  // 10. Microsoft 365 / Azure AD
  if (
    lower.includes("m365") ||
    lower.includes("microsoft 365") ||
    lower.includes("azure") ||
    lower.includes("entra") ||
    lower.includes("office") ||
    lower.includes("teams")
  ) {
    return "Awonke's **Microsoft 365 & Cloud Identity** expertise includes:\n\n" +
      "- **Azure AD / Entra ID:** User account provisioning, security group management, and role-based access control (RBAC).\n" +
      "- **Security Policies:** Enforcing Multi-Factor Authentication (MFA), password reset workflows, and secure sign-ins.\n" +
      "- **Office Suite Administration:** Exchange Online mailboxes, distribution lists, SharePoint permissions, and Teams settings.\n\n" +
      "Would you like to know how he applies this to enterprise user onboarding?";
  }

  // 11. Hardware / Workstation
  if (
    lower.includes("hardware") ||
    lower.includes("pc") ||
    lower.includes("computer") ||
    lower.includes("laptop") ||
    lower.includes("diagnostics") ||
    lower.includes("troubleshoot")
  ) {
    return "Awonke's **Workstation Hardware & Support** skills include:\n\n" +
      "- **Diagnostics & Repairs:** Rapid isolation of faulty RAM, storage drives, power units, and motherboard issues.\n" +
      "- **Preventative Maintenance:** Internal dusting, thermal management, and hardware lifecycle auditing.\n" +
      "- **Deployment:** Automated OS installation, driver updates, and peripheral configuration.\n\n" +
      "Would you like to explore his networking or cloud identity skills as well?";
  }

  // 12. Skills
  if (lower.includes("skill") || lower.includes("competenc") || lower.includes("stack")) {
    return "Awonke's core technical competencies span 4 pillars:\n\n" +
      "1. **Fundamental Network (CCNA):** Routing & Switching, VLAN segmentation (802.1Q), IPv4 subnetting, and gateway diagnostics.\n" +
      "2. **Microsoft 365 & Azure AD:** User provisioning, security licensing, MFA, and Exchange/Teams administration.\n" +
      "3. **Hardware & PC Diagnostics:** Workstation maintenance, component replacements, and OS deployment.\n" +
      "4. **ITSM & Enterprise Tools:** Service desk ticketing, SLA adherence, SAP, and CRM systems.\n\n" +
      "Which specific pillar would you like to explore?";
  }

  // 13. Education
  if (lower.includes("education") || lower.includes("cput") || lower.includes("diploma") || lower.includes("qualification")) {
    return "Awonke holds a **Diploma in Business and Information Administration** from the **Cape Peninsula University of Technology (CPUT)**, combining administrative workflow insight with technical proficiency in **Fundamental Network (CCNA)** and Microsoft 365.\n\nWould you like to hear about his projects or work history?";
  }

  // 14. Projects / GitHub
  if (lower.includes("project") || lower.includes("technoresolve") || lower.includes("github") || lower.includes("repo")) {
    return "Awonke's featured projects include:\n\n" +
      "- **TechnoResolve Desk (CAPACITI Collaborative Project):** A multi-role enterprise ITSM service desk platform with customer, technician, and admin portals, automated triage, and live persistence. [View on GitHub](https://github.com/AvumileTati/CAPACITI-Project)\n" +
      "- **Digital Profile:** Responsive portfolio showcasing his IT support career, CCNA networking, and AI assistant. [View on GitHub](https://github.com/AwonkeP/Digital-Profile)\n" +
      "- **Fundamental Network (CCNA) Branch Simulation:** Multi-VLAN branch office topology with 802.1Q trunking.\n\n" +
      "Would you like more technical details on any of these?";
  }

  // 15. Contact
  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("linkedin") || lower.includes("reach")) {
    return "You can connect with Awonke directly:\n\n" +
      "- **Email:** [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n" +
      "- **LinkedIn:** [linkedin.com/in/awonke-philibane-710aaa103](https://www.linkedin.com/in/awonke-philibane-710aaa103)\n" +
      "- **GitHub:** [github.com/AwonkeP](https://github.com/AwonkeP)\n" +
      "- **Location:** Cape Town, Western Cape, South Africa\n\n" +
      "You can also download his complete CV by clicking **View Resume** on this page!";
  }

  // Default varied fallthrough
  return "Awonke Philibane is an **IT Technical Support Specialist** at CAPACITI in Cape Town, combining a Business & Information Administration Diploma from CPUT with technical proficiency in **Fundamental Network (CCNA)** and **Microsoft 365**.\n\n" +
    "You can ask me about:\n" +
    "- His **day-to-day responsibilities at CAPACITI**\n" +
    "- His **Fundamental Network (CCNA)** routing and VLAN skills\n" +
    "- His **Microsoft 365 & Azure AD** cloud administration\n" +
    "- His **TechnoResolve Desk** project\n" +
    "- How to **contact him or view his CV**\n\n" +
    "Which of these would you like to explore?";
}

export const handler: Handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let body: any = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const message = body.message;
  const conversationHistory = body.conversationHistory || [];

  if (!message || typeof message !== "string") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Message string is required." }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    const fallbackReply = resolveGroundedFallback(message, conversationHistory);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: fallbackReply, fallback: true }),
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

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

    const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let replyText: string | null = null;

    for (const candidateModel of candidateModels) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout with ${candidateModel}`)), 10000)
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
      } catch (modelErr) {
        console.warn(`Netlify function: candidate ${candidateModel} failed, trying next...`);
      }
    }

    if (replyText) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ response: replyText }),
      };
    }

    const fallbackReply = resolveGroundedFallback(message, conversationHistory);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: fallbackReply, fallback: true }),
    };
  } catch (err: any) {
    console.warn("Netlify function error, falling back to grounded response:", err?.message);
    const fallbackReply = resolveGroundedFallback(message, conversationHistory);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: fallbackReply, fallback: true }),
    };
  }
};

export default handler;
