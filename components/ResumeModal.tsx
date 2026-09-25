"use client";

import { useState } from "react";

export default function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

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
      className="cv-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="cv-modal-content relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close CV Modal"
        >
          ✕
        </button>

        {/* CV Header */}
        <div className="border-b border-border pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Nuhamin Gulilat Masresha
              </h2>
              <p className="text-base font-semibold text-primary mt-1">
                Full-Stack Developer & Frontend Engineer
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                📍 Addis Ababa, Ethiopia (UTC+3) • Available for US / EU / Global Remote
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow transition-all hover:bg-primary/90"
              >
                📄 Print / Save PDF
              </button>
              <button
                onClick={copyContact}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-border"
              >
                {copied ? "✓ Copied Email" : "✉️ Copy Email"}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
            <span>✉️ nuhamin.gulilat.7@gmail.com</span>
            <span>🌐 nuhamin-dev.netlify.app</span>
            <span>🐙 github.com/Nuhamin-07</span>
            <span>💼 linkedin.com/in/nuhamin-gulilat-66635318b</span>
          </div>
        </div>

        {/* CV Body */}
        <div className="mt-6 space-y-6 text-sm leading-relaxed">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Professional Summary
            </h3>
            <p className="mt-2 text-muted-foreground">
              Full-Stack Developer with nearly 4 years of experience engineering enterprise web applications, SaaS platforms, and hospital management systems. Specialized in Next.js, React, TypeScript, Node.js, Express, REST APIs, and Microsoft Power Platform solutions. Proven expertise in automated Cypress E2E testing and remote collaboration.
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Education
            </h3>
            <div className="mt-2 flex justify-between items-start">
              <div>
                <p className="font-bold text-foreground">Bachelor of Science in Electrical and Computer Engineering</p>
                <p className="text-xs text-muted-foreground">Computer Engineering Stream • Arba Minch University</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">Jan 2021</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Technical Skills
            </h3>
            <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <p><strong className="text-foreground">Frontend:</strong> Next.js, React.js, TypeScript, JavaScript (ES6+), Redux Toolkit, React Query, Tailwind CSS, Material UI, Sass</p>
              <p><strong className="text-foreground">Backend & DB:</strong> Node.js, Express.js, REST APIs, Session Auth, MongoDB, MySQL, SQLite, Dataverse</p>
              <p><strong className="text-foreground">QA & Automation:</strong> Cypress, Puppeteer, Jest, TDD, BDD</p>
              <p><strong className="text-foreground">Enterprise:</strong> Power Pages, Power Apps, Power Automate, Dataverse, Power BI</p>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Professional Experience
            </h3>

            <div className="mt-3 space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-foreground">Software Developer | Florida University Southeast (FUSE)</p>
                  <span className="font-mono text-xs text-muted-foreground">Jul 2024 – Present</span>
                </div>
                <p className="text-xs text-primary font-medium">Remote • SIMS Platform</p>
                <ul className="mt-1.5 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  <li>Built and maintained Power Pages student portals with JavaScript, Liquid, and FetchXML.</li>
                  <li>Engineered automated Power Automate cloud workflows for admissions and grade processing.</li>
                  <li>Modeled Dataverse security data structures and developed Power BI decision dashboards.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-foreground">Software Developer | Gotemeri Network Integrator</p>
                  <span className="font-mono text-xs text-muted-foreground">Jan 2023 – Dec 2023</span>
                </div>
                <p className="text-xs text-primary font-medium">Addis Ababa • Hospital Management System</p>
                <ul className="mt-1.5 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  <li>Engineered 7 clinical modules including Lab Requests, Pathology, Prescriptions, and HR.</li>
                  <li>Implemented sub-second MySQL database reporting pipelines for patient auditing.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-foreground">Frontend Developer | 2F Capital PLC</p>
                  <span className="font-mono text-xs text-muted-foreground">Mar 2022 – Nov 2022</span>
                </div>
                <p className="text-xs text-primary font-medium">Addis Ababa • Merchant Portal & E-Commerce</p>
                <ul className="mt-1.5 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  <li>Developed responsive React SPAs with React Query caching and Material UI data tables.</li>
                  <li>Authored Cypress E2E automated test suites following BDD practices.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-foreground">Frontend Developer | iWork Technology PLC</p>
                  <span className="font-mono text-xs text-muted-foreground">Jul 2021 – Jan 2022</span>
                </div>
                <p className="text-xs text-primary font-medium">Addis Ababa • Enterprise ERP System</p>
                <ul className="mt-1.5 list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  <li>Built HR and automated payroll interfaces using React and Redux state management.</li>
                  <li>Created Cypress and Puppeteer automated visual regression tests.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground print:hidden">
          <span>Nuhamin Gulilat CV • Ready for Hiring</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-muted px-4 py-2 font-semibold text-foreground hover:bg-border transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
