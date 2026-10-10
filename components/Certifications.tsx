
"use client";

import { useEffect, useRef, useState } from "react";
import {
    ArrowDown,
    ArrowUp,
    Award,
    BookOpen,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    X,
} from "lucide-react";

import {
    certifications,
    type Certification,
} from "@/data/certifications";

import styles from "./Certifications.module.css";

type TurnDirection = "next" | "previous" | null;

const TURN_DURATION = 850;
const WHEEL_UNLOCK_DELAY = TURN_DURATION + 300;

export default function Certifications() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [turnDirection, setTurnDirection] = useState<TurnDirection>(null);
    const [targetIndex, setTargetIndex] = useState<number | null>(null);
    const [selectedCertificate, setSelectedCertificate] =
        useState<Certification | null>(null);

    const notebookRef = useRef<HTMLDivElement>(null);
    const currentIndexRef = useRef(0);
    const turnDirectionRef = useRef<TurnDirection>(null);
    const wheelLockedRef = useRef(false);
    const wheelUnlockTimerRef = useRef<number | null>(null);

    const total = certifications.length;

    const currentCertificate = certifications[currentIndex];
    const targetCertificate =
        targetIndex !== null
            ? certifications[targetIndex]
            : null;

    // Keep refs in sync so the global wheel listener never uses stale state.
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        turnDirectionRef.current = turnDirection;
    }, [turnDirection]);

    const goToPage = (direction: Exclude<TurnDirection, null>) => {
        if (turnDirectionRef.current !== null || total < 2) return;

        const current = currentIndexRef.current;
        const next =
            direction === "next"
                ? (current + 1) % total
                : (current - 1 + total) % total;

        turnDirectionRef.current = direction;
        setTargetIndex(next);
        setTurnDirection(direction);
    };

    // Commit the new certificate only after the page has visibly turned.
    useEffect(() => {
        if (turnDirection === null || targetIndex === null) return;

        const timer = window.setTimeout(() => {
            currentIndexRef.current = targetIndex;
            turnDirectionRef.current = null;

            setCurrentIndex(targetIndex);
            setTargetIndex(null);
            setTurnDirection(null);
        }, TURN_DURATION);

        return () => window.clearTimeout(timer);
    }, [turnDirection, targetIndex]);

    // Scroll down to turn forward; scroll up to turn backward.
    useEffect(() => {
        if (total < 2) return;

        const unlockWheel = () => {
            wheelLockedRef.current = false;
            wheelUnlockTimerRef.current = null;
        };

        const handleWheel = (event: WheelEvent) => {
            const notebook = notebookRef.current;
            if (!notebook) return;

            // Ignore small trackpad movements and horizontal scrolling.
            if (Math.abs(event.deltaY) < 25) return;
            if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

            if (
                wheelLockedRef.current ||
                turnDirectionRef.current !== null
            ) {
                return;
            }

            const rect = notebook.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Only activate when a substantial part of the notebook is visible.
            const isVisible =
                rect.top < viewportHeight * 0.75 &&
                rect.bottom > viewportHeight * 0.25;

            if (!isVisible) return;

            wheelLockedRef.current = true;

            goToPage(event.deltaY > 0 ? "next" : "previous");

            if (wheelUnlockTimerRef.current !== null) {
                window.clearTimeout(wheelUnlockTimerRef.current);
            }

            wheelUnlockTimerRef.current = window.setTimeout(
                unlockWheel,
                WHEEL_UNLOCK_DELAY,
            );
        };

        // A global listener also works when the pointer is beside the notebook.
        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);

            if (wheelUnlockTimerRef.current !== null) {
                window.clearTimeout(wheelUnlockTimerRef.current);
                wheelUnlockTimerRef.current = null;
            }
        };
    }, [total]);

    // Close the details modal with Escape.
    useEffect(() => {
        if (!selectedCertificate) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedCertificate(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedCertificate]);

    if (total === 0 || !currentCertificate) return null;

    const renderPageContent = (
        certificate: Certification,
        isBack = false,
    ) => (
        <div className={styles.paperContent}>
            <div className={styles.paperTopline}>
                <span className={styles.paperBrand}>
                    <Award size={15} aria-hidden="true" />
                    LEARNING JOURNAL
                </span>

                <span className={styles.paperNumber}>
                    {String(
                        certifications.findIndex(
                            (item) => item.id === certificate.id,
                        ) + 1,
                    ).padStart(2, "0")}{" "}
                    / {String(total).padStart(2, "0")}
                </span>
            </div>

            <div className={styles.pageBody}>
                <div className={styles.certificatePreview}>
                    {certificate.image ? (
                        <img
                            src={certificate.image}
                            alt={`${certificate.title} certificate`}
                            className={styles.certificateImage}
                            draggable={false}
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            <Award size={42} strokeWidth={1.2} />
                            <span>Certificate</span>
                        </div>
                    )}
                </div>

                <div className={styles.certificateInfo}>
                    <span className={styles.eyebrow}>
                        CERTIFICATE OF COMPLETION
                    </span>

                    <h3 className={styles.certificateTitle}>
                        {certificate.title}
                    </h3>

                    <p className={styles.issuer}>{certificate.issuer}</p>

                    {certificate.completionDate && (
                        <p className={styles.completionDate}>
                            <CalendarDays size={15} aria-hidden="true" />
                            {certificate.completionDate}
                        </p>
                    )}

                    {certificate.description && (
                        <p className={styles.description}>
                            {certificate.description}
                        </p>
                    )}

                    {certificate.topics?.length > 0 && (
                        <div className={styles.topicList}>
                            {certificate.topics.slice(0, 4).map((topic, index) => (
                                <span
                                    key={`${topic}-${index}`}
                                    className={styles.topic}
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    )}

                    {!isBack && (
                        <button
                            type="button"
                            className={styles.detailsButton}
                            onClick={() => setSelectedCertificate(certificate)}
                            disabled={turnDirection !== null}
                        >
                            Explore certificate
                            <ExternalLink size={14} aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.paperFooter}>
                <span>CONTINUOUS LEARNING · PROFESSIONAL GROWTH</span>
                <span className={styles.footerDecoration}>✳</span>
            </div>
        </div>
    );

    const backCertificate =
        targetCertificate ?? currentCertificate;

    return (
        <section id="certifications" className={styles.section}>
            <div className={styles.sectionInner}>
                <header className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>
                        KNOWLEDGE IN PROGRESS
                    </span>

                    <h2 className={styles.sectionTitle}>
                        My Learning <span>Journal.</span>
                    </h2>

                    <p className={styles.sectionDescription}>
                        Every certificate marks a step forward. Flip through my
                        learning journey, skills, and professional development.
                    </p>
                </header>

                <div className={styles.notebookStage}>
                    <div ref={notebookRef} className={styles.notebook}>
                        <div className={styles.spiral} aria-hidden="true">
                            {Array.from({ length: 17 }, (_, index) => (
                                <span
                                    key={index}
                                    className={styles.spiralLoop}
                                />
                            ))}
                        </div>

                        <div
                            className={`${styles.paperStack} ${styles.paperStackOne}`}
                        />
                        <div
                            className={`${styles.paperStack} ${styles.paperStackTwo}`}
                        />

                        {/* The next certificate waits underneath the active sheet. */}
                        <div className={styles.basePage}>
                            {renderPageContent(
                                targetCertificate ?? currentCertificate
                            )}
                        </div>

                        {/* The active sheet has a front and a reverse side. */}
                        <div
                            key={currentCertificate.id}
                            className={[
                                styles.flippingPage,
                                turnDirection === "next" ? styles.flipUp : "",
                                turnDirection === "previous" ? styles.flipDown : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div className={styles.pageFront}>
                                {renderPageContent(currentCertificate)}
                            </div>

                            <div className={styles.pageBack}>
                                {renderPageContent(backCertificate, true)}
                            </div>
                        </div>

                        <div className={styles.coverEdge} aria-hidden="true" />
                    </div>

                    <div className={styles.notebookCaption}>
                        <BookOpen size={16} aria-hidden="true" />
                        <span>Scroll or turn the page to explore certificates</span>
                    </div>

                    <div className={styles.controls}>
                        <button
                            type="button"
                            className={styles.navButton}
                            onClick={() => goToPage("previous")}
                            disabled={turnDirection !== null || total < 2}
                            aria-label="Previous certificate"
                        >
                            <ChevronLeft size={18} />
                            <span>Previous</span>
                        </button>

                        <div className={styles.pageCounter} aria-live="polite">
                            <span className={styles.currentPage}>
                                {String(currentIndex + 1).padStart(2, "0")}
                            </span>
                            <span className={styles.counterDivider}>/</span>
                            <span>{String(total).padStart(2, "0")}</span>
                        </div>

                        <button
                            type="button"
                            className={styles.navButton}
                            onClick={() => goToPage("next")}
                            disabled={turnDirection !== null || total < 2}
                            aria-label="Next certificate"
                        >
                            <span>Next</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <p className={styles.flipHint}>
                        <ArrowUp size={14} aria-hidden="true" />
                        Scroll down for next · Scroll up for previous
                        <ArrowDown size={14} aria-hidden="true" />
                    </p>
                </div>
            </div>

            {selectedCertificate && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setSelectedCertificate(null)}
                    role="presentation"
                >
                    <div
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="certificate-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className={styles.modalClose}
                            onClick={() => setSelectedCertificate(null)}
                            aria-label="Close certificate details"
                        >
                            <X size={20} />
                        </button>

                        <div className={styles.modalHeader}>
                            <span className={styles.modalEyebrow}>
                                LEARNING JOURNAL · CERTIFICATE DETAILS
                            </span>

                            <h3 id="certificate-modal-title">
                                {selectedCertificate.title}
                            </h3>

                            <p>{selectedCertificate.issuer}</p>
                        </div>

                        {selectedCertificate.image && (
                            <div className={styles.modalImageWrap}>
                                <img
                                    src={selectedCertificate.image}
                                    alt={`${selectedCertificate.title} certificate`}
                                    className={styles.modalImage}
                                />
                            </div>
                        )}

                        {selectedCertificate.completionDate && (
                            <p className={styles.modalDate}>
                                <CalendarDays size={16} />
                                Completed {selectedCertificate.completionDate}
                            </p>
                        )}

                        {selectedCertificate.description && (
                            <div className={styles.modalSection}>
                                <h4>Overview</h4>
                                <p>{selectedCertificate.description}</p>
                            </div>
                        )}

                        {selectedCertificate.keyConcepts?.length > 0 && (
                            <div className={styles.modalSection}>
                                <h4>Key concepts</h4>
                                <ul className={styles.conceptList}>
                                    {selectedCertificate.keyConcepts.map(
                                        (concept, index) => (
                                            <li key={`${concept}-${index}`}>
                                                {concept}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        )}

                        {selectedCertificate.topics?.length > 0 && (
                            <div className={styles.modalSection}>
                                <h4>Topics covered</h4>
                                <div className={styles.modalTopics}>
                                    {selectedCertificate.topics.map(
                                        (topic, index) => (
                                            <span
                                                key={`${topic}-${index}`}
                                                className={styles.topic}
                                            >
                                                {topic}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                        {selectedCertificate.credentialUrl && (
                            <a
                                href={selectedCertificate.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.credentialLink}
                            >
                                Verify credential
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
