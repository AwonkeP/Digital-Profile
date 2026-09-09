import { jsPDF } from 'jspdf';
import { PROFILE_INFO, EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA, PROJECTS_DATA, CERTIFICATES_DATA } from '../data';

export function generateResumePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
      renderFooter();
    }
  };

  const renderFooter = () => {
    const pageCount = (doc.internal as any).pages ? (doc.internal as any).pages.length - 1 : 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(
      `Awonke Philibane - Curriculum Vitae | Cape Town, South Africa | ${PROFILE_INFO.email}`,
      margin,
      pageHeight - 8
    );
    doc.text(
      `Page ${pageCount}`,
      pageWidth - margin - 12,
      pageHeight - 8
    );
  };

  // Header Banner Background Accent
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 26, 'F');

  // Candidate Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('AWONKE PHILIBANE', margin + 6, y + 9);

  // Candidate Role
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(
    'IT Technical Support Specialist | Network Infrastructure & Microsoft 365 Administration',
    margin + 6,
    y + 16
  );

  // Contact Strip
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(
    `Email: ${PROFILE_INFO.email}   |   Location: ${PROFILE_INFO.location}   |   Phone: +27 67 028 1162   |   GitHub: ${PROFILE_INFO.githubHandle}`,
    margin + 6,
    y + 22
  );

  y += 32;

  // Helper for Section Titles
  const addSectionTitle = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title.toUpperCase(), margin, y);

    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.4);
    doc.line(margin, y + 2, margin + contentWidth, y + 2);
    y += 7;
  };

  // 1. PROFESSIONAL SUMMARY
  addSectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85); // slate-700
  const summaryLines = doc.splitTextToSize(PROFILE_INFO.summary, contentWidth);
  checkPageBreak(summaryLines.length * 4.2 + 4);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.2 + 4;

  // 2. CORE TECHNICAL COMPETENCIES
  addSectionTitle('Core Technical Competencies');
  doc.setFontSize(8.5);

  const competencies = [
    {
      category: 'Infrastructure & Networking',
      skills: 'Fundamental Network (CCNA), Routing & Switching, TCP/IP, 802.1Q VLANs, Subnetting, Gateway Diagnostics, Wireshark, DHCP Snooping',
    },
    {
      category: 'Cloud & Identity Governance',
      skills: 'Microsoft 365 Admin Center, Azure Active Directory / Entra ID, MFA Enforcement, RBAC, Exchange Online, SharePoint Permissions',
    },
    {
      category: 'Workstation & Hardware Support',
      skills: 'PC Component Diagnostics (Motherboard, RAM, PSU), OS Imaging (Win 10/11), Preventative Maintenance, Thermal & Storage Upgrades',
    },
    {
      category: 'Enterprise Systems & ITSM',
      skills: 'ITSM Service Desk Ticketing, SLA Compliance, First-Contact Resolution (FCR), Root Cause Analysis, SAP Enterprise Software',
    },
    {
      category: 'Administrative & Process Optimization',
      skills: 'Business Information Administration (CPUT), Data Integrity Auditing, Digital Workflow Automation, Technical SOP Authoring',
    },
  ];

  competencies.forEach((comp) => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`•  ${comp.category}:`, margin + 2, y);

    const categoryWidth = doc.getTextWidth(`•  ${comp.category}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const detailLines = doc.splitTextToSize(comp.skills, contentWidth - categoryWidth - 4);
    doc.text(detailLines, margin + 2 + categoryWidth, y);
    y += detailLines.length * 4 + 1.5;
  });

  y += 3;

  // 3. PROFESSIONAL EXPERIENCE
  addSectionTitle('Professional Experience');

  EXPERIENCE_DATA.forEach((exp) => {
    checkPageBreak(25);

    // Role and Company Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const periodText = `${exp.period} | ${exp.location}`;
    const periodWidth = doc.getTextWidth(periodText);
    doc.text(periodText, margin + contentWidth - periodWidth, y);

    y += 4.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.company}  —  ${exp.type || exp.location}`, margin, y);

    y += 4.5;

    // Bullet points
    exp.highlights.forEach((hl) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const textToRender = `${hl.title}: ${hl.desc}`;
      const bulletLines = doc.splitTextToSize(textToRender, contentWidth - 6);
      checkPageBreak(bulletLines.length * 3.8 + 1.5);
      doc.text('•', margin + 2, y);
      doc.text(bulletLines, margin + 6, y);
      y += bulletLines.length * 3.8 + 1.5;
    });

    y += 2.5;
  });

  // 4. EDUCATION & CERTIFICATIONS
  addSectionTitle('Education & Professional Certifications');

  EDUCATION_DATA.forEach((edu) => {
    checkPageBreak(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.degree, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const badgeText = edu.badge || edu.tag;
    const yrWidth = doc.getTextWidth(badgeText);
    doc.text(badgeText, margin + contentWidth - yrWidth, y);

    y += 4.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const detailLines = doc.splitTextToSize(`${edu.institution}  •  ${edu.details}`, contentWidth);
    doc.text(detailLines, margin, y);
    y += detailLines.length * 4 + 3;
  });

  // 4b. LICENSES & CERTIFICATIONS
  if (CERTIFICATES_DATA && CERTIFICATES_DATA.length > 0) {
    addSectionTitle('Verified Licenses & Certifications');

    CERTIFICATES_DATA.forEach((cert) => {
      checkPageBreak(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(cert.name, margin, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const yrWidth = doc.getTextWidth(cert.issueDate);
      doc.text(cert.issueDate, margin + contentWidth - yrWidth, y);

      y += 4.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      const credText = `${cert.issuer}  •  Credential ID: ${cert.credentialId}${cert.skills ? `  •  Skills: ${cert.skills}` : ''}`;
      const credLines = doc.splitTextToSize(credText, contentWidth);
      doc.text(credLines, margin, y);
      y += credLines.length * 3.8 + 2.5;
    });
  }

  // 5. FEATURED TECHNICAL PROJECTS
  if (PROJECTS_DATA && PROJECTS_DATA.length > 0) {
    addSectionTitle('Featured Technical Projects & Repositories');

    PROJECTS_DATA.forEach((proj) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.title, margin, y);

      if (proj.githubUrl) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(37, 99, 235); // blue-600
        const linkText = proj.githubUrl.replace('https://github.com/', 'github.com/');
        const linkWidth = doc.getTextWidth(linkText);
        doc.text(linkText, margin + contentWidth - linkWidth, y);
      }

      y += 4.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const descLines = doc.splitTextToSize(proj.summary, contentWidth);
      doc.text(descLines, margin, y);
      y += descLines.length * 3.8 + 2;

      // Tech Stack
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Stack: ${proj.technologies.join('  •  ')}`, margin, y);
      y += 5;
    });
  }

  // Final footer stamp
  renderFooter();

  // Trigger browser download
  doc.save('Awonke_Philibane_CV.pdf');
}

/**
 * Clean printable window handler that avoids iframe sandbox print restrictions
 */
export function triggerPrintCv(): void {
  try {
    // Generate an isolated printable HTML window or use window.print()
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      // If popup is blocked by browser, fallback to PDF generation
      generateResumePdf();
      return;
    }

    const expHtml = EXPERIENCE_DATA.map(
      (exp) => `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h4 style="margin: 0; font-size: 13px; font-weight: bold; color: #0f172a;">${exp.role}</h4>
          <span style="font-size: 11px; color: #64748b; font-weight: bold;">${exp.period} | ${exp.location}</span>
        </div>
        <div style="font-size: 11px; font-weight: 600; color: #334155; margin-bottom: 6px;">${exp.company} — ${exp.type || exp.location}</div>
        <ul style="margin: 0; padding-left: 18px; font-size: 11px; color: #475569; line-height: 1.5;">
          ${exp.highlights.map((h) => `<li style="margin-bottom: 4px;"><strong>${h.title}:</strong> ${h.desc}</li>`).join('')}
        </ul>
      </div>
    `
    ).join('');

    const eduHtml = EDUCATION_DATA.map(
      (edu) => `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h4 style="margin: 0; font-size: 12px; font-weight: bold; color: #0f172a;">${edu.degree}</h4>
          <span style="font-size: 11px; color: #64748b; font-weight: bold;">${edu.badge || edu.tag}</span>
        </div>
        <div style="font-size: 11px; color: #475569;">${edu.institution} — ${edu.details}</div>
      </div>
    `
    ).join('');

    const certHtml = CERTIFICATES_DATA.map(
      (cert) => `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h4 style="margin: 0; font-size: 12px; font-weight: bold; color: #0f172a;">${cert.name}</h4>
          <span style="font-size: 11px; color: #64748b; font-weight: bold;">${cert.issueDate}</span>
        </div>
        <div style="font-size: 11px; color: #475569;">${cert.issuer} • Credential ID: ${cert.credentialId}</div>
        ${cert.skills ? `<div style="font-size: 10.5px; color: #64748b; margin-top: 2px;"><strong>Skills:</strong> ${cert.skills}</div>` : ''}
      </div>
    `
    ).join('');

    const projHtml = PROJECTS_DATA.map(
      (p) => `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h4 style="margin: 0; font-size: 12px; font-weight: bold; color: #0f172a;">${p.title}</h4>
          <span style="font-size: 10px; color: #2563eb;">${p.githubUrl || ''}</span>
        </div>
        <p style="margin: 4px 0; font-size: 11px; color: #475569;">${p.summary}</p>
        <div style="font-size: 10px; color: #64748b; font-weight: 600;">Stack: ${p.technologies.join(' • ')}</div>
      </div>
    `
    ).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Awonke Philibane - Curriculum Vitae</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 10px;
              line-height: 1.4;
              background: #fff;
            }
            .header-banner {
              background: #0f172a;
              color: #fff;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .header-banner h1 {
              margin: 0 0 6px 0;
              font-size: 22px;
              letter-spacing: 0.5px;
            }
            .header-banner h2 {
              margin: 0 0 8px 0;
              font-size: 12px;
              font-weight: normal;
              color: #cbd5e1;
            }
            .header-contacts {
              font-size: 10px;
              color: #94a3b8;
            }
            .section-title {
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.8px;
              color: #0f172a;
              border-bottom: 1.5px solid #cbd5e1;
              padding-bottom: 4px;
              margin: 18px 0 10px 0;
            }
            p {
              margin: 0 0 8px 0;
              font-size: 11px;
              color: #334155;
              line-height: 1.5;
            }
            @media print {
              body {
                padding: 0;
              }
              .header-banner {
                background: #0f172a !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <h1>AWONKE PHILIBANE</h1>
            <h2>IT Technical Support Specialist | Network Infrastructure & Microsoft 365 Administration</h2>
            <div class="header-contacts">
              Email: ${PROFILE_INFO.email} &nbsp;|&nbsp; Location: ${PROFILE_INFO.location} &nbsp;|&nbsp; Phone: +27 67 028 1162 &nbsp;|&nbsp; GitHub: ${PROFILE_INFO.github}
            </div>
          </div>

          <div class="section-title">Professional Summary</div>
          <p>${PROFILE_INFO.summary}</p>

          <div class="section-title">Professional Experience</div>
          ${expHtml}

          <div class="section-title">Education & Training</div>
          ${eduHtml}

          <div class="section-title">Licenses & Certifications</div>
          ${certHtml}

          <div class="section-title">Featured Technical Projects</div>
          ${projHtml}

          <script>
            window.onload = function() {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } catch (err) {
    console.error('Print window error, falling back to PDF download:', err);
    generateResumePdf();
  }
}
