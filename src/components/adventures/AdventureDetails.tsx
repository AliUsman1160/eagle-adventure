import { Check, Clock, MapPin, MessageCircle, Mountain, X, Backpack } from "lucide-react";
import type { Adventure } from "@/types";
import { whatsappLink } from "@/lib/config";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SafeImage from "@/components/ui/SafeImage";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DifficultyBadge } from "./AdventureCard";

function List({ title, items, kind }: { title: string; items: string[]; kind: "yes" | "no" | "bag" }) {
  const Icon = kind === "yes" ? Check : kind === "no" ? X : Backpack;
  const color = kind === "yes" ? "text-forest" : kind === "no" ? "text-grey" : "text-orange-600";
  return (
    <div>
      <h3 className="text-xl text-forest">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted">
            <Icon aria-hidden className={`mt-1 h-4 w-4 shrink-0 ${color}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdventureDetails({ adventure: a }: { adventure: Adventure }) {
  const wa = whatsappLink(`Hi! I'd like to ask about the "${a.title}" trip.`);
  const inquiryHref = `/contact?adventure=${a.slug}`;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-charcoal pb-12 pt-32 sm:pb-16 sm:pt-40">
        <SafeImage src={a.image.src} alt={a.image.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/45" />
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Adventures", href: "/adventures" }, { label: a.title }]} />
          <p className="eyebrow mt-6 text-orange">{a.category}</p>
          <h1 className="mt-3 max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">{a.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{a.tagline}</p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white">
            <li className="flex items-center gap-2"><MapPin aria-hidden className="h-4 w-4 text-orange" />{a.location}</li>
            <li className="flex items-center gap-2"><Clock aria-hidden className="h-4 w-4 text-orange" />{a.duration}</li>
            <li className="flex items-center gap-2"><Mountain aria-hidden className="h-4 w-4 text-orange" />{a.difficulty}</li>
          </ul>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_22rem] lg:gap-14">
        <div className="min-w-0 space-y-14">
          <Reveal>
            <section aria-labelledby="overview">
              <h2 id="overview" className="text-3xl text-forest">Overview</h2>
              <p className="mt-4 text-lg font-medium text-charcoal">{a.overview}</p>
              {a.description.map((p) => (
                <p key={p} className="mt-4 text-muted">{p}</p>
              ))}
            </section>
          </Reveal>

          <section aria-labelledby="highlights">
            <h2 id="highlights" className="text-3xl text-forest">Highlights</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {a.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 rounded-lg border border-forest/10 bg-white p-4 text-sm font-semibold text-forest">
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-orange" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="itinerary">
            <h2 id="itinerary" className="text-3xl text-forest">Sample itinerary</h2>
            <ol className="mt-6 space-y-0">
              {a.itinerary.map((step, i) => (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < a.itinerary.length - 1 && <span aria-hidden className="absolute left-[1.0625rem] top-10 h-[calc(100%-2.5rem)] w-px bg-forest/20" />}
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest font-heading text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg text-forest">{step.title}</h3>
                    <p className="mt-1 text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-grey">This itinerary is a sample. Final plans are confirmed with the company.</p>
          </section>

          <section aria-label="Inclusions and packing" className="grid gap-10 rounded-[var(--radius-card)] bg-white p-6 sm:grid-cols-2 sm:p-8 xl:grid-cols-3">
            <List title="What's included" items={a.included} kind="yes" />
            <List title="Not included" items={a.notIncluded} kind="no" />
            <div className="sm:col-span-2 xl:col-span-1">
              <List title="What to bring" items={a.whatToBring} kind="bag" />
            </div>
          </section>

          <section aria-labelledby="trip-faq">
            <h2 id="trip-faq" className="mb-4 text-3xl text-forest">Trip questions</h2>
            <Accordion items={a.faqs} />
          </section>
        </div>

        <aside aria-label="Inquiry" className="lg:relative">
          <div className="rounded-[var(--radius-card)] border border-forest/15 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="eyebrow text-orange-600">Interested?</p>
            <p className="mt-3 font-heading text-2xl font-extrabold text-forest">{a.price ?? "Contact for pricing"}</p>
            <p className="mt-1 text-xs text-grey">Sample content. Final pricing and availability are confirmed by the company.</p>
            <dl className="mt-5 space-y-3 border-t border-forest/10 pt-5 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-muted">Location</dt><dd className="text-right font-semibold">{a.location}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Duration</dt><dd className="font-semibold">{a.duration}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Difficulty</dt><dd><DifficultyBadge level={a.difficulty} /></dd></div>
            </dl>
            <ButtonLink href={inquiryHref} size="lg" className="mt-6 w-full">Inquire About This Trip</ButtonLink>
            {wa && (
              <ButtonLink href={wa} external variant="outline" className="mt-3 w-full">
                <MessageCircle aria-hidden className="h-4 w-4" /> Ask on WhatsApp
              </ButtonLink>
            )}
            <p className="mt-4 text-xs leading-relaxed text-grey">This is an inquiry only. No booking or payment is made through this website.</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
