import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import Container from "@/components/ui/Container";
import Logo from "./Logo";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/adventures", label: "Adventures" },
  { href: "/destinations", label: "Destinations" },
  { href: "/gallery", label: "Gallery" },
];

const exploreLinks = [
  { href: "/adventures", label: "Featured Trips" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, className: "h-[18px] w-[18px]" } as const;

const socials = [
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: <svg {...iconProps}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: <svg {...iconProps}><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>,
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    icon: <svg {...iconProps}><path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>,
  },
];

const linkCls = "text-white/70 transition-colors hover:text-orange";
const placeholder = (v: string, fallback: string) => v || fallback;

export default function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-charcoal text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Eagle Eye Adventure Club is about discovering new places, embracing the outdoors and sharing experiences
            with people who love adventure.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {socials.map((s) => {
              const url = siteConfig.socials[s.key];
              const cls = "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20";
              return (
                <li key={s.key}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`${cls} hover:border-orange hover:text-orange`}>
                      {s.icon}
                    </a>
                  ) : (
                    <span role="img" aria-label={`${s.label} (link not set yet)`} title="Link not set yet" className={`${cls} cursor-not-allowed text-white/40`}>
                      {s.icon}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <h2 className="eyebrow text-orange">Quick Links</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explore">
          <h2 className="eyebrow text-orange">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.label}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-orange">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              {contact.email ? <a href={`mailto:${contact.email}`} className={linkCls}>{contact.email}</a> : <span>Email: to be added</span>}
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              {contact.phone ? <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkCls}>{contact.phone}</a> : <span>Phone: to be added</span>}
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              <span>{placeholder(contact.location, "Location: to be added")}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="/faq" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/faq" className="hover:text-white">Terms &amp; Conditions</Link></li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
