import { SkillItem, ExperienceItem, EducationItem, Scenario, ProjectItem } from './types';
import profilePhoto from './assets/images/awonke_photo_actual.jpg';

export const PROFILE_INFO = {
  name: "Awonke Philibane",
  role: "IT Technical Support",
  headline: "IT Technical Support | Optimizing Systems & Business Workflows",
  location: "Cape Town, Western Cape, South Africa",
  email: "Philibaneawonke@gmail.com",
  linkedin: "https://www.linkedin.com/in/awonke-philibane-710aaa103",
  linkedinHandle: "awonke-philibane-710aaa103",
  github: "https://github.com/AwonkeP",
  githubHandle: "AwonkeP",
  currentCompany: "CAPACITI",
  degree: "Diploma in Business & Information Administration (CPUT)",
  profileImage: profilePhoto,
  summary: "Dedicated IT Technical Support in Cape Town, combining Business and Information Administration expertise from CPUT with hands-on technical skills in Fundamental Network (CCNA), Microsoft 365, workstation hardware diagnostics, and enterprise service desk operations.",
  elevatorPitch: "I am an IT Technical Support with a strong background in Business and Information Administration, currently driving service excellence at CAPACITI. By combining technical proficiency in Fundamental Network (CCNA) and Microsoft 365 with a focus on operational excellence, I ensure that technology serves as a seamless backbone for organizational productivity."
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'infra-1',
    name: 'Infrastructure & Networking',
    category: 'infra',
    domain: 'Domain 1',
    icon: 'Network',
    description: 'Hardware, routing, switching, and end-to-end network connectivity troubleshooting.',
    bullets: [
      'Fundamental Network (CCNA) (Routing & Switching)',
      'Microsoft 365 & Azure AD Identity Administration',
      'Hardware Diagnostics & Workstation Maintenance',
      'First-Line LAN/WAN & Gateway Troubleshooting'
    ]
  },
  {
    id: 'enterprise-1',
    name: 'Enterprise Tools & Software',
    category: 'enterprise',
    domain: 'Domain 2',
    icon: 'Layers',
    description: 'Enterprise ERP platforms, CRM systems, and structured ITSM service desk workflows.',
    bullets: [
      'SAP Enterprise Software & Module Navigation',
      'ITSM & Service Desk Incident Ticketing',
      'Enterprise CRM Systems & User Account Management',
      'SLA Compliance & Ticket Lifecycle Tracking'
    ]
  },
  {
    id: 'data-1',
    name: 'Data & Operations',
    category: 'data',
    domain: 'Domain 3',
    icon: 'LineChart',
    description: 'Data hygiene, incident analysis, and workflow bottleneck identification.',
    bullets: [
      'Advanced Data Entry, Validation & Integrity',
      'Workflow Bottleneck Identification & Removal',
      'Rapid Incident Diagnosis & Root Cause Analysis',
      'First-Line Technical Escalations & Resolution'
    ]
  },
  {
    id: 'admin-1',
    name: 'Administration Strategy',
    category: 'admin',
    domain: 'Domain 4',
    icon: 'Workflow',
    description: 'Translating business processes into reliable, streamlined digital workflows.',
    bullets: [
      'Business Information Administration (CPUT Trained)',
      'Process Automation & Form Digitalization',
      'Cross-Departmental Systems Integration',
      'End-User Training & Technical SOP Documentation'
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'capaciti',
    role: 'IT Technical Support',
    company: 'CAPACITI',
    location: 'Cape Town, South Africa',
    period: 'Current Role',
    isCurrent: true,
    type: 'Tech Talent Accelerator',
    summary: 'Delivering first-line technical incident management, service desk triage, infrastructure reliability, and aligning business processes with technical tools.',
    highlights: [
      {
        title: 'Service Desk Management',
        desc: 'Delivering first-line technical analysis, rapid incident resolution, and structured service desk ticketing.',
        icon: 'Headset'
      },
      {
        title: 'Infrastructure Reliability',
        desc: 'Ensuring continuous uptime, hardware health, and optimal connectivity across workplace environments.',
        icon: 'Server'
      },
      {
        title: 'Business Alignment',
        desc: 'Bridging end-user requirements with technical solutions to maximize daily organizational productivity.',
        icon: 'Handshake'
      }
    ]
  },
  {
    id: 'prasa',
    role: 'Information & Administrative Support',
    company: 'PRASA (Passenger Rail Agency of South Africa)',
    location: 'Cape Town, South Africa',
    period: 'Enterprise Transport',
    type: 'Public Transport & Rail Enterprise',
    summary: 'Applied administrative strategy and robust information support within a large-scale national transport network environment.',
    highlights: [
      {
        title: 'Enterprise Information Systems',
        desc: 'Managed critical document registries, system record integrity, and inter-departmental operational flows.',
        icon: 'Train'
      },
      {
        title: 'Process Optimization',
        desc: 'Identified documentation delays and introduced structured digital record filing to expedite data retrieval.',
        icon: 'FileText'
      },
      {
        title: 'Cross-Functional Support',
        desc: 'Provided operational assistance to multidisciplinary technical teams during transport operations.',
        icon: 'Users'
      }
    ]
  },
  {
    id: 'wced',
    role: 'Data Systems & Administrative Support',
    company: 'Western Cape Department of Education (WCED)',
    location: 'Western Cape, South Africa',
    period: 'Public Sector',
    type: 'Government Education Department',
    summary: 'Managed data systems, administrative documentation, and user technical support within the provincial public education framework.',
    highlights: [
      {
        title: 'Data Integrity & Systems',
        desc: 'Ensured high-accuracy records management, validation audits, and compliant educational data entries.',
        icon: 'Building2'
      },
      {
        title: 'Administrative Documentation',
        desc: 'Drafted standard operating procedures and streamlined routine reporting schedules.',
        icon: 'ShieldCheck'
      },
      {
        title: 'End-User Assistance',
        desc: 'Provided compassionate first-line technical guidance to administrative staff across educational centers.',
        icon: 'HelpCircle'
      }
    ]
  },
  {
    id: 'innovate-tech',
    role: 'IT Support & Technical Assistant',
    company: 'Innovate Technology',
    location: 'Cape Town, South Africa',
    period: 'Managed Services',
    type: 'IT Managed Services & Solutions',
    summary: 'Supported IT service delivery, hardware/software troubleshooting, preventative maintenance, and client system updates.',
    highlights: [
      {
        title: 'Technical Troubleshooting',
        desc: 'Diagnosed PC hardware failures, OS corruptions, peripheral errors, and application crashes.',
        icon: 'Laptop'
      },
      {
        title: 'Maintenance & Upgrades',
        desc: 'Executed scheduled patch management, anti-malware updates, and local database backup routines.',
        icon: 'Wrench'
      },
      {
        title: 'Client Service Delivery',
        desc: 'Maintained customer satisfaction through prompt incident resolution and transparent status communication.',
        icon: 'CheckCircle'
      }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'cput-diploma',
    degree: 'Diploma in Business & Information Administration',
    institution: 'Cape Peninsula University of Technology (CPUT)',
    tag: 'Diploma',
    type: 'Higher Education Diploma',
    details: 'Comprehensive grounding in administrative information systems, workflow design, business records management, and enterprise organizational strategy.',
    icon: 'GraduationCap',
    badge: 'Systems & Admin Core'
  },
  {
    id: 'ccna-cert',
    degree: 'Fundamental Network (CCNA)',
    institution: 'Cisco Networking Academy',
    tag: 'Professional Track',
    type: 'Networking Certification Track',
    details: 'Mastery of TCP/IP, IP subnetting, VLAN segmentation, switch and router configuration, ping/traceroute network diagnostic methodologies.',
    icon: 'Network',
    badge: 'Fundamental Network (CCNA)'
  },
  {
    id: 'm365-admin',
    degree: 'Microsoft 365 & IT Systems Administration',
    institution: 'Enterprise Technical Training Modules',
    tag: 'Technical Modules',
    type: 'Enterprise Cloud & Systems Track',
    details: 'Hands-on proficiency in Azure Active Directory / Entra ID, Microsoft 365 Admin Center, workstation hardware diagnostics, and role-based access management.',
    icon: 'ShieldCheck',
    badge: 'Cloud & Systems Admin'
  }
];

export const SCENARIOS: Record<string, Scenario> = {
  network: {
    id: 'network',
    title: 'Network Connectivity & Gateway Diagnostics (Fundamental Network (CCNA))',
    category: 'Infrastructure',
    description: 'User reports intermittent connectivity, packet dropouts, and slow cloud sync within a branch office network.',
    resolutionTime: '< 15 mins',
    steps: [
      'First-Line Analysis: Execute ping, traceroute, and ARP table checks to isolate the packet loss hop.',
      'Network Layer Diagnostics: Inspect gateway switch VLAN configurations, duplex mismatches, and interface error rates.',
      'Root-Cause Resolution: Flush local DNS/ARP cache, renew DHCP leases with correct DNS relays, and stabilize uplink channel.',
      'Verification & Follow-up: Run continuous throughput benchmarks and confirm zero packet drop with the end-user.'
    ]
  },
  hardware: {
    id: 'hardware',
    title: 'Workstation Hardware & OS Diagnostics',
    category: 'Hardware & Systems',
    description: 'Workstation boot failure with peripheral disconnects and system crash interrupting daily operational tasks.',
    resolutionTime: '< 20 mins',
    steps: [
      'Incident Triage: Log ticket in ITSM tool, capture system crash stop code, and isolate failing hardware components.',
      'Diagnostics & Testing: Test memory modules, examine system event logs, and execute system file integrity checks.',
      'Hardware & Driver Remediation: Reseat internal connections, update conflicting drivers, and verify system temperatures.',
      'Post-Repair Verification: Run automated diagnostic stress tests and confirm stable system recovery with the user.'
    ]
  },
  m365: {
    id: 'm365',
    title: 'Microsoft 365 Role-Based Access & Licensing',
    category: 'Cloud & Identity',
    description: 'New department hire requires customized role-based access for Microsoft 365, Teams channels, SharePoint folders, and SAP ERP roles.',
    resolutionTime: '< 10 mins',
    steps: [
      'Identity Verification: Cross-reference ticket authorization with approved HR onboarding credentials and department matrix.',
      'Azure AD / Entra ID Provisioning: Assign enterprise license, configure MFA authentication, and map user to targeted security groups.',
      'Application Permissions: Grant scoped SharePoint repository access and configure single-sign-on credentials for SAP ERP.',
      'Guided Onboarding: Walk employee through first-time sign-in, MFA validation, and close ticket with full audit trail.'
    ]
  },
  workflow: {
    id: 'workflow',
    title: 'Departmental Administrative Bottleneck',
    category: 'Workflow Optimization',
    description: 'High volume of manual paper-form entries creating a multi-day administrative backlog between operational units.',
    resolutionTime: 'Process Transformation',
    steps: [
      'Workflow Mapping: Apply Business & Information Administration principles to pinpoint redundant manual review stages.',
      'Digital Transformation: Replace paper forms with standardized digital Microsoft 365 Forms connected to structured operational registries.',
      'Administrative Training: Conduct interactive enablement session for operational staff on automated record validation.',
      'Impact Measurement: Eliminated duplicate data entry, reduced processing turnaround time from 3 days to under 2 hours.'
    ]
  }
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'cisco-network-topology',
    title: 'Fundamental Network (CCNA) Multi-VLAN Subnetting & Gateway Infrastructure',
    category: 'Infrastructure & Networking',
    summary: 'Branch network architecture simulation featuring multi-VLAN segmentation, inter-VLAN routing, and hardened gateway diagnostics.',
    description: 'Engineered and tested an enterprise-grade branch office network simulation. Designed hierarchical IP addressing schemes, configured router-on-a-stick topology with 802.1Q encapsulation, and implemented DHCP snooping to protect network integrity from rogue DHCP servers.',
    highlights: [
      'Engineered structured IPv4 subnetting plan with dedicated management, operational, and guest VLANs.',
      'Configured Inter-VLAN routing, standard and extended Access Control Lists (ACLs), and NAT/PAT.',
      'Formulated diagnostic ping/traceroute verification runbooks enabling first-line isolation of packet loss in < 10 minutes.'
    ],
    technologies: ['Fundamental Network (CCNA)', 'Cisco Packet Tracer', 'IPv4 Subnetting', '802.1Q VLANs', 'Wireshark', 'Routing & Switching'],
    status: 'Completed',
    icon: 'Network',
    githubUrl: 'https://github.com/AwonkeP'
  },
  {
    id: 'm365-identity-governance',
    title: 'Microsoft 365 & Azure AD Identity Administration Framework',
    category: 'Cloud & Identity',
    summary: 'Centralized cloud identity lifecycle management, multi-factor authentication (MFA) rollouts, and role-based access control (RBAC).',
    description: 'Designed a standardized user onboarding and offboarding framework utilizing Microsoft 365 Admin Center and Microsoft Entra ID (Azure AD). Enforced principle-of-least-privilege access across SharePoint document libraries, Exchange mailboxes, and enterprise Teams channels.',
    highlights: [
      'Implemented automated user provisioning templates reducing new-hire IT setup time from 4 hours to under 20 minutes.',
      'Deployed MFA security defaults and self-service password reset (SSPR) protocols across departmental accounts.',
      'Audited license allocations and streamlined permission sets to prevent unauthorized privilege creep.'
    ],
    technologies: ['Microsoft 365 Admin Center', 'Azure AD / Entra ID', 'Exchange Online', 'SharePoint Security', 'RBAC Security'],
    status: 'In Production',
    icon: 'ShieldCheck',
    githubUrl: 'https://github.com/AwonkeP'
  },
  {
    id: 'itsm-incident-triage-pipeline',
    title: 'ITSM Service Desk Incident Triage & SLA Escalation System',
    category: 'IT Service Management',
    summary: 'Structured service desk incident triage methodology, first-contact resolution (FCR) workflows, and workstation health diagnostics.',
    description: 'Architected a comprehensive first-line technical incident management workflow for hardware, software, and local network disruptions. Established standardized categorization, severity prioritization matrices, and symptom-to-solution diagnostic trees to meet stringent SLA targets.',
    highlights: [
      'Boosted First-Contact Resolution (FCR) rate by establishing standardized troubleshooting checklists for recurrent issues.',
      'Built a root-cause diagnostic matrix for PC boot failures, thermal throttling, and OS driver conflicts.',
      'Penned 15+ user-facing Standard Operating Procedures (SOPs) reducing repetitive support tickets by 30%.'
    ],
    technologies: ['ITSM Service Desk', 'Incident Management', 'Hardware Diagnostics', 'SLA Tracking', 'Root Cause Analysis'],
    status: 'Completed',
    icon: 'Headset',
    githubUrl: 'https://github.com/AwonkeP'
  },
  {
    id: 'business-process-digitization',
    title: 'Business Information Digitization & Operational Workflow Automation',
    category: 'Process Optimization',
    summary: 'End-to-end transformation of legacy paper-based administrative records into digitized, validated automated workflows.',
    description: 'Bridging Business & Information Administration (CPUT) with modern digital tools to overhaul cumbersome departmental paper registers. Implemented digital forms with real-time field validation, eliminating data corruption and manual handoffs.',
    highlights: [
      'Audited operational bottlenecks and designed streamlined digital replacement workflows with full audit logging.',
      'Eliminated duplicate data entry and reduced inter-departmental document processing time from 3 days to under 2 hours.',
      'Conducted end-user training sessions ensuring 100% adoption and data compliance across staff teams.'
    ],
    technologies: ['Business Information Admin', 'Digital Forms', 'Data Integrity Auditing', 'Workflow Optimization', 'SOP Documentation'],
    status: 'Completed',
    icon: 'Workflow',
    githubUrl: 'https://github.com/AwonkeP'
  }
];


