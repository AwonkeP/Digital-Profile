package com.awonke.profile;

import java.util.List;

public final class PortfolioData {
    public static final Profile PROFILE = new Profile(
        "Awonke Philibane",
        "IT Technical Support",
        "IT Technical Support | Optimizing Systems & Business Workflows",
        "Cape Town, Western Cape, South Africa",
        "Philibaneawonke@gmail.com",
        "https://www.linkedin.com/in/awonke-philibane-710aaa103",
        "awonke-philibane-710aaa103",
        "https://github.com/AwonkeP",
        "AwonkeP",
        "https://github.com/AwonkeP/Digital-Profile",
        "CAPACITI",
        "Diploma in Business & Information Administration (CPUT)",
        "/assets/profile.jpg",
        "Dedicated IT Technical Support in Cape Town, combining Business and Information Administration expertise from CPUT with hands-on technical skills in Fundamental Network (CCNA), Microsoft 365, workstation hardware diagnostics, and enterprise service desk operations.",
        "I am an IT Technical Support professional with a strong background in Business and Information Administration, currently driving service excellence at CAPACITI. By combining technical proficiency in Fundamental Network (CCNA) and Microsoft 365 with a focus on operational excellence, I ensure that technology serves as a seamless backbone for organizational productivity."
    );

    public static final Metrics METRICS = new Metrics("4+ Years", "20+");

    public static final List<Skill> SKILLS = List.of(
        new Skill("infra-1", "Infrastructure & Networking", "infra", "Network",
            "Hardware, routing, switching, and end-to-end network connectivity troubleshooting.",
            List.of("Fundamental Network (CCNA) (Routing & Switching)", "Microsoft 365 & Azure AD Identity Administration", "Hardware Diagnostics & Workstation Maintenance", "First-Line LAN/WAN & Gateway Troubleshooting")),
        new Skill("enterprise-1", "Enterprise Tools & Software", "enterprise", "Layers",
            "Enterprise ERP platforms, CRM systems, and structured ITSM service desk workflows.",
            List.of("SAP Enterprise Software & Module Navigation", "ITSM & Service Desk Incident Ticketing", "Enterprise CRM Systems & User Account Management", "SLA Compliance & Ticket Lifecycle Tracking")),
        new Skill("data-1", "Data & Operations", "data", "LineChart",
            "Data hygiene, incident analysis, and workflow bottleneck identification.",
            List.of("Advanced Data Entry, Validation & Integrity", "Workflow Bottleneck Identification & Removal", "Rapid Incident Diagnosis & Root Cause Analysis", "First-Line Technical Escalations & Resolution")),
        new Skill("admin-1", "Administration Strategy", "admin", "Workflow",
            "Translating business processes into reliable, streamlined digital workflows.",
            List.of("Business Information Administration (CPUT Trained)", "Process Automation & Form Digitalization", "Cross-Departmental Systems Integration", "End-User Training & Technical SOP Documentation"))
    );

    public static final List<Experience> EXPERIENCE = List.of(
        new Experience("capaciti", "IT Technical Support", "CAPACITI", "Cape Town, South Africa", "Current Role", true, "Tech Talent Accelerator",
            "Delivering first-line technical incident management, service desk triage, infrastructure reliability, and aligning business processes with technical tools.",
            List.of(
                new Highlight("Service Desk Management", "Delivering first-line technical analysis, rapid incident resolution, and structured service desk ticketing.", "Headset"),
                new Highlight("Infrastructure Reliability", "Ensuring continuous uptime, hardware health, and optimal connectivity across workplace environments.", "Server"),
                new Highlight("Business Alignment", "Bridging end-user requirements with technical solutions to maximize daily organizational productivity.", "Handshake"))),
        new Experience("prasa", "Information & Administrative Support", "PRASA (Passenger Rail Agency of South Africa)", "Cape Town, South Africa", "Enterprise Transport", false, "Public Transport & Rail Enterprise",
            "Applied administrative strategy and robust information support within a large-scale national transport network environment.",
            List.of(
                new Highlight("Enterprise Information Systems", "Managed critical document registries, system record integrity, and inter-departmental operational flows.", "Train"),
                new Highlight("Process Optimization", "Identified documentation delays and introduced structured digital record filing to expedite data retrieval.", "FileText"),
                new Highlight("Cross-Functional Support", "Provided operational assistance to multidisciplinary technical teams during transport operations.", "Users"))),
        new Experience("wced", "Data Systems & Administrative Support", "Western Cape Department of Education (WCED)", "Western Cape, South Africa", "Public Sector", false, "Government Education Department",
            "Managed data systems, administrative documentation, and user technical support within the provincial public education framework.",
            List.of(
                new Highlight("Data Integrity & Systems", "Ensured high-accuracy records management, validation audits, and compliant educational data entries.", "Building2"),
                new Highlight("Administrative Documentation", "Drafted standard operating procedures and streamlined routine reporting schedules.", "ShieldCheck"),
                new Highlight("End-User Assistance", "Provided compassionate first-line technical guidance to administrative staff across educational centers.", "HelpCircle"))),
        new Experience("innovate-tech", "IT Support & Technical Assistant", "Innovate Technology", "Cape Town, South Africa", "Managed Services", false, "IT Managed Services & Solutions",
            "Supported IT service delivery, hardware/software troubleshooting, preventative maintenance, and client system updates.",
            List.of(
                new Highlight("Technical Troubleshooting", "Diagnosed PC hardware failures, OS corruptions, peripheral errors, and application crashes.", "Laptop"),
                new Highlight("Maintenance & Upgrades", "Executed scheduled patch management, anti-malware updates, and local database backup routines.", "Wrench"),
                new Highlight("Client Service Delivery", "Maintained customer satisfaction through prompt incident resolution and transparent status communication.", "CheckCircle")))
    );

    public static final List<Education> EDUCATION = List.of(
        new Education("cput-diploma", "Diploma in Business & Information Administration", "Cape Peninsula University of Technology (CPUT)", "Diploma", "Higher Education Diploma",
            "Comprehensive grounding in administrative information systems, workflow design, business records management, and enterprise organizational strategy.", "GraduationCap", "Systems & Admin Core"),
        new Education("ccna-cert", "Fundamental Network (CCNA)", "Cisco Networking Academy", "Practical Experience", "Networking Certification Track",
            "Mastery of TCP/IP, IP subnetting, VLAN segmentation, switch and router configuration, ping/traceroute network diagnostic methodologies.", "Network", "Fundamental Network (CCNA)"),
        new Education("m365-admin", "Microsoft 365 & IT Systems Administration", "Enterprise Technical Training Modules", "Technical Modules", "Enterprise Cloud & Systems Track",
            "Hands-on proficiency in Azure Active Directory / Entra ID, Microsoft 365 Admin Center, workstation hardware diagnostics, and role-based access management.", "ShieldCheck", "Cloud & Systems Admin")
    );

    public static final List<Certificate> CERTIFICATES = List.of(
        new Certificate("unsupervised-learning", "Unsupervised Learning, Recommenders, Reinforcement Learning", "DeepLearning.AI", "deeplearning", "Issued Sep 2026", "SR49AQ003TSJ", "https://coursera.org/share/47dfaf648dc57332ff79bd76e4048a3a", "Machine Learning, Deep Learning, Reinforcement Learning, Anomaly Detection"),
        new Certificate("supervised-machine-learning", "Supervised Machine Learning: Regression and Classification", "DeepLearning.AI", "deeplearning", "Issued Aug 2026", "DDLK0UQE5L0O", "https://coursera.org/share/e7065fb8615d29c89d5abd4a44df5cd6", "Python (Programming Language), Machine Learning, Scikit-Learn"),
        new Certificate("genai-llms", "Generative AI with Large Language Models", "DeepLearning.AI", "deeplearning", "Issued Aug 2026", "0LDL6HM1OEVI", "https://coursera.org/share/fbe3354e51b259614bbb6f92a2e1d54f", "Generative AI, Large Language Models (LLMs), Model Fine-tuning, Deployment"),
        new Certificate("ibm-python-ai", "Python for Data Science, AI & Development", "IBM", "ibm", "Issued Aug 2026", "ARAQNGWV9QVU", "https://coursera.org/share/f45589bfefa83b5d0b98dc593d5df731", "Python Programming, Data Science, AI & Scripting, NumPy"),
        new Certificate("ibm-prompt-engineering", "Generative AI: Prompt Engineering Basics", "IBM", "ibm", "Issued Aug 2026", "3OQHGBPK32XL", "https://coursera.org/share/915c85a289da86366f9f883f2c1af45a", "Prompt Engineering, ChatGPT, Prompt Patterns, Generative AI"),
        new Certificate("ai-bootcamp", "Artificial Intelligence Bootcamp (AI)", "Coursera", "coursera", "Issued Aug 2026", "nMSRtMJnQsWEkbTCZ3LFiw", "https://coursera.org/verify/nMSRtMJnQsWEkbTCZ3LFiw", "Artificial Intelligence, Applied Deep Learning, Technical Workflows")
    );

    public static final List<Scenario> SCENARIOS = List.of(
        new Scenario("network", "Network Connectivity & Gateway Diagnostics (Fundamental Network (CCNA))", "Infrastructure",
            "User reports intermittent connectivity, packet dropouts, and slow cloud sync within a branch office network.", "< 15 mins",
            List.of("First-Line Analysis: Execute ping, traceroute, and ARP table checks to isolate the packet loss hop.", "Network Layer Diagnostics: Inspect gateway switch VLAN configurations, duplex mismatches, and interface error rates.", "Root-Cause Resolution: Flush local DNS/ARP cache, renew DHCP leases with correct DNS relays, and stabilize uplink channel.", "Verification & Follow-up: Run continuous throughput benchmarks and confirm zero packet drop with the end-user.")),
        new Scenario("hardware", "Workstation Hardware & OS Diagnostics", "Hardware & Systems",
            "Workstation boot failure with peripheral disconnects and system crash interrupting daily operational tasks.", "< 20 mins",
            List.of("Incident Triage: Log ticket in ITSM tool, capture system crash stop code, and isolate failing hardware components.", "Diagnostics & Testing: Test memory modules, examine system event logs, and execute system file integrity checks.", "Hardware & Driver Remediation: Reseat internal connections, update conflicting drivers, and verify system temperatures.", "Post-Repair Verification: Run automated diagnostic stress tests and confirm stable system recovery with the user.")),
        new Scenario("m365", "Microsoft 365 Role-Based Access & Licensing", "Cloud & Identity",
            "New department hire requires customized role-based access for Microsoft 365, Teams channels, SharePoint folders, and SAP ERP roles.", "< 10 mins",
            List.of("Identity Verification: Cross-reference ticket authorization with approved HR onboarding credentials and department matrix.", "Azure AD / Entra ID Provisioning: Assign enterprise license, configure MFA authentication, and map user to targeted security groups.", "Application Permissions: Grant scoped SharePoint repository access and configure single-sign-on credentials for SAP ERP.", "Guided Onboarding: Walk employee through first-time sign-in, MFA validation, and close ticket with full audit trail.")),
        new Scenario("workflow", "Departmental Administrative Bottleneck", "Workflow Optimization",
            "High volume of manual paper-form entries creating a multi-day administrative backlog between operational units.", "Process Transformation",
            List.of("Workflow Mapping: Apply Business & Information Administration principles to pinpoint redundant manual review stages.", "Digital Transformation: Replace paper forms with standardized digital Microsoft 365 Forms connected to structured operational registries.", "Administrative Training: Conduct interactive enablement session for operational staff on automated record validation.", "Impact Measurement: Eliminated duplicate data entry, reduced processing turnaround time from 3 days to under 2 hours."))
    );

    public static final List<Project> PROJECTS = List.of(
        new Project("capaciti-technoresolve-desk", "TechnoResolve Desk – Enterprise Tiered ITSM Support Portal (CAPACITI Project)", "IT Service Management",
            "Tiered enterprise service desk with AI ticket triage, role-specific workspaces (Admin, Technician, Customer), Firestore cloud persistence, and notification alerts.",
            "Collaborative enterprise IT service desk platform engineered during the UVU Africa (CAPACITI) IT Technical Support programme. Built dedicated role-specific portals (Customer Self-Service & Ticket Submission, Technician Incident Queue & Diagnostic Workspace, and Admin Control Center for SLA management and team oversight). Integrated AI ticket classification, priority grading, and end-to-end resolution audit logs.",
            List.of("Engineered multi-role permission architecture separating Customer self-service, Technician diagnostic queues, and Admin approval oversight.", "Integrated AI-assisted ticket triage automatically categorizing hardware, network, and software incidents with urgency and SLA grading.", "Built persistent ticket lifecycle tracking with real-time Firestore database updates, diagnostic audit histories, and resolution notifications."),
            List.of("React 19", "TypeScript", "Tailwind CSS", "Firebase Firestore", "Express", "Gemini AI API", "ITSM / SLA Tracking"),
            "Featured Team Project", "Headset", "UVU Africa / CAPACITI", true, null, "https://github.com/AvumileTati/CAPACITI-Project"),
        new Project("awonke-digital-profile", "Awonke Philibane – Interactive IT Technical Systems Portfolio", "Web & Systems Architecture",
            "High-performance interactive digital portfolio and system architecture showcase with AI assistant integration, verified IT competencies, and dark mode persistence.",
            "Custom-built responsive digital portfolio and IT technical support demonstration platform. Highlights verified competencies across Fundamental Network (CCNA), Microsoft 365, workstation support, and enterprise administrative processes. Features an AI assistant powered by Google Gemini, dark/light theme switching, and accessible design.",
            List.of("Built with React 19, TypeScript, Tailwind CSS, and Express server with full mobile responsiveness.", "Embedded server-side Gemini AI assistant grounded with verified CV context for interactive recruiter inquiries.", "Architected client-side dark/light mode toggle with local storage persistence and keyboard shortcuts."),
            List.of("React 19", "TypeScript", "Tailwind CSS", "Express Server", "Gemini AI SDK", "Vite", "Motion"),
            "Live & Open Source", "Workflow", "Personal Repository", true, null, "https://github.com/AwonkeP/Digital-Profile"),
        new Project("ubuntu-innovations-capaciti", "Ubuntu Innovations – IT Infrastructure & Support Solution", "Infrastructure & Support",
            "Four-week CAPACITI capstone designing a secure IT environment for a 25-person startup with networks, identity controls, backups, and support procedures.",
            "Capstone project developed for Ubuntu Innovations (Pty) Ltd during the UVU Africa / CAPACITI programme. The project maps a complete IT infrastructure blueprint for a growing Cape Town technology startup, covering network architecture, hardware and software planning, role-based access control, backup strategy, cybersecurity governance, and helpdesk support workflows.",
            List.of("Designed a segmented office network with dedicated subnets for servers, user devices, printers, and Wi-Fi, improving performance and isolation.", "Defined access controls for management, finance, HR, sales, and development teams using structured RBAC and shared folder permissions.", "Documented hardware inventory, software licensing, business continuity planning, and cybersecurity controls for a scalable startup environment.", "Created support runbooks and troubleshooting procedures to manage day-to-day IT incidents and user support efficiently."),
            List.of("Linux / Ubuntu", "Windows 11", "Networking", "VLANs", "RBAC", "NAS", "Backup & DR", "Cybersecurity", "IT Support Operations"),
            "CAPACITI Capstone", "Network", "UVU Africa / CAPACITI", false, null, "https://github.com/MRMUGERI/Ubuntu-Innovations-CAPACITI")
    );

    private PortfolioData() {}

    public record Profile(String name, String role, String headline, String location, String email, String linkedin,
                         String linkedinHandle, String github, String githubHandle, String githubRepo,
                         String currentCompany, String degree, String profileImage, String summary, String elevatorPitch) {}
    public record Metrics(String yearsExperience, String usersSupported) {}
    public record Skill(String id, String name, String category, String icon, String description, List<String> bullets) {}
    public record Highlight(String title, String desc, String icon) {}
    public record Experience(String id, String role, String company, String location, String period, boolean isCurrent,
                             String type, String summary, List<Highlight> highlights) {}
    public record Education(String id, String degree, String institution, String tag, String type, String details,
                            String icon, String badge) {}
    public record Certificate(String id, String name, String issuer, String issuerLogo, String issueDate,
                              String credentialId, String url, String skills) {}
    public record Scenario(String id, String title, String category, String description, String resolutionTime,
                           List<String> steps) {}
    public record Project(String id, String title, String category, String summary, String description,
                         List<String> highlights, List<String> technologies, String status, String icon,
                         String badge, boolean featured, String projectUrl, String githubUrl) {}
    public record Portfolio(Profile profile, Metrics metrics, List<Skill> skills, List<Experience> experience,
                            List<Education> education, List<Certificate> certificates, List<Scenario> scenarios,
                            List<Project> projects) {}
}
