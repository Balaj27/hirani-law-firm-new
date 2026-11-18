import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import styles from "./CaseCard.module.css";

/** Blog content in the original case study card design, including its image hover. */
export default function StackedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.bg}>
        <Image src={post.image} alt={post.imageAlt} fill sizes="100vw" className={styles.img} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.tags}>
            <span className={`p12 ${styles.tag}`}>{post.category}</span>
            <span className={`p12 ${styles.tag} ${styles.verdict}`}>{post.date}</span>
          </div>
          <h3 className={`h6 ${styles.heading}`}>{post.title}</h3>
        </div>
        <div className={styles.description}>
          <div className={styles.divider} />
          <p className={`p16 ${styles.excerpt}`}>{post.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
