import Button from "@/components/ui/Button";
import StackedBlogCard from "@/components/ui/StackedBlogCard";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TrustAvatars from "@/components/ui/TrustAvatars";
import { HIDDEN } from "@/lib/hidden";
import { getContent } from "@/content";
import { getPosts } from "@/data/blog";
import styles from "./HomeCaseStudies.module.css";

/** Blog posts in the original dark section with sticky, stacking cards. */
export default function HomeBlogStack() {
  const t = getContent().sections.homeBlogStack;
  const posts = getPosts().slice(0, 3);
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <Reveal className={styles.title}>
            <SectionLabel tone="light">{t.label}</SectionLabel>
            <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
          </Reveal>
          <Reveal className={styles.trust}>
            {!HIDDEN.trustAvatars && <TrustAvatars />}
          </Reveal>
        </div>

        <div className={styles.casesCta}>
          <div className={styles.cases}>
            {posts.map((post, i) => (
              <div
                key={post.slug}
                className={`${styles.cardWrap} ${i < posts.length - 1 ? styles.sticky : ""}`}
                style={{ zIndex: i + 1 }}
              >
                <StackedBlogCard post={post} />
              </div>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <div className={styles.ctaSpacer} />
            <Reveal className={styles.cta}>
              <p className={`p18 balance ${styles.ctaText}`}>{t.ctaText}</p>
              <Reveal y={20} amount={0.5} className={styles.ctaButtons}>
                <Button href={t.primaryCta.href} variant="fillLight" arrow>
                  {t.primaryCta.label}
                </Button>
                <Button href={t.secondaryCta.href} variant="outlineLight">
                  {t.secondaryCta.label}
                </Button>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
