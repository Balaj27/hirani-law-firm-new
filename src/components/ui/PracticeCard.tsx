import Image from "next/image";
import { getContent } from "@/content";
import type { PracticeArea } from "@/data/practiceAreas";
import Button from "./Button";
import MaskIcon from "./MaskIcon";
import styles from "./PracticeCard.module.css";

export default function PracticeCard({ area }: { area: PracticeArea }) {
  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <Image src={area.detail.overviewImage} alt="" fill sizes="(max-width: 809px) 100vw, (max-width: 1279px) 50vw, 33vw" className={styles.image} />
        <span className={styles.icon}>
          <MaskIcon src={area.icon} size={24} />
        </span>
      </div>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h6 className={`h6 ${styles.title}`}>{area.title}</h6>
          <div className={styles.divider} />
          <div className={styles.description}>
            <p className={`p18 ${styles.excerpt}`}>{area.excerpt}</p>
            <Button href={area.href} variant="fillDark" arrow compactFrom="tablet">
              {getContent().common.readMore}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
