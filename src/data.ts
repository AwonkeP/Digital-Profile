import { SkillItem, ExperienceItem, EducationItem, Scenario } from './types';
import profilePhoto from './assets/images/awonke_original_photo_1788162799634.jpg';

export const PROFILE_INFO = {
  name: "Awonke Philibane",
  role: "IT Technical Support",
  headline: "IT Technical Support | Optimizing Systems & Business Workflows",
  location: "Cape Town, Western Cape, South Africa",
  email: "Philibaneawonke@gmail.com",
  currentCompany: "CAPACITI",
  degree: "B.Tech Business & Information Administration (CPUT)",
  profileImage: profilePhoto,
  summary: "Dedicated IT Technical Support in Cape Town, combining Business and Information Administration expertise from CPUT with hands-on technical skills in CCNA networking, SQL database management, Microsoft 365, and enterprise service desk operations.",
  elevatorPitch: "I am an IT Technical Support with a strong background in Business and Information Administration, currently driving service excellence at CAPACITI. By combining technical proficiency in CCNA networking and SQL with a focus on operational excellence, I ensure that technology serves as a seamless backbone for organizational productivity."
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
      'Fundamental CCNA Networking (Routing & Switching)',
      'Microsoft 365 & Azure AD Identity Administration',
      'Database Systems & Server Connectivity',
      'First-Line LAN/WAN & Gateway Troubleshooting'
    ]
  },
  {
    id: 'enterprise-1',
    name: 'Enterprise Tools & Software',
    category: 'enterprise',
    domain: 'Domain 2',
    icon: 'Layers',
    description: 'Enterprise ERP platforms, databases, and structured ITSM service desk workflows.',
    bullets: [
      'SAP Enterprise Software & Module Navigation',
      'SQL Queries & Relational Database Management',
      'Enterprise CRM Systems & Customer Data Pipelines',
      'ITSM & Service Desk Incident Ticketing'
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
    id: 'cput-degree',
    degree: 'Business & Information Administration',
    institution: 'Cape Peninsula University of Technology (CPUT)',
    tag: "Bachelor's Degree",
    type: 'Higher Education Degree',
    details: 'Comprehensive grounding in administrative information systems, workflow design, database fundamentals, and enterprise organizational strategy.',
    icon: 'GraduationCap',
    badge: 'Systems & Admin Core'
  },
  {
    id: 'ccna-cert',
    degree: 'Cisco Certified Network Associate (CCNA)',
    institution: 'Cisco Networking Academy',
    tag: 'Professional Track',
    type: 'Networking Certification Track',
    details: 'Mastery of TCP/IP, IP subnetting, VLAN segmentation, switch and router configuration, ping/traceroute network diagnostic methodologies.',
    icon: 'Network',
    badge: 'Networking & Routing'
  },
  {
    id: 'm365-db',
    degree: 'Microsoft 365 & Database Administration',
    institution: 'Enterprise Technical Training Modules',
    tag: 'Technical Modules',
    type: 'Enterprise Cloud & DB Track',
    details: 'Hands-on proficiency in Azure Active Directory / Entra ID, Microsoft 365 Admin Center, SQL query design, database schema management, and role-based access.',
    icon: 'Database',
    badge: 'Cloud & Relational DB'
  }
];

export const SCENARIOS: Record<string, Scenario> = {
  network: {
    id: 'network',
    title: 'Network & Connectivity Bottleneck (CCNA)',
    category: 'Infrastructure',
    description: 'User reports intermittent connectivity, packet dropouts, and slow cloud database sync within a branch office network.',
    resolutionTime: '< 15 mins',
    steps: [
      'First-Line Analysis: Execute ping, traceroute, and ARP table checks to isolate the packet loss hop.',
      'Network Layer Diagnostics: Inspect gateway switch VLAN configurations, duplex mismatches, and interface error rates.',
      'Root-Cause Resolution: Flush local DNS/ARP cache, renew DHCP leases with correct DNS relays, and stabilize uplink channel.',
      'Verification & Follow-up: Run continuous throughput benchmarks and confirm zero packet drop with the end-user.'
    ]
  },
  database: {
    id: 'database',
    title: 'SQL Database Query / Data Discrepancy',
    category: 'Database & SQL',
    description: 'Administrative staff cannot extract weekly report metrics from the SQL database system due to execution timeouts and lock contention.',
    resolutionTime: '< 20 mins',
    steps: [
      'Incident Triage: Log ticket in ITSM tool, isolate query execution plan, and identify blocking database locks.',
      'SQL Query Optimization: Refactor unindexed WHERE clauses and apply non-locking READ COMMITTED snapshot hints.',
      'Workflow Automation: Schedule heavy batch metric extracts during off-peak windows via automated SQL Agent jobs.',
      'Documentation & Training: Deliver parameterized query templates to administrative leads to prevent future table locks.'
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
      'Workflow Mapping: Apply B.Tech Business & Information Administration principles to pinpoint redundant manual review stages.',
      'Digital Transformation: Replace paper forms with standardized digital Microsoft 365 Forms connected to a structured SQL database backend.',
      'Administrative Training: Conduct interactive enablement session for operational staff on automated record validation.',
      'Impact Measurement: Eliminated duplicate data entry, reduced processing turnaround time from 3 days to under 2 hours.'
    ]
  }
};
