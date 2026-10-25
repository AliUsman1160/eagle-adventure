import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/lib/config";
import { IMG } from "@/data/images";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Ask about a trip or send an inquiry to Eagle Eye Adventure Club.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: { title: "Contact Eagle Eye Adventure Club", description: "Ask about a trip or plan your next adventure." },
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const cards = [
    { icon: Mail, label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : "", fallback: "To be added" },
    { icon: Phone, label: "Phone", value: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : "", fallback: "To be added" },
    { icon: MapPin, label: "Location", value: contact.location, href: "", fallback: "To be added" },
    { icon: Clock, label: "Hours", value: contact.hours, href: "", fallback: "To be added" },
  ];

  return (
    <>
      <PageHero
        eyebrow="LET'S TALK ADVENTURE"
        title="Contact Us"
        text="Have a question about a trip or an idea for your group? Send an inquiry and tell us what you're looking for."
        image={IMG.heroContact}
        imageAlt="Green mountain valley under a cloudy sky"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="rounded-[var(--radius-card)] border border-forest/10 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="mb-6 text-2xl text-forest sm:text-3xl">Send an inquiry</h2>
            <Suspense fallback={<p className="text-muted">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside aria-label="Contact information" className="space-y-4">
            <h2 className="text-2xl text-forest">Contact details</h2>
            <ul className="space-y-4">
              {cards.map(({ icon: Icon, label, value, href, fallback }) => (
                <li key={label} className="flex items-start gap-4 rounded-[var(--radius-card)] border border-forest/10 bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sage text-forest">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow text-grey">{label}</p>
                    {value ? (
                      href ? <a href={href} className="mt-1 block break-words font-semibold text-forest hover:text-orange-600">{value}</a>
                           : <p className="mt-1 font-semibold text-forest">{value}</p>
                    ) : (
                      <p className="mt-1 text-muted">{fallback}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-grey">Company contact details haven&rsquo;t been supplied yet. Edit them in <code>src/lib/config.ts</code>.</p>
          </aside>
        </Container>
      </section>
    </>
  );
}
