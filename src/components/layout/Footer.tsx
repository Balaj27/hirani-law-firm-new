import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import LineDraw from "@/components/ui/LineDraw";
import NavLink from "@/components/ui/NavLink";
import CookieSettingsButton from "@/components/layout/CookieSettingsButton";
import ContactChip from "@/components/ui/ContactChip";
import { SOCIAL_ICONS } from "@/components/ui/Icons";
import { getContent } from "@/content";
import { getSocialLinks } from "@/data/site";
import styles from "./Footer.module.css";


export default function Footer() {
  const { footer, contact, logo } = getContent().site;
  const FOOTER_COLUMNS = footer.columns;
  const SOCIAL_LINKS = getSocialLinks();
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Reveal once={false} className={styles.contactCol}>
            <Link href="/" className={styles.logoLink} aria-label={logo.homeLabel}>
              <Image
                src={logo.light}
                alt={logo.alt}
                width={500}
                height={139}
                sizes="210px"
                className={styles.logoImage}
              />
            </Link>
            <div className={styles.contacts}>
              <ContactChip type="mail" variant="plain" value={contact.email} href={`mailto:${contact.email}`} />
              <ContactChip type="phone" variant="plain" value={contact.phone} href={`tel:${contact.phone}`} />
            </div>
            <div className={styles.social} aria-label={footer.socialLabel}>
              {SOCIAL_LINKS.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a key={icon} href={href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label={label}>
                    <Icon width={24} height={24} />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <div className={styles.links}>
            {FOOTER_COLUMNS.map((col) => (
              <Reveal key={col.title} once={false} className={styles.column}>
                <p className={`serif ${styles.title}`}>{col.title}</p>
                <ul className={styles.list}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <NavLink href={l.href}>{l.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.copy}>
          <LineDraw tone="light" />
          <Reveal className={styles.copyRow} y={20} once={false}>
            <p className={styles.copyLeft}>{footer.copyright}</p>
            <p className={styles.copyRight}>
              <CookieSettingsButton className={styles.byLink} />
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
