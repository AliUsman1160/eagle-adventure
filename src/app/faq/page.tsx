import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/config";
import { faqGroups } from "@/data/faqs";
import { IMG } from "@/data/images";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about trips, preparation, groups and families, and how to inquire.",
  alternates: { canonical: absoluteUrl("/faq") },
  openGraph: { title: "Frequently Asked Questions", description: "General answers about adventure trips and inquiries." },
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="GOOD TO KNOW"
        title="Frequently Asked Questions"
        text="General answers to common questions. Specific requirements always depend on the trip, so check details when you inquire."
        image={IMG.heroFaq}
        imageAlt="Misty mountain ridges at dawn"
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="FAQ sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-2 border-l border-forest/15">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm font-semibold text-muted hover:border-orange hover:text-forest">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14">
            {faqGroups.map((g) => (
              <Reveal key={g.title}>
                <section id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")} aria-labelledby={`h-${g.title.replace(/\W+/g, "")}`} className="scroll-mt-28">
                  <h2 id={`h-${g.title.replace(/\W+/g, "")}`} className="mb-4 text-2xl text-forest sm:text-3xl">{g.title}</h2>
                  <Accordion items={g.items} />
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <FinalCTA title="Still Have Questions?" text="Send us a message and we'll get back to you with the details for your trip." />
    </>
  );
}
