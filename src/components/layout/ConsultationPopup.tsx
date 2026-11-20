"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/ui/ContactForm";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import SectionLabel from "@/components/ui/SectionLabel";
import { useContent } from "@/content/client";
import styles from "./ConsultationPopup.module.css";

/* Same behaviour as the original site: opens once per browser session, 25 seconds after the first page load. */
const POPUP_KEY = "hl-consultation-popup-shown";
const POPUP_DELAY_MS = 25000;

/** Keep the popup and its timer unmounted on the consultation page. */
export default function ConsultationPopup() {
  const pathname = usePathname();
  if (/^\/(?:en\/|es\/)?contact\/?$/.test(pathname)) return null;
  return <TimedConsultationPopup />;
}

/** Timed consultation modal. Closes on ×, Escape or a click on the backdrop. */
function TimedConsultationPopup() {
  const { contact, consultationPopup: t } = useContent().site;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(POPUP_KEY)) return undefined;
    } catch {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        window.sessionStorage.setItem(POPUP_KEY, "true");
      } catch {
        // storage unavailable: the popup may show again on the next visit
      }
    }, POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onMouseDown={() => setOpen(false)}>
      <section
        ref={dialogRef}
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-popup-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.layout}>
          <div className={styles.imageWrap}>
            <div className={styles.portrait}>
              <Image src={t.image} alt={t.imageAlt} fill sizes="(max-width: 767px) 100vw, 460px" className={styles.image} />
            </div>
            <div className={styles.caption}>{t.caption}</div>
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <button ref={closeRef} type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={t.close}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
              <SectionLabel className={styles.eyebrow}>{t.eyebrow}</SectionLabel>
              <h2 id="consult-popup-title" className={`h4 ${styles.title}`}>
                {t.title}
              </h2>
            </div>
            <div className={styles.details}>
              <p className={`p16 ${styles.body}`}>{t.body}</p>
              <div className={styles.contactLinks}>
                <a href={`tel:+1${contact.phone.replace(/\D/g, "")}`}>
                  <PhoneIcon width={18} height={18} aria-hidden="true" />
                  <span>{contact.phone}</span>
                </a>
                <a href={`mailto:${contact.email}`}>
                  <MailIcon width={18} height={18} aria-hidden="true" />
                  <span>{contact.email}</span>
                </a>
              </div>
              <ContactForm showTitle={false} compact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
