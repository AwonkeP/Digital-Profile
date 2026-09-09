// Client-side grounded knowledge assistant engine for Awonke Philibane's portfolio.
// Ensures the assistant provides rich, conversational, multi-turn, grounded responses
// even when deployed statically, when network is unavailable, or before API keys are configured.

export interface HistoryTurn {
  role: string;
  text: string;
}

export function resolveClientSideGroundedFallback(
  message: string,
  history: HistoryTurn[] = []
): string {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  // 1. Unrelated / Out-of-bounds queries
  if (
    lower.includes("weather") ||
    lower.includes("recipe") ||
    lower.includes("joke") ||
    lower.includes("write code for python") ||
    lower.includes("crypto") ||
    lower.includes("bitcoin") ||
    lower.includes("movie") ||
    lower.includes("politics") ||
    lower.includes("football")
  ) {
    return "I am Awonke Philibane's dedicated profile assistant. I can only answer questions strictly based on Awonke's verified profile, IT technical support experience, and qualifications.\n\nWould you like to hear about his role at CAPACITI, his Fundamental Network (CCNA) skills, or his CPUT qualifications?";
  }

  // 2. Strict SQL disclaimer rule
  if (lower.includes("sql") || lower.includes("database")) {
    return "Awonke's verified profile focuses on **Fundamental Network (CCNA)**, **Microsoft 365 & Azure AD**, **workstation hardware diagnostics**, and **business workflow optimization** rather than SQL database management.\n\nWould you like to explore his Fundamental Network (CCNA) credentials or his Microsoft 365 capabilities?";
  }

  // 3. Questions about Capabilities / What can you do / Help
  if (
    lower.includes("capabilit") ||
    lower.includes("what can you do") ||
    lower.includes("what do you do") ||
    lower.includes("how can you help") ||
    lower.includes("what are your features") ||
    lower.includes("what questions can i ask") ||
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
    // Inspect the latest assistant turn in conversation history to know what was offered
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

  // 5. Negation ("No", "Nope", "Not really", "Cancel")
  if (/^(no|nope|not now|nah|nothing|cancel|never mind|stop)\b/i.test(trimmed)) {
    return "No problem at all! Whenever you're ready, feel free to ask about Awonke's skills, projects, experience at CAPACITI, or how to get in touch. How can I help you next?";
  }

  // 6. About / Bio / Who is Awonke
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

  // 7. Experience / Career / Jobs
  if (
    lower.includes("experience") ||
    lower.includes("work") ||
    lower.includes("job") ||
    lower.includes("career") ||
    lower.includes("employment") ||
    lower.includes("history")
  ) {
    return "Awonke's professional journey spans enterprise technical support and systems administration:\n\n" +
      "- **CAPACITI (Current):** IT Technical Support specializing in first-line diagnostics, network reliability, M365 user management, and service desk excellence.\n" +
      "- **PRASA (Passenger Rail Agency of SA):** Enterprise information systems, operational documentation, and data coordination.\n" +
      "- **WCED (Western Cape Dept. of Education):** Educational database administration and staff technical support.\n" +
      "- **Innovate Technology:** Client workstation diagnostics, OS installation, and preventative hardware maintenance.\n\n" +
      "Would you like more details on his current responsibilities at CAPACITI or his earlier roles?";
  }

  // 8. CAPACITI specific
  if (lower.includes("capaciti")) {
    return "At **CAPACITI** (Tech Talent Accelerator), Awonke serves as an **IT Technical Support Specialist**:\n\n" +
      "- Manages day-to-day hardware, operating system, and application support for internal staff and cohorts.\n" +
      "- Administers Microsoft 365 accounts, email distribution groups, and Azure AD security policies.\n" +
      "- Monitors local subnet and VLAN connectivity to maintain high network availability.\n" +
      "- Collaborated on the **TechnoResolve Desk**, an enterprise ITSM platform with automated ticket triage.\n\n" +
      "Would you like to know more about the TechnoResolve Desk project or his technical credentials?";
  }

  // 9. PRASA specific
  if (lower.includes("prasa")) {
    return "At **PRASA** (Passenger Rail Agency of South Africa), Awonke worked with enterprise information systems:\n\n" +
      "- Managed document control and operational data flows across rail logistics departments.\n" +
      "- Ensured compliance with standard operating procedures and administrative record-keeping.\n" +
      "- Assisted operational teams with digital system transitions and reporting.\n\n" +
      "Would you like to hear about his subsequent roles at WCED or CAPACITI?";
  }

  // 10. WCED specific
  if (lower.includes("wced")) {
    return "At the **Western Cape Department of Education (WCED)**, Awonke managed data systems and user support:\n\n" +
      "- Maintained educational administration databases with rigorous data integrity audits.\n" +
      "- Provided front-line technical troubleshooting for administrative staff and educators.\n" +
      "- Facilitated user onboarding and digital documentation workflows.\n\n" +
      "Would you like to learn about his technical hardware support at Innovate Technology or his current work at CAPACITI?";
  }

  // 11. Innovate Technology specific
  if (lower.includes("innovate")) {
    return "At **Innovate Technology**, Awonke focused on hands-on workstation and IT service delivery:\n\n" +
      "- Performed PC and laptop hardware diagnostics, component replacements (RAM, SSDs, power supplies), and preventative maintenance.\n" +
      "- Re-imaged workstations with Windows operating systems, required enterprise software, and antivirus protection.\n" +
      "- Troubleshot peripheral and local networking connectivity issues.\n\n" +
      "Would you like to hear about his Fundamental Network (CCNA) qualifications?";
  }

  // 12. Networking / CCNA specific
  if (
    lower.includes("ccna") ||
    lower.includes("network") ||
    lower.includes("vlan") ||
    lower.includes("routing") ||
    lower.includes("switching") ||
    lower.includes("subnet") ||
    lower.includes("cisco") ||
    lower.includes("tcp") ||
    lower.includes("ip")
  ) {
    return "Awonke's **Fundamental Network (CCNA)** qualifications from Cisco Networking Academy include:\n\n" +
      "- **Routing & Switching:** Configuring routers, switches, default gateways, and static/dynamic routing basics.\n" +
      "- **VLANs & Segmentation:** Implementing 802.1Q encapsulation to segment departmental traffic and secure local networks.\n" +
      "- **IP Addressing & Subnetting:** IPv4 subnet calculations, VLSM, CIDR notation, and DHCP pool setup.\n" +
      "- **Troubleshooting:** Analyzing ping, traceroute, ARP tables, and cable diagnostics to resolve connectivity drops.\n\n" +
      "Would you like to hear about his branch office network simulation project?";
  }

  // 13. Microsoft 365 / Azure AD / Cloud
  if (
    lower.includes("m365") ||
    lower.includes("microsoft 365") ||
    lower.includes("azure") ||
    lower.includes("entra") ||
    lower.includes("office") ||
    lower.includes("teams") ||
    lower.includes("exchange")
  ) {
    return "Awonke's **Microsoft 365 & Cloud Identity** expertise includes:\n\n" +
      "- **Azure AD / Entra ID:** User account provisioning, security group management, and role-based access control (RBAC).\n" +
      "- **Security Policies:** Enforcing Multi-Factor Authentication (MFA), password reset workflows, and secure sign-ins.\n" +
      "- **Office Suite Administration:** Exchange Online mailboxes, distribution lists, SharePoint permissions, and Teams settings.\n\n" +
      "Would you like to know how he applies this to enterprise user onboarding?";
  }

  // 14. Hardware / Workstation / PC troubleshooting
  if (
    lower.includes("hardware") ||
    lower.includes("pc") ||
    lower.includes("computer") ||
    lower.includes("laptop") ||
    lower.includes("diagnostics") ||
    lower.includes("troubleshoot") ||
    lower.includes("maintenance")
  ) {
    return "Awonke's **Workstation Hardware & Support** skills include:\n\n" +
      "- **Diagnostics & Repairs:** Rapid isolation of faulty RAM, storage drives, power units, and motherboard issues.\n" +
      "- **Preventative Maintenance:** Internal dusting, thermal management, and hardware lifecycle auditing.\n" +
      "- **Deployment:** Automated OS installation, driver updates, and peripheral configuration (printers, monitors, docking stations).\n\n" +
      "Would you like to explore his networking or cloud identity skills as well?";
  }

  // 15. General Skills / Competencies
  if (lower.includes("skill") || lower.includes("competenc") || lower.includes("stack") || lower.includes("technolog")) {
    return "Awonke's core technical competencies span 4 pillars:\n\n" +
      "1. **Fundamental Network (CCNA):** Routing & Switching, VLAN segmentation (802.1Q), IPv4 subnetting, and gateway diagnostics.\n" +
      "2. **Microsoft 365 & Azure AD:** User provisioning, security licensing, MFA, and Exchange/Teams administration.\n" +
      "3. **Hardware & PC Diagnostics:** Workstation maintenance, component replacements, and OS deployment.\n" +
      "4. **ITSM & Enterprise Tools:** Service desk ticketing, SLA adherence, SAP, and CRM systems.\n\n" +
      "Which specific pillar would you like to explore?";
  }

  // 16. Education / Qualifications / CPUT / Certifications
  if (
    lower.includes("education") ||
    lower.includes("cput") ||
    lower.includes("diploma") ||
    lower.includes("degree") ||
    lower.includes("cert") ||
    lower.includes("qualification") ||
    lower.includes("study") ||
    lower.includes("school") ||
    lower.includes("university") ||
    lower.includes("coursera") ||
    lower.includes("deeplearning") ||
    lower.includes("ibm") ||
    lower.includes("machine learning") ||
    lower.includes("ai")
  ) {
    return "Awonke's education and accredited credentials include:\n\n" +
      "- **Unsupervised Learning, Recommenders, Reinforcement Learning:** DeepLearning.AI (Credential ID: `SR49AQ003TSJ`)\n" +
      "- **Supervised Machine Learning: Regression and Classification:** DeepLearning.AI (Credential ID: `DDLK0UQE5L0O`)\n" +
      "- **Generative AI with Large Language Models:** DeepLearning.AI (Credential ID: `0LDL6HM1OEVI`)\n" +
      "- **Python for Data Science, AI & Development:** IBM (Credential ID: `ARAQNGWV9QVU`)\n" +
      "- **Generative AI: Prompt Engineering Basics:** IBM (Credential ID: `3OQHGBPK32XL`)\n" +
      "- **Artificial Intelligence Bootcamp (AI):** Coursera (Credential ID: `nMSRtMJnQsWEkbTCZ3LFiw`)\n" +
      "- **Diploma in Business and Information Administration:** Cape Peninsula University of Technology (CPUT)\n" +
      "- **Fundamental Network (CCNA):** Cisco Networking Academy credential covering routing, switching, and VLAN diagnostics\n" +
      "- **Microsoft 365 Administration:** Systems administration, cloud identity, and Azure Active Directory.\n\n" +
      "You can click 'Show credential' on any card in the Certifications grid to verify them directly on Coursera!";
  }

  // 17. Projects / GitHub / TechnoResolve
  if (
    lower.includes("project") ||
    lower.includes("technoresolve") ||
    lower.includes("github") ||
    lower.includes("repo") ||
    lower.includes("git") ||
    lower.includes("portfolio")
  ) {
    return "Awonke's featured projects and GitHub repositories include:\n\n" +
      "- **TechnoResolve Desk (CAPACITI Collaborative Project):** A multi-role enterprise ITSM service desk platform featuring customer, technician, and admin portals, automated triage, and live persistence. [View on GitHub](https://github.com/AvumileTati/CAPACITI-Project)\n" +
      "- **Digital Profile (This Portfolio):** Responsive full-stack profile showcasing his IT support career, CCNA networking, and AI assistant. [View on GitHub](https://github.com/AwonkeP/Digital-Profile)\n" +
      "- **Fundamental Network (CCNA) Branch Simulation:** Multi-VLAN branch office topology with 802.1Q trunking and DHCP services.\n" +
      "- **GitHub Profile:** [github.com/AwonkeP](https://github.com/AwonkeP)\n\n" +
      "Would you like technical details on any of these projects?";
  }

  // 18. Contact / Hire / Resume / Location
  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("hire") ||
    lower.includes("reach") ||
    lower.includes("linkedin") ||
    lower.includes("phone") ||
    lower.includes("location") ||
    lower.includes("resume") ||
    lower.includes("cv")
  ) {
    return "You can get in touch with Awonke Philibane:\n\n" +
      "- **Email:** [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n" +
      "- **LinkedIn:** [linkedin.com/in/awonke-philibane-710aaa103](https://www.linkedin.com/in/awonke-philibane-710aaa103)\n" +
      "- **GitHub:** [github.com/AwonkeP](https://github.com/AwonkeP)\n" +
      "- **Location:** Cape Town, Western Cape, South Africa\n" +
      "- **Resume:** Click the **View Resume** button on this site to preview or download his full CV.\n\n" +
      "Would you like to send him an email message right now?";
  }

  // 19. Friendly Greetings
  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower.startsWith("hi ") ||
    lower.startsWith("hello ") ||
    lower.startsWith("good morning") ||
    lower.startsWith("good afternoon")
  ) {
    return "Hello! I am Awonke Philibane's dedicated profile assistant. I can help you learn about his **IT Technical Support experience at CAPACITI**, his **Fundamental Network (CCNA)** qualifications, his **Microsoft 365** skills, and his projects.\n\nWhat would you like to know about Awonke today?";
  }

  // 20. Default contextual fallthrough - varied and inviting
  return "Awonke Philibane is an **IT Technical Support Specialist** at CAPACITI in Cape Town, combining a Business & Information Administration Diploma from CPUT with technical proficiency in **Fundamental Network (CCNA)** and **Microsoft 365**.\n\n" +
    "You can ask me about:\n" +
    "- His **day-to-day responsibilities at CAPACITI**\n" +
    "- His **Fundamental Network (CCNA)** routing and VLAN skills\n" +
    "- His **Microsoft 365 & Azure AD** cloud administration\n" +
    "- His **TechnoResolve Desk** project\n" +
    "- How to **contact him or view his CV**\n\n" +
    "Which of these would you like to explore?";
}
