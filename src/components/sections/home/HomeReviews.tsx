import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent } from "@/content";
import GoogleReviewsSlider from "./GoogleReviewsSlider";
import styles from "./HomeBlog.module.css";

export default function HomeReviews() {
  const t = getContent().sections.homeReviews;
  return (
    <section className={styles.section} aria-labelledby="home-reviews-title">
      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <Reveal once={false} className={styles.title}>
            <SectionLabel>{t.label}</SectionLabel>
            <h2 id="home-reviews-title" className={`h2 ${styles.heading}`}>{t.heading}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.3} once={false} className={styles.reviews}>
          <GoogleReviewsSlider />
        </Reveal>
        <Button href="/reviews" variant="outlineDark" arrow>{t.cta}</Button>
      </div>
    </section>
  );
}
