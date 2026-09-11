// Client-side grounded knowledge assistant engine for Awonke Philibane's portfolio.
// Ensures the assistant provides rich, conversational, multi-turn, friendly responses
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

  // 1. Warm, Friendly Greetings & Introductions
  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower === "howdy" ||
    lower === "yo" ||
    lower.startsWith("hi ") ||
    lower.startsWith("hello ") ||
    lower.startsWith("hey ") ||
    lower.startsWith("good morning") ||
    lower.startsWith("good afternoon") ||
    lower.startsWith("good evening") ||
    lower.startsWith("greetings")
  ) {
    return "Hey there! Great to meet you! 😊 I'm Awonke's digital assistant.\n\n" +
      "I'm here to chat with you about his hands-on IT support work at CAPACITI, dive into his Fundamental Network (CCNA) projects, or share how his technical skills can add value to your team.\n\n" +
      "How is your day going, and what would you like to explore first?";
  }

  // 2. Personal inquiries / How are you / Politeness
  if (
    lower.includes("how are you") ||
    lower.includes("how r u") ||
    lower.includes("how's it going") ||
    lower.includes("how is it going") ||
    lower.includes("how do you do") ||
    lower.includes("how have you been") ||
    lower.includes("what's up") ||
    lower.includes("whats up")
  ) {
    return "I'm doing fantastic, thank you for asking! 😊 It's always exciting to chat with visitors and share the great work Awonke is doing in IT support and systems optimization.\n\n" +
      "How are you doing today? Are you looking for someone with strong IT support and networking skills for a role, or just curious about his work?";
  }

  if (lower.includes("nice to meet you") || lower.includes("pleasure to meet") || lower.includes("glad to meet")) {
    return "The pleasure is all mine! 😊 I'm really glad you stopped by Awonke's portfolio.\n\n" +
      "Is there a specific technical area you're interested in—like his network diagnostics, Microsoft 365 administration, or his day-to-day experience at CAPACITI?";
  }

  if (lower.includes("who are you") || lower.includes("what is your name") || lower.includes("who made you")) {
    return "I'm Awonke Philibane's interactive portfolio assistant! Think of me as his digital host and co-pilot—I'm here to give you an insider's view into his IT technical support journey, his projects, and his background.\n\n" +
      "What brings you to his profile today?";
  }

  // 3. Gratitude & Pleasantries
  if (
    lower.includes("thank you") ||
    lower.includes("thanks") ||
    lower.includes("thx") ||
    lower.includes("appreciate it") ||
    lower.includes("cheers")
  ) {
    return "You're very welcome! I'm really glad that was helpful. 😊\n\n" +
      "Is there anything else you'd like to dive into—perhaps his featured TechnoResolve Desk project, his certifications, or how to get in touch with him directly?";
  }

  if (
    lower === "cool" ||
    lower === "awesome" ||
    lower === "great" ||
    lower === "perfect" ||
    lower === "sounds good" ||
    lower === "nice" ||
    lower.startsWith("that's great") ||
    lower.startsWith("thats great") ||
    lower.startsWith("that's cool") ||
    lower.startsWith("thats cool")
  ) {
    return "Glad you think so! Awonke really takes pride in delivering reliable, user-friendly solutions. 😊\n\n" +
      "Would you like to explore another part of his experience, or take a look at his downloadable CV?";
  }

  // 4. Playful / Out-of-bounds queries handled with warmth and friendly redirects
  if (lower.includes("weather")) {
    return "Haha, I wish I could step outside and give you the local weather forecast! ☀️ While I don't have access to live meteorological feeds, I can definitely tell you that things are always dynamic in Awonke's IT support environment at CAPACITI!\n\n" +
      "Would you like to hear about his daily network and workstation troubleshooting there?";
  }

  if (lower.includes("joke")) {
    return "Here's a lighthearted one for you: *Why do IT support specialists love coffee? Because it keeps their servers running and their personal bandwidth at 100%!* ☕😄\n\n" +
      "On a more serious note, Awonke's real passion is eliminating technical bottlenecks so people can work without hiccups. Would you like to hear how he tackled incident diagnostics at CAPACITI?";
  }

  if (lower.includes("recipe") || lower.includes("cook") || lower.includes("food")) {
    return "That sounds delicious! 🍽️ While I don't have access to culinary recipes, I can certainly share Awonke's recipe for operational IT success: solid network fundamentals, proactive user enablement, and clear documentation.\n\n" +
      "Would you like to hear about his work at CAPACITI or his Fundamental Network (CCNA) credentials?";
  }

  if (
    lower.includes("crypto") ||
    lower.includes("bitcoin") ||
    lower.includes("movie") ||
    lower.includes("politics") ||
    lower.includes("football")
  ) {
    return "I appreciate you asking! As Awonke's dedicated portfolio assistant, I don't have access to external resources or internet news. However, I'd love to chat with you about Awonke's IT technical support journey, his networking skills, or his certifications.\n\n" +
      "Where would you like to start?";
  }

  // 5. Strict SQL disclaimer handled conversationally
  if (lower.includes("sql") || lower.includes("database administration")) {
    return "Thanks for asking! Awonke's focus is on **Fundamental Network (CCNA)**, **Microsoft 365 & Azure AD**, **workstation hardware diagnostics**, and **business workflow optimization**, rather than database administration (SQL).\n\n" +
      "Are you looking for an IT support specialist who excels in infrastructure and user enablement, or would you like to hear about his networking background?";
  }

  // 6. Affirmations & Follow-up answers ("Yes", "Sure", "Yeah", "Tell me more", "Okay", "Please", "Go ahead", "Why not")
  const isAffirmation = /^(yes|yeah|yep|sure|ok|okay|please|tell me more|go ahead|why not|of course|definitely|absolutely|certainly|i would|y)\b/i.test(trimmed);

  if (isAffirmation) {
    const lastBotTurn = [...history].reverse().find((h) => h.role === "assistant" || h.role === "model");
    const lastBotText = (lastBotTurn?.text || "").toLowerCase();

    if (lastBotText.includes("capaciti") || lastBotText.includes("role at capaciti")) {
      return "I'd love to share more! At **CAPACITI**, Awonke is on the front lines of IT Technical Support:\n\n" +
        "- **First-Line Technical Support:** Rapidly troubleshooting workstation hardware, operating systems, and connectivity issues for team members and cohorts.\n" +
        "- **Network & Connectivity:** Managing switch ports, VLAN assignments, and network printer interfaces for reliable uptime.\n" +
        "- **Cloud Identity (M365):** Provisioning Microsoft 365 accounts, setting up secure Multi-Factor Authentication (MFA), and managing permissions.\n" +
        "- **ITSM & Service Desk:** Managing incident lifecycles against strict SLAs and documenting clear SOPs for common fixes.\n\n" +
        "Would you like to hear about his flagship project at CAPACITI (the TechnoResolve Desk) or his Fundamental Network (CCNA) background?";
    }

    if (lastBotText.includes("ccna") || lastBotText.includes("fundamental network") || lastBotText.includes("network")) {
      return "Networking is one of Awonke's standout passions! His **Fundamental Network (CCNA)** credential from Cisco Networking Academy covers enterprise architecture:\n\n" +
        "- **Routing & Switching:** Configuring Cisco Catalyst switches and branch routers.\n" +
        "- **VLANs & Trunking (802.1Q):** Isolating network traffic for security, broadcast containment, and departmental privacy.\n" +
        "- **IPv4 Subnetting & CIDR:** Designing efficient IP address allocations and DHCP server scopes.\n" +
        "- **Diagnostic Methodologies:** Utilizing packet sniffing, ARP tables, ping/traceroute latency tests, and netstat for root-cause analysis.\n\n" +
        "Would you like to hear how he simulated an enterprise branch office network, or check out his Microsoft 365 experience?";
    }

    if (lastBotText.includes("microsoft 365") || lastBotText.includes("m365") || lastBotText.includes("azure")) {
      return "Great topic! In **Microsoft 365 & Cloud Identity**, Awonke brings practical administrative experience:\n\n" +
        "- **Azure Active Directory / Entra ID:** Managing user lifecycles, role-based access control (RBAC), and security groups.\n" +
        "- **Security Hygiene:** Enforcing Multi-Factor Authentication (MFA) and conditional access best practices.\n" +
        "- **Productivity Applications:** Exchange Online mailbox administration, SharePoint team permissions, and Microsoft Teams setups.\n\n" +
        "Would you like to see how he combines this with hardware support and user onboarding?";
    }

    if (lastBotText.includes("contact") || lastBotText.includes("touch") || lastBotText.includes("reach") || lastBotText.includes("cv") || lastBotText.includes("resume")) {
      return "Here are the best ways to reach Awonke directly:\n\n" +
        "- **Email:** [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n" +
        "- **LinkedIn:** [linkedin.com/in/awonke-philibane-710aaa103](https://www.linkedin.com/in/awonke-philibane-710aaa103)\n" +
        "- **GitHub:** [github.com/AwonkeP](https://github.com/AwonkeP)\n" +
        "- **Location:** Cape Town, Western Cape, South Africa\n\n" +
        "You can also click the **View Resume** button at the top of the page to inspect or download his full CV. Shall I tell you more about his background?";
    }

    if (lastBotText.includes("project") || lastBotText.includes("technoresolve")) {
      return "Awonke's flagship project at CAPACITI is the **TechnoResolve Desk**:\n\n" +
        "- **Tier-Based Portals:** Dedicated interfaces tailored for Customers (ticket submission & tracking), Technicians (incident diagnosis & status updates), and Admins (team analytics).\n" +
        "- **Intelligent Triage:** Automated incident classification and priority scoring.\n" +
        "- **Live Persistence:** Built with modern cloud synchronization for instantaneous incident updates.\n" +
        "- **Source Code:** [View on GitHub (AvumileTati/CAPACITI-Project)](https://github.com/AvumileTati/CAPACITI-Project)\n\n" +
        "Would you like to hear about his network simulation project or his educational background at CPUT?";
    }

    return "Wonderful! Here are a few engaging areas we can explore:\n\n" +
      "- **Current Work:** His hands-on IT Technical Support role at CAPACITI.\n" +
      "- **Technical Competencies:** Fundamental Network (CCNA), Microsoft 365, and PC workstation diagnostics.\n" +
      "- **Key Projects:** The TechnoResolve Desk ITSM platform and branch network simulation.\n" +
      "- **Education & Certifications:** His Business & Information Administration Diploma from CPUT plus Coursera credentials.\n\n" +
      "Which of these sparks your interest most?";
  }

  // 7. Negation ("No", "Nope", "Not really", "Cancel")
  if (/^(no|nope|not now|nah|nothing|cancel|never mind|stop)\b/i.test(trimmed)) {
    return "No worries at all! Whenever you're ready, feel free to ask about Awonke's skills, projects, experience at CAPACITI, or how to get in touch. How can I help you next?";
  }

  // 8. Questions about Capabilities / What can you do / Help
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
    return "I'm here to have an open, friendly conversation about Awonke Philibane's career, qualifications, and IT capabilities! 😊\n\n" +
      "### 🛠️ Awonke's Core Strengths:\n" +
      "- **Fundamental Network (CCNA):** Routing & Switching, VLAN segmentation (802.1Q), subnetting (IPv4/CIDR), and gateway diagnostics.\n" +
      "- **Microsoft 365 & Azure AD:** User provisioning, security licensing, Multi-Factor Authentication (MFA), and Exchange/Teams admin.\n" +
      "- **Workstation Hardware Support:** Component diagnostics, RAM/storage upgrades, preventative maintenance, and OS imaging.\n" +
      "- **ITSM & Service Desk:** SLA adherence, ticket lifecycle management, and empathetic user technical support.\n" +
      "- **Workflow Optimization:** Bridging business administrative workflows with IT infrastructure to eliminate operational bottlenecks.\n\n" +
      "### 💬 Things You Can Ask Me:\n" +
      "- *\"Tell me about his daily work at CAPACITI\"*\n" +
      "- *\"What is his Fundamental Network (CCNA) experience?\"*\n" +
      "- *\"Tell me about the TechnoResolve Desk project\"*\n" +
      "- *\"What qualifications does he have from CPUT?\"*\n" +
      "- *\"How can I get in touch with Awonke?\"*\n\n" +
      "Which of these would you like to explore together?";
  }

  // 9. About / Bio / Who is Awonke
  if (
    lower.includes("about") ||
    lower.includes("who is awonke") ||
    lower.includes("introduction") ||
    lower.includes("bio") ||
    lower.includes("background") ||
    lower.includes("summary") ||
    lower.includes("tell me about awonke")
  ) {
    return "Awonke Philibane is an **IT Technical Support Specialist** with a unique edge: he pairs a strong foundation in **Business and Information Administration** with hands-on technical proficiency in **Fundamental Network (CCNA)** and **Microsoft 365**.\n\n" +
      "Currently at **CAPACITI**, he works to ensure technology acts as an enabler rather than an obstacle—tackling everything from local switch and VLAN connectivity to user onboarding and PC hardware diagnostics.\n\n" +
      "Would you like to hear about his day-to-day work at CAPACITI, his networking credentials, or his flagship projects?";
  }

  // 10. Experience / Career / Jobs
  if (
    lower.includes("experience") ||
    lower.includes("work") ||
    lower.includes("job") ||
    lower.includes("career") ||
    lower.includes("employment") ||
    lower.includes("history")
  ) {
    return "Awonke has built a well-rounded career spanning enterprise technical support and systems administration:\n\n" +
      "- **CAPACITI (Current):** IT Technical Support specializing in first-line diagnostics, network reliability, M365 user management, and service desk excellence.\n" +
      "- **PRASA (Passenger Rail Agency of SA):** Managed enterprise information systems, operational documentation, and data coordination.\n" +
      "- **WCED (Western Cape Dept. of Education):** Supported educational database administration and front-line staff technical issues.\n" +
      "- **Innovate Technology:** Delivered client workstation diagnostics, operating system installations, and preventative hardware maintenance.\n\n" +
      "Would you like more details on his current responsibilities at CAPACITI or his earlier roles?";
  }

  // 11. CAPACITI specific
  if (lower.includes("capaciti")) {
    return "At **CAPACITI** (Tech Talent Accelerator), Awonke serves as an **IT Technical Support Specialist** where he:\n\n" +
      "- Manages day-to-day hardware, operating system, and software application support for internal staff and cohorts.\n" +
      "- Administers Microsoft 365 accounts, email distribution groups, and Azure AD security policies.\n" +
      "- Monitors local subnet and VLAN connectivity to maintain high network availability.\n" +
      "- Collaborated on the **TechnoResolve Desk**, an enterprise ITSM platform with automated ticket triage.\n\n" +
      "Would you like to know more about the TechnoResolve Desk project or his technical credentials?";
  }

  // 12. PRASA specific
  if (lower.includes("prasa")) {
    return "At **PRASA** (Passenger Rail Agency of South Africa), Awonke worked with enterprise information systems:\n\n" +
      "- Managed document control and operational data flows across rail logistics departments.\n" +
      "- Ensured compliance with standard operating procedures and administrative record-keeping.\n" +
      "- Assisted operational teams with digital system transitions and reporting.\n\n" +
      "Would you like to hear about his subsequent roles at WCED or CAPACITI?";
  }

  // 13. WCED specific
  if (lower.includes("wced")) {
    return "At the **Western Cape Department of Education (WCED)**, Awonke managed data systems and user support:\n\n" +
      "- Maintained educational administration databases with rigorous data integrity audits.\n" +
      "- Provided front-line technical troubleshooting for administrative staff and educators.\n" +
      "- Facilitated user onboarding and digital documentation workflows.\n\n" +
      "Would you like to learn about his technical hardware support at Innovate Technology or his current work at CAPACITI?";
  }

  // 14. Innovate Technology specific
  if (lower.includes("innovate")) {
    return "At **Innovate Technology**, Awonke focused on hands-on workstation and IT service delivery:\n\n" +
      "- Performed PC and laptop hardware diagnostics, component replacements (RAM, SSDs, power supplies), and preventative maintenance.\n" +
      "- Re-imaged workstations with Windows operating systems, required enterprise software, and antivirus protection.\n" +
      "- Troubleshot peripheral and local networking connectivity issues.\n\n" +
      "Would you like to hear about his Fundamental Network (CCNA) qualifications?";
  }

  // 15. Networking / CCNA specific
  if (
    lower.includes("ccna") ||
    lower.includes("network") ||
    lower.includes("vlan") ||
    lower.includes("routing") ||
    lower.includes("switching") ||
    lower.includes("subnet") ||
    lower.includes("cisco")
  ) {
    return "Networking is a core pillar for Awonke! Through the Cisco Networking Academy, he earned his **Fundamental Network (CCNA)** credential, mastering:\n\n" +
      "- **Routing & Switching Architecture:** Configuring Cisco Catalyst switches and branch routers with proper interface addressing and security.\n" +
      "- **VLAN Segmentation & 802.1Q:** Isolating departments onto distinct broadcast domains with inter-VLAN routing.\n" +
      "- **IPv4 Addressing & Subnetting:** Designing efficient classless (CIDR) subnet schemes and DHCP pools.\n" +
      "- **Diagnostic Methodologies:** Systematic troubleshooting using packet inspection, ping, traceroute, and ARP table analysis.\n\n" +
      "Would you like to know more about his multi-VLAN branch network simulation project?";
  }

  // 16. Microsoft 365 / Azure AD / Cloud
  if (
    lower.includes("microsoft") ||
    lower.includes("m365") ||
    lower.includes("office 365") ||
    lower.includes("azure") ||
    lower.includes("entra") ||
    lower.includes("cloud")
  ) {
    return "Awonke's **Microsoft 365 & Cloud Identity** experience includes:\n\n" +
      "- **Azure Active Directory / Entra ID:** Managing user accounts, security groups, and role-based access control (RBAC).\n" +
      "- **Security Policies:** Enforcing Multi-Factor Authentication (MFA) and conditional access policies for remote and on-site staff.\n" +
      "- **Office Suite Administration:** Exchange Online mailboxes, distribution lists, SharePoint permissions, and Teams settings.\n\n" +
      "Would you like to know how he applies this to enterprise user onboarding?";
  }

  // 17. Hardware / Workstation / PC troubleshooting
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

  // 18. General Skills / Competencies
  if (lower.includes("skill") || lower.includes("competenc") || lower.includes("stack") || lower.includes("technolog")) {
    return "Awonke brings a powerful blend of technical skills and operational problem-solving:\n\n" +
      "1. **Fundamental Network (CCNA):** Routing & Switching, VLAN segmentation (802.1Q), IPv4 subnetting, and gateway diagnostics.\n" +
      "2. **Microsoft 365 & Azure AD:** User provisioning, security licensing, MFA, and Exchange/Teams administration.\n" +
      "3. **Hardware & PC Diagnostics:** Workstation maintenance, component replacements, and OS deployment.\n" +
      "4. **ITSM & Enterprise Tools:** Service desk ticketing, SLA adherence, SAP, and CRM systems.\n\n" +
      "Which specific pillar would you like to explore together?";
  }

  // 19. Education / Qualifications / CPUT / Certifications
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
    return "Awonke has an impressive academic and professional certification record:\n\n" +
      "- **Diploma in Business and Information Administration:** Cape Peninsula University of Technology (CPUT)\n" +
      "- **Fundamental Network (CCNA):** Cisco Networking Academy credential covering routing, switching, and VLAN diagnostics\n" +
      "- **Microsoft 365 Administration:** Systems administration, cloud identity, and Azure Active Directory.\n" +
      "- **Generative AI with Large Language Models:** DeepLearning.AI (Credential ID: `0LDL6HM1OEVI`)\n" +
      "- **Supervised Machine Learning:** DeepLearning.AI (Credential ID: `DDLK0UQE5L0O`)\n" +
      "- **Unsupervised Learning & Recommenders:** DeepLearning.AI (Credential ID: `SR49AQ003TSJ`)\n" +
      "- **Python for Data Science, AI & Development:** IBM (Credential ID: `ARAQNGWV9QVU`)\n" +
      "- **Generative AI Prompt Engineering:** IBM (Credential ID: `3OQHGBPK32XL`)\n" +
      "- **Artificial Intelligence Bootcamp:** Coursera (Credential ID: `nMSRtMJnQsWEkbTCZ3LFiw`)\n\n" +
      "You can click 'Show credential' on any card in the Certifications section of this page to verify them directly on Coursera! Would you like to hear more about any of them?";
  }

  // 20. Projects / GitHub / TechnoResolve
  if (
    lower.includes("project") ||
    lower.includes("technoresolve") ||
    lower.includes("github") ||
    lower.includes("repo") ||
    lower.includes("git") ||
    lower.includes("portfolio")
  ) {
    return "Awonke's featured projects demonstrate real-world impact:\n\n" +
      "- **TechnoResolve Desk (CAPACITI Collaborative Project):** A multi-role enterprise ITSM service desk platform featuring customer, technician, and admin portals, automated triage, and live persistence. [View on GitHub](https://github.com/AvumileTati/CAPACITI-Project)\n" +
      "- **Digital Profile (This Portfolio):** Responsive full-stack profile showcasing his IT support career, CCNA networking, and AI assistant. [View on GitHub](https://github.com/AwonkeP/Digital-Profile)\n" +
      "- **Fundamental Network (CCNA) Branch Simulation:** Multi-VLAN branch office topology with 802.1Q trunking and DHCP services.\n" +
      "- **GitHub Profile:** [github.com/AwonkeP](https://github.com/AwonkeP)\n\n" +
      "Would you like technical details on any of these projects?";
  }

  // 21. Contact / Hire / Resume / Location
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
    return "You can get in touch with Awonke directly:\n\n" +
      "- **Email:** [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n" +
      "- **LinkedIn:** [linkedin.com/in/awonke-philibane-710aaa103](https://www.linkedin.com/in/awonke-philibane-710aaa103)\n" +
      "- **GitHub:** [github.com/AwonkeP](https://github.com/AwonkeP)\n" +
      "- **Location:** Cape Town, Western Cape, South Africa\n\n" +
      "- **Resume:** Click the **View Resume** button on this site to preview or download his full CV.\n\n" +
      "Would you like to send him an email message right now, or discuss his availability?";
  }

  // 22. Default conversational fallthrough - responsive and interactive
  return `Thanks for bringing that up! Awonke approaches every challenge with a dual lens: pairing rigorous **Business & Information Administration** principles from CPUT with hands-on technical support proficiency (**Fundamental Network (CCNA)**, **Microsoft 365 / Azure AD**, and **hardware diagnostics**).

At **CAPACITI**, he's actively troubleshooting hardware, user accounts, and network connectivity, while streamlining support workflows through platforms like **TechnoResolve Desk**.

To give you the most relevant details, what area of his background interests you most? For instance, we could talk about his **troubleshooting at CAPACITI**, his **Cisco networking configurations**, or his **cloud identity administration**.`;
}

export function getSuggestedFollowUps(lastResponseText: string): string[] {
  const lower = (lastResponseText || "").toLowerCase();

  if (lower.includes("capaciti") || lower.includes("support") || lower.includes("troubleshoot")) {
    return [
      "Tell me about his daily support at CAPACITI",
      "How does he handle network diagnostics?",
      "Tell me about TechnoResolve Desk",
      "View Awonke's Resume",
    ];
  }

  if (lower.includes("network") || lower.includes("ccna") || lower.includes("vlan") || lower.includes("cisco")) {
    return [
      "Explain his CCNA branch simulation",
      "What switch & router models has he worked with?",
      "How does he manage Microsoft 365?",
      "Contact Awonke directly",
    ];
  }

  if (lower.includes("technoresolve") || lower.includes("project") || lower.includes("ticket")) {
    return [
      "How does TechnoResolve automate ticket triage?",
      "What technologies power TechnoResolve?",
      "Tell me about his role at CAPACITI",
      "View Awonke's Resume",
    ];
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("resume") || lower.includes("cv") || lower.includes("hire")) {
    return [
      "View / Download his Resume",
      "What are his core technical skills?",
      "Tell me about his education at CPUT",
      "Send an email to Awonke",
    ];
  }

  if (lower.includes("cput") || lower.includes("education") || lower.includes("degree") || lower.includes("cert")) {
    return [
      "How does his CPUT diploma help in IT?",
      "What networking certifications does he hold?",
      "Tell me about his CAPACITI experience",
      "View Awonke's Resume",
    ];
  }

  // Default interactive suggestions
  return [
    "Tell me about his IT support at CAPACITI",
    "What networking skills does he have?",
    "Show me the TechnoResolve Desk project",
    "View Awonke's Resume",
  ];
}

