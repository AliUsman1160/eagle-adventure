import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";

export default function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="TRAVELER VOICES"
          title="Stories from Fellow Explorers"
          text="Demo preview — the testimonials below are placeholders, not real reviews. Replace them with genuine traveler feedback."
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-forest/10 bg-cream p-7">
                  <Quote aria-hidden className="h-7 w-7 text-orange" />
                  <blockquote className="mt-4 flex-1 text-charcoal">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-forest/10 pt-5">
                    {t.avatar ? (
                      <span className="relative h-11 w-11 overflow-hidden rounded-full">
                        <SafeImage src={t.avatar} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                    ) : (
                      <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-forest font-heading font-bold text-white">
                        {t.name.charAt(0)}
                      </span>
                    )}
                    <span>
                      <span className="block text-sm font-bold text-forest">{t.name}</span>
                      <span className="block text-xs text-muted">{t.trip}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
