"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import GoogleMark from "@/components/ui/GoogleMark";
import { Star } from "@/components/ui/Icons";
import { useContent } from "@/content/client";
import styles from "./GoogleReviewsSlider.module.css";

export default function GoogleReviewsSlider() {
  const { pages, sections, common } = useContent();
  const t = sections.homeReviews;
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function slide(direction: number) {
    const element = track.current;
    if (!element) return;
    const cards = element.children;
    const step = cards.length > 1
      ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
      : element.clientWidth;
    const end = element.scrollWidth - element.clientWidth;
    const next = direction > 0 && element.scrollLeft >= end - 2
      ? 0
      : direction < 0 && element.scrollLeft <= 2
        ? end
        : element.scrollLeft + direction * step;
    element.scrollTo({ left: next, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function toggle(index: number) {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={styles.slider} role="region" aria-label={t.label} aria-roledescription="carousel">
      <div className={styles.controls}>
        <button type="button" className={styles.arrow} aria-label={common.previous} aria-controls="google-reviews-track" onClick={() => slide(-1)}>←</button>
        <button type="button" className={styles.arrow} aria-label={common.next} aria-controls="google-reviews-track" onClick={() => slide(1)}>→</button>
      </div>
      <div id="google-reviews-track" ref={track} className={styles.track} tabIndex={0} aria-label={t.label}>
        {pages.reviews.reviews.map((review, index) => (
          <article key={review.name} className={styles.card}>
            <div className={styles.meta}>
              <span className={styles.stars} aria-label={`${review.rating} / 5`}>
                {Array.from({ length: review.rating }, (_, i) => <Star key={i} width={16} height={15} />)}
              </span>
              <GoogleMark className={styles.google} />
            </div>
            <h3 className={`h6 ${styles.name}`}>{review.name}</h3>
            <p id={`google-review-${index}`} className={`p16 ${styles.text} ${review.text.length > 200 && !expanded.has(index) ? styles.collapsed : ""}`}>{review.text}</p>
            {review.text.length > 200 && (
              <button type="button" className={styles.readMore} aria-expanded={expanded.has(index)} aria-controls={`google-review-${index}`} onClick={() => toggle(index)}>
                {expanded.has(index) ? t.readLess : common.readMore}
              </button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
