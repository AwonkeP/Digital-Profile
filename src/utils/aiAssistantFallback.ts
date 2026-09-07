// Client-side grounded knowledge assistant fallback for Awonke Philibane's portfolio.
// Ensures the chatbot works instantly and accurately even if the network is interrupted,
// if deployed statically, or if experiencing cloud provider 503 spikes.

export function resolveClientSideGroundedFallback(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("sql") || lower.includes("database")) {
    return "Awonke's verified profile focuses on **Fundamental Network (CCNA)**, **Microsoft 365 & Azure AD**, **workstation hardware diagnostics**, and **business workflow optimization** rather than SQL database management.\n\nWould you like to explore his Fundamental Network (CCNA) or Microsoft 365 capabilities?";
  }

  if (
    lower.includes("experience") ||
    lower.includes("work") ||
    lower.includes("job") ||
    lower.includes("capaciti") ||
    lower.includes("prasa") ||
    lower.includes("wced") ||
    lower.includes("innovate") ||
    lower.includes("role") ||
    lower.includes("career")
  ) {
    return "Awonke is currently an **IT Technical Support at CAPACITI** in Cape Town. His professional background also includes:\n- **PRASA** (Passenger Rail Agency of SA): Enterprise information systems & administrative workflows.\n- **WCED** (Western Cape Dept. of Education): Data systems management & user technical support.\n- **Innovate Technology**: Managed IT services, hardware diagnostics, and maintenance.\n\nWould you like details on any specific role or his achievements?";
  }

  if (
    lower.includes("skill") ||
    lower.includes("ccna") ||
    lower.includes("network") ||
    lower.includes("m365") ||
    lower.includes("sap") ||
    lower.includes("hardware") ||
    lower.includes("tools") ||
    lower.includes("vlan") ||
    lower.includes("troubleshoot")
  ) {
    return "Awonke's core technical competencies include:\n- **Fundamental Network (CCNA)**: Routing & Switching, TCP/IP, VLAN segmentation, subnetting, gateway diagnostics.\n- **Microsoft 365 & Cloud Identity**: Azure AD / Entra ID, user provisioning, security licensing.\n- **Hardware & Workstation**: PC diagnostics, preventative maintenance, component replacement.\n- **Enterprise Tools**: SAP Enterprise Software & ITSM service desk ticketing platforms.\n\nWhich technical area would you like to discuss further?";
  }

  if (
    lower.includes("education") ||
    lower.includes("cput") ||
    lower.includes("diploma") ||
    lower.includes("degree") ||
    lower.includes("cert") ||
    lower.includes("qualification") ||
    lower.includes("study")
  ) {
    return "Awonke holds a **Diploma in Business and Information Administration** from the **Cape Peninsula University of Technology (CPUT)**, alongside **Fundamental Network (CCNA)** from Cisco Networking Academy and Microsoft 365 systems administration credentials.\n\nWould you like to know more about his academic background or IT credentials?";
  }

  if (lower.includes("github") || lower.includes("repo") || lower.includes("git")) {
    return "You can explore Awonke's GitHub repositories:\n- **Digital Profile (This Portfolio)**: [github.com/AwonkeP/Digital-Profile](https://github.com/AwonkeP/Digital-Profile)\n- **TechnoResolve Desk (CAPACITI Collaborative Project)**: [github.com/AvumileTati/CAPACITI-Project](https://github.com/AvumileTati/CAPACITI-Project)\n- **GitHub Profile**: [github.com/AwonkeP](https://github.com/AwonkeP)\n\nCan I help you with any other details from his profile?";
  }

  if (
    lower.includes("project") ||
    lower.includes("technoresolve") ||
    lower.includes("capaciti-project") ||
    lower.includes("digital-profile")
  ) {
    return "Awonke's featured projects include:\n- **TechnoResolve Desk (CAPACITI Project)**: Enterprise tiered ITSM support portal with multi-role portals (Admin, Technician, Customer), AI ticket triage, and Firestore persistence. [View on GitHub](https://github.com/AvumileTati/CAPACITI-Project)\n- **Interactive Digital Profile**: Full-stack portfolio and technical architecture showcase with Gemini AI integration. [View on GitHub](https://github.com/AwonkeP/Digital-Profile)\n- **Fundamental Network (CCNA) Multi-VLAN Subnetting**: Branch office network simulation with 802.1Q encapsulation.\n- **Microsoft 365 & Azure AD Identity Administration**: Cloud onboarding automation & MFA security.\n\nWould you like more technical details on any of these?";
  }

  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("hire") ||
    lower.includes("reach") ||
    lower.includes("linkedin") ||
    lower.includes("phone") ||
    lower.includes("location")
  ) {
    return "You can connect with Awonke directly:\n- **Email**: [Philibaneawonke@gmail.com](mailto:Philibaneawonke@gmail.com)\n- **LinkedIn**: [linkedin.com/in/awonke-philibane-710aaa103](https://www.linkedin.com/in/awonke-philibane-710aaa103)\n- **GitHub**: [github.com/AwonkeP](https://github.com/AwonkeP)\n- **Location**: Cape Town, Western Cape, South Africa\n\nWould you like to send him an inquiry or view his full CV?";
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

  return "Awonke Philibane works in **IT Technical Support at CAPACITI** in Cape Town, combining a Business & Information Administration Diploma from CPUT with technical skills in **Fundamental Network (CCNA)**, Microsoft 365, and PC hardware diagnostics.\n\nWould you like to know more about his role at CAPACITI, his Fundamental Network (CCNA) knowledge, or how to get in touch?";
}
