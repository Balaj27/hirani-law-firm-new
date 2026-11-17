"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChatIcon, MailIcon, PhoneIcon, ArrowUpRight } from "@/components/ui/Icons";
import { useContent } from "@/content/client";
import styles from "./ContactWidget.module.css";

export default function ContactWidget() {
  const { contact, contactWidget: t } = useContent().site;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={root}
      className={styles.widget}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : <ChatIcon width={28} height={28} strokeWidth={1.6} aria-hidden="true" />}
      </button>
      <nav id={panelId} className={styles.panel} aria-label={t.open} hidden={!open}>
        <a className={styles.option} href={`tel:+1${contact.phone.replace(/\D/g, "")}`} onClick={() => setOpen(false)}>
          <PhoneIcon width={24} height={24} aria-hidden="true" />
          <span><strong>{t.call}</strong><span className={styles.detail}>{contact.phone}</span></span>
        </a>
        <a className={styles.option} href={`mailto:${contact.email}`} onClick={() => setOpen(false)}>
          <MailIcon width={24} height={24} aria-hidden="true" />
          <span><strong>{t.email}</strong><span className={styles.detail}>{contact.email}</span></span>
        </a>
        <Link className={styles.option} href="/contact" onClick={() => setOpen(false)}>
          <ArrowUpRight width={20} height={20} aria-hidden="true" />
          <strong>{t.consultation}</strong>
        </Link>
      </nav>
    </div>
  );
}
