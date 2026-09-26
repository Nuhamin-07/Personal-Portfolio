"use client";

import { useState, useEffect } from "react";

export default function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"pdf" | "text">("pdf");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyContact = () => {
    navigator.clipboard.writeText("nuhamin.gulilat.7@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="cv-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="cv-modal-content relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-2xl text-foreground overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-white cursor-pointer z-10"
          aria-label="Close CV Modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="border-b border-border pb-5 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pr-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Nuhamin Gulilat Masresha
              </h2>
              <p className="text-sm font-semibold text-primary mt-0.5">
                Full-Stack Developer | Next.js • React • TypeScript • Node.js • Express.js
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                📍 Addis Ababa, Ethiopia • +251 947 939 507 • nuhamin.gulilat.7@gmail.com
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <a
                href="/cv/Nuhamin-Gulilat-CV.pdf"
                download="Nuhamin-Gulilat-CV.pdf"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
              >
                📥 Download PDF
              </a>

              <a
                href="/cv/Nuhamin-Gulilat-CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-border"
              >
                ↗ Open PDF
              </a>

              <button
                onClick={handlePrint}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-border cursor-pointer hidden sm:inline-flex"
              >
                🖨️ Print
              </button>
            </div>
          </div>

          {/* View Switcher Tabs */}
          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 print:hidden">
            <div className="flex items-center gap-1.5 rounded-lg bg-muted p-1 border border-border">
              <button
                type="button"
                onClick={() => setActiveView("pdf")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                  activeView === "pdf"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                📄 PDF Document View
              </button>
              <button
                type="button"
                onClick={() => setActiveView("text")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                  activeView === "text"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                📝 Interactive Text View
              </button>
            </div>

            <button
              onClick={copyContact}
              type="button"
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {copied ? "✓ Email Copied!" : "📋 Copy Email"}
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {activeView === "pdf" ? (
            <div className="w-full h-full min-h-[550px] flex flex-col items-center justify-center rounded-xl border border-border bg-muted/20 overflow-hidden">
              <iframe
                src="/cv/Nuhamin-Gulilat-CV.pdf#toolbar=0"
                className="w-full h-[600px] border-0 rounded-xl"
                title="Nuhamin Gulilat CV PDF"
              />
              <div className="w-full bg-card p-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground sm:hidden">
                <span>PDF Preview active</span>
                <a
                  href="/cv/Nuhamin-Gulilat-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary underline"
                >
                  Full Screen PDF ↗
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-sm leading-relaxed p-2">
              {/* Summary */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border/60 pb-1">
                  Professional Summary
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Full-Stack Developer with nearly 4 years of experience building enterprise applications, business systems, and modern web platforms. Specialized in Next.js, React, TypeScript, JavaScript, Node.js, and Express.js, with hands-on experience developing scalable solutions across education, healthcare, ERP, and e-commerce domains.
                  Experienced in frontend architecture, REST API integration, session-based authentication, responsive UI development, automated testing, and Microsoft Power Platform solutions.
                </p>
              </div>

              {/* Technical Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border/60 pb-1">
                  Technical Skills
                </h3>
                <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  <p><strong className="text-foreground">Frontend:</strong> Next.js, React.js, TypeScript, JavaScript (ES6+), Redux, React Query, HTML5, CSS3, Sass, Tailwind CSS, Material UI, Bootstrap</p>
                  <p><strong className="text-foreground">Backend:</strong> Node.js, Express.js, REST APIs, Session-Based Authentication, API Integration</p>
                  <p><strong className="text-foreground">Databases:</strong> MongoDB, MySQL, SQLite, PostgreSQL, Microsoft Dataverse</p>
                  <p><strong className="text-foreground">Microsoft Power Platform:</strong> Power Apps, Power Pages, Power Automate, Dataverse, Power BI</p>
                  <p><strong className="text-foreground">Testing & Automation:</strong> Cypress, Puppeteer, Jest, BDD, TDD</p>
                  <p><strong className="text-foreground">Tools & Practices:</strong> Git, GitHub, GitLab, Figma, Agile Scrum, SAFe Framework</p>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border/60 pb-1">
                  Professional Experience
                </h3>

                <div className="mt-3 space-y-5">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <p className="font-bold text-foreground text-base">Software Developer</p>
                      <span className="font-mono text-xs text-muted-foreground">July 2024 – Present</span>
                    </div>
                    <p className="text-xs font-semibold text-primary">Florida University Southeast (FUSE) – Remote</p>
                    <p className="text-xs text-muted-foreground italic mt-0.5">Student Information Management System (SIMS)</p>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                      <li>Develop and maintain Student Information Management System solutions.</li>
                      <li>Build Power Pages portals, Power Apps, Power Automate workflows, and Dataverse solutions.</li>
                      <li>Create Power BI reports and support enrollment, grading, attendance, and academic administration processes.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <p className="font-bold text-foreground text-base">Software Developer</p>
                      <span className="font-mono text-xs text-muted-foreground">January 2023 – December 2023</span>
                    </div>
                    <p className="text-xs font-semibold text-primary">Gotemeri Network Integrator Pvt. Ltd. Co.</p>
                    <p className="text-xs text-muted-foreground italic mt-0.5">Hospital Management System</p>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                      <li>Developed Hospital Management System modules including laboratory, pathology, prescription, referral, HR, and reporting features.</li>
                      <li>Participated in testing, deployment, and maintenance activities.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <p className="font-bold text-foreground text-base">Frontend Developer</p>
                      <span className="font-mono text-xs text-muted-foreground">March 2022 – November 2022</span>
                    </div>
                    <p className="text-xs font-semibold text-primary">2F Capital PLC</p>
                    <p className="text-xs text-muted-foreground italic mt-0.5">Merchant Portal & Multi-Tenant E-Commerce Platform</p>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                      <li>Developed merchant portal and e-commerce applications using React and Material UI.</li>
                      <li>Implemented CRUD operations, filtering, sorting, searching, and API integrations.</li>
                      <li>Built Cypress end-to-end automation tests and BDD unit tests.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <p className="font-bold text-foreground text-base">Frontend Developer</p>
                      <span className="font-mono text-xs text-muted-foreground">July 2021 – January 2022</span>
                    </div>
                    <p className="text-xs font-semibold text-primary">iWork Technology PLC</p>
                    <p className="text-xs text-muted-foreground italic mt-0.5">ERP System</p>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                      <li>Developed ERP interfaces and HR/payroll modules using React and Redux.</li>
                      <li>Built automated tests using Cypress and Puppeteer.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border/60 pb-1">
                  Certifications
                </h3>
                <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  <li><strong className="text-foreground">Full Stack Developer Career Path</strong> — Scrimba</li>
                  <li><strong className="text-foreground">Frontend Developer Career Path</strong> — Scrimba</li>
                  <li><strong className="text-foreground">Microsoft Power Up Program</strong> — Credly</li>
                  <li><strong className="text-foreground">JavaScript Algorithms and Data Structures</strong> — freeCodeCamp</li>
                  <li><strong className="text-foreground">Responsive Web Design</strong> — freeCodeCamp</li>
                </ul>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border/60 pb-1">
                  Education
                </h3>
                <div className="mt-2">
                  <p className="font-bold text-foreground text-sm">Bachelor of Science in Electrical and Computer Engineering</p>
                  <p className="text-xs text-muted-foreground">Computer Engineering Stream • Arba Minch University</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">CGPA: 3.07 / 4.00 • Graduated: January 2021</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground shrink-0 print:hidden">
          <span>Nuhamin-Gulilat-CV.pdf</span>
          <div className="flex items-center gap-3">
            <a
              href="/cv/Nuhamin-Gulilat-CV.pdf"
              download="Nuhamin-Gulilat-CV.pdf"
              className="font-semibold text-primary hover:underline"
            >
              Download PDF
            </a>
            <button
              onClick={onClose}
              type="button"
              className="rounded-lg bg-muted px-4 py-1.5 font-semibold text-foreground hover:bg-border transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
