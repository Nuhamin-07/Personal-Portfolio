"use client";

import React, { useState, useEffect } from "react";
import { Folder, FolderOpen, X, Maximize2 } from "lucide-react";
import { certifications, type Certification, type CategoryId } from "@/data/certifications";
import SectionHeader from "@/components/shared/SectionHeader";
import styles from "./Certifications.module.css";

export default function Certifications() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
    const [activeCertificate, setActiveCertificate] = useState<Certification>(
        certifications[0] || null
    );
    const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);
    const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);

    // Filter certificates according to selected category
    const filteredCertifications = certifications.filter((cert) => {
        if (selectedCategory === "all") return true;
        if (cert.categories && cert.categories.includes(selectedCategory)) return true;
        return cert.category === selectedCategory;
    });

    // Keep active certificate in sync with filtered list when category changes
    useEffect(() => {
        if (filteredCertifications.length > 0) {
            const isCurrentInFiltered = filteredCertifications.some(
                (c) => c.id === activeCertificate?.id
            );
            if (!isCurrentInFiltered) {
                setActiveCertificate(filteredCertifications[0]);
            }
        }
    }, [selectedCategory, filteredCertifications, activeCertificate?.id]);

    // Handle keyboard Escape key to close modals
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileModalOpen(false);
                setIsFullImageOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Lock body scroll when mobile modal or full image modal is open
    useEffect(() => {
        if (isMobileModalOpen || isFullImageOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileModalOpen, isFullImageOpen]);

    const handleCardClick = (cert: Certification) => {
        setActiveCertificate(cert);
        // On narrower screens, open the modal view
        if (typeof window !== "undefined" && window.innerWidth < 1280) {
            setIsMobileModalOpen(true);
        }
    };


    return (
        <section id="certifications" className={styles.section}>
            {/* Cyber Ambient Atmosphere */}
            <div className={styles.ambientGlow} aria-hidden="true" />

            {/* Background Code Watermark */}
            <div className={styles.codeWatermark} aria-hidden="true">
                &lt;html&gt;<br />
                &nbsp;&nbsp;&lt;body&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;meta tags="utf-8"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;script&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function render() &#123;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.cred = verify_state(token);<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/script&gt;
            </div>

            <div className={styles.container}>
                {/* ── Reusable Editorial Section Header ── */}
                <SectionHeader
                    tag="[ 05 / CREDENTIALS & CERTIFICATIONS ]"
                    title="Credential"
                    titleSecondLine="Journey."
                    stickerText="VERIFIED & CURRENT"
                    countBadge={`${certifications.length} Certs`}
                    description="Continuous professional learning journey validating expertise across modern web engineering, cloud platforms, and architecture."
                    className="mb-8 sm:mb-12 lg:mb-16"
                />

                {/* ── Dashboard Grid ── */}
                <div className={styles.dashboardGrid}>
                    {/* ── Column 1: Certificate Categories Sidebar ── */}
                    <aside className={styles.sidebarCol} aria-label="Certificate categories">
                        <span className={styles.sidebarHeader}>CERTIFICATE CATEGORIES</span>

                        <nav className={styles.categoryTree} aria-label="Certificate categories">
                            <button
                                type="button"
                                className={`${styles.treeItem} ${selectedCategory === "all" ? styles.treeItemActive : ""
                                    }`}
                                onClick={() => setSelectedCategory("all")}
                                aria-pressed={selectedCategory === "all"}
                            >
                                {selectedCategory === "all" ? (
                                    <FolderOpen size={16} style={{ color: "var(--accent)" }} />
                                ) : (
                                    <Folder size={16} />
                                )}
                                <span>All</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.treeItem} ${selectedCategory === "fullstack" ? styles.treeItemActive : ""
                                    }`}
                                onClick={() => setSelectedCategory("fullstack")}
                                aria-pressed={selectedCategory === "fullstack"}
                            >
                                <span className={styles.treeConnector}>├──</span>
                                {selectedCategory === "fullstack" ? (
                                    <FolderOpen size={16} style={{ color: "var(--accent)" }} />
                                ) : (
                                    <Folder size={16} />
                                )}
                                <span>Full-Stack</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.treeItem} ${selectedCategory === "frontend" ? styles.treeItemActive : ""
                                    }`}
                                onClick={() => setSelectedCategory("frontend")}
                                aria-pressed={selectedCategory === "frontend"}
                            >
                                <span className={styles.treeConnector}>└──</span>
                                {selectedCategory === "frontend" ? (
                                    <FolderOpen size={16} style={{ color: "var(--accent)" }} />
                                ) : (
                                    <Folder size={16} />
                                )}
                                <span>Frontend</span>
                            </button>
                        </nav>


                    </aside>

                    {/* ── Column 2: Center Timeline Stream ── */}
                    <main className={styles.timelineCol} aria-label="Credentials timeline">
                        <div className={styles.timelineStream}>
                            {filteredCertifications.map((cert) => {
                                const isActive = activeCertificate?.id === cert.id;

                                return (
                                    <div key={cert.id} className={styles.timelineRow}>
                                        {/* The Certificate Card */}
                                        <div
                                            className={`${styles.certCard} ${isActive ? styles.certCardActive : ""
                                                }`}
                                            onClick={() => handleCardClick(cert)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    handleCardClick(cert);
                                                }
                                            }}
                                            aria-label={`Select ${cert.title}`}
                                        >
                                            {/* Left: Certificate Preview Thumbnail */}
                                            <div className={styles.certThumbFrame}>
                                                <img
                                                    src={cert.image}
                                                    alt={`${cert.title} certificate document`}
                                                    className={styles.certThumbImg}
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Center: Title & Metadata */}
                                            <div className={styles.certInfo}>
                                                <h3 className={styles.certTitle}>
                                                    {cert.title}
                                                </h3>

                                                <div className={styles.certIssued}>
                                                    ISSUED: {cert.issuedDate}
                                                </div>

                                                <div className={styles.certInstitution}>
                                                    ISSUING INSTITUTION: {cert.issuer}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Circuit Branch to Skills (Desktop) */}
                                        <div className={styles.branchCluster} aria-hidden="true">
                                            {/* Circuit Branch SVG Path */}
                                            <svg
                                                className={styles.branchSvg}
                                                viewBox="0 0 28 52"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0 26 H12 C18 26 22 20 22 14 V12 H28"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M12 26 C18 26 22 32 22 38 V40 H28"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <circle cx="28" cy="12" r="2.5" fill="currentColor" />
                                                <circle cx="28" cy="40" r="2.5" fill="currentColor" />
                                            </svg>

                                            <div className={styles.branchSkillsWrap}>
                                                <span className={styles.skillsValidatedLabel}>
                                                    SKILLS VALIDATED
                                                </span>
                                                {cert.cardSkills.map((skill, idx) => (
                                                    <span key={idx} className={styles.branchPill}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </main>

                    {/* ── Column 3: Right Details Panel (Desktop Sticky) ── */}
                    {activeCertificate && (
                        <aside
                            className={styles.detailsCol}
                            aria-label="Certificate details inspector"
                        >
                            <div className={styles.panelCard}>
                                {/* Panel Header */}
                                <div className={styles.panelHeader}>
                                    <h3 className={styles.panelHeaderTitle}>
                                        CERTIFICATE DETAILS
                                    </h3>
                                </div>

                                {/* 1. Certificate Details */}
                                <div className={styles.certDetailsSection}>
                                    <div className={styles.panelSectionTitle}>
                                        1. CERTIFICATE DETAILS
                                    </div>

                                    <div
                                        className={styles.certImageStage}
                                        onClick={() => setIsFullImageOpen(true)}
                                        role="button"
                                        tabIndex={0}
                                        title="Click to view full image"
                                    >
                                        <img
                                            src={activeCertificate.image}
                                            alt={`Full credential document for ${activeCertificate.title}`}
                                            className={styles.certFullImage}
                                        />
                                    </div>

                                    <div className={styles.certMetaBlock}>
                                        <div className={styles.certMetaTitle}>
                                            {activeCertificate.title}
                                        </div>
                                        <div className={styles.certMetaIssuer}>
                                            {activeCertificate.issuer} • {activeCertificate.issuedDate} • {activeCertificate.categoryLabel}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Program Description */}
                                <div>
                                    <div className={styles.panelSectionTitle}>
                                        2. PROGRAM DESCRIPTION
                                    </div>
                                    <p className={styles.competenciesText}>
                                        {activeCertificate.description}
                                    </p>
                                </div>

                                {/* 3. Key Concepts */}
                                <div>
                                    <div className={styles.panelSectionTitle}>
                                        3. KEY CONCEPTS
                                    </div>
                                    <div className={styles.keyConceptsContainer}>
                                        {activeCertificate.keyConcepts.map((concept, idx) => (
                                            <div key={idx} className={styles.keyConceptItem}>
                                                <span className={styles.keyConceptBullet} aria-hidden="true">✦</span>
                                                <span className={styles.keyConceptText}>{concept}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Skills Earned */}
                                <div>
                                    <div className={styles.panelSectionTitle}>
                                        4. SKILLS EARNED
                                    </div>
                                    <div className={styles.skillsPillGrid}>
                                        {activeCertificate.validatedSkills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className={styles.skillPill}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {/* ── Mobile / Tablet Detail Modal Drawer ── */}
            {isMobileModalOpen && activeCertificate && (
                <div
                    className={styles.mobileModalOverlay}
                    onClick={() => setIsMobileModalOpen(false)}
                    role="presentation"
                >
                    <div
                        className={styles.mobileModalWindow}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Certificate Details Modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with Close Button */}
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelHeaderTitle}>CERTIFICATE DETAILS</h3>
                            <button
                                type="button"
                                className={styles.panelCloseBtn}
                                onClick={() => setIsMobileModalOpen(false)}
                                aria-label="Close certificate details"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* 1. Certificate Details */}
                        <div className={styles.certDetailsSection}>
                            <div className={styles.panelSectionTitle}>
                                1. CERTIFICATE DETAILS
                            </div>
                            <div
                                className={styles.certImageStage}
                                onClick={() => setIsFullImageOpen(true)}
                            >
                                <img
                                    src={activeCertificate.image}
                                    alt={`Certificate document for ${activeCertificate.title}`}
                                    className={styles.certFullImage}
                                />
                            </div>
                            <div className={styles.certMetaBlock}>
                                <div className={styles.certMetaTitle}>
                                    {activeCertificate.title}
                                </div>
                                <div className={styles.certMetaIssuer}>
                                    {activeCertificate.issuer} • {activeCertificate.issuedDate} • {activeCertificate.categoryLabel}
                                </div>
                            </div>
                        </div>

                        {/* 2. Program Description */}
                        <div>
                            <div className={styles.panelSectionTitle}>
                                2. PROGRAM DESCRIPTION
                            </div>
                            <p className={styles.competenciesText}>
                                {activeCertificate.description}
                            </p>
                        </div>

                        {/* 3. Key Concepts */}
                        <div>
                            <div className={styles.panelSectionTitle}>
                                3. KEY CONCEPTS
                            </div>
                            <div className={styles.keyConceptsContainer}>
                                {activeCertificate.keyConcepts.map((concept, idx) => (
                                    <div key={idx} className={styles.keyConceptItem}>
                                        <span className={styles.keyConceptBullet} aria-hidden="true">✦</span>
                                        <span className={styles.keyConceptText}>{concept}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Skills Earned */}
                        <div>
                            <div className={styles.panelSectionTitle}>
                                4. SKILLS EARNED
                            </div>
                            <div className={styles.skillsPillGrid}>
                                {activeCertificate.validatedSkills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className={styles.skillPill}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Fullscreen Image Lightbox ── */}
            {isFullImageOpen && activeCertificate && (
                <div
                    className={styles.mobileModalOverlay}
                    onClick={() => setIsFullImageOpen(false)}
                    role="presentation"
                    style={{ zIndex: 110 }}
                >
                    <div
                        style={{
                            position: "relative",
                            maxWidth: "92vw",
                            maxHeight: "92vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className={styles.panelCloseBtn}
                            onClick={() => setIsFullImageOpen(false)}
                            aria-label="Close image preview"
                            style={{
                                position: "absolute",
                                top: "-40px",
                                right: "0px",
                                color: "#ffffff",
                            }}
                        >
                            <X size={26} />
                        </button>
                        <img
                            src={activeCertificate.image}
                            alt={activeCertificate.title}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "88vh",
                                objectFit: "contain",
                                borderRadius: "10px",
                                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                            }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
