import type { Metadata } from "next";
import BlogCard from "@/components/ui/BlogCard";
import { DownloadIcon } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import { getPosts } from "@/data/blog";
import styles from "./blog.module.css";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  return routeMetadata(params, "/blog");
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  setRequestLocale((await params).lang);
  const t = getContent().pages.blog;
  return (
    <main className="page">
      <RouteSeo route={"/blog"} />
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <h1 className={`h1 ${styles.title}`}>{t.title}</h1>
        </div>
      </section>

      <section className={styles.posts}>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            {getPosts().map((post) => (
              <Reveal key={post.slug} y={20} delay={0.5} once={false}>
                <BlogCard post={post} narrowText />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.resources} aria-labelledby="blog-resources-title">
        <div className={styles.wrapper}>
          <div className={styles.resourcesHeading}>
            <p className={`p12 ${styles.resourceLabel}`}>{t.resources.label}</p>
            <h2 className={`h2 balance ${styles.resourcesTitle}`} id="blog-resources-title">{t.resources.title}</h2>
          </div>
          <div className={styles.resourcesGrid}>
            {t.resources.items.map((resource) => (
              <a key={resource.href} className={styles.resourceCard} href={resource.href} download>
                <span className={styles.resourceIcon}>
                  <DownloadIcon width={24} height={24} aria-hidden="true" />
                </span>
                <h3 className={`h6 balance ${styles.resourceTitle}`}>{resource.title}</h3>
                <p className={`p18 ${styles.resourceDescription}`}>{resource.description}</p>
                <span className={`p12 ${styles.resourceDownload}`}>{t.resources.downloadLabel}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
