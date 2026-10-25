import { Compass, Sparkles, Users } from "lucide-react";
import { IMG } from "@/data/images";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SafeImage from "@/components/ui/SafeImage";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const points = [
  { icon: Compass, title: "Thoughtfully Planned Experiences", text: "Trips shaped around the places and the people." },
  { icon: Users, title: "A Community of Explorers", text: "Meet others who share your sense of adventure." },
  { icon: Sparkles, title: "Memories Beyond the Ordinary", text: "Moments that stay with you long after the trip." },
];

export default function AboutPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative pb-10 pr-8 sm:pr-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[5/6]">
              <SafeImage src={IMG.aboutMain} alt="Hiker standing on a rocky ledge above the clouds" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 overflow-hidden rounded-[var(--radius-card)] border-[6px] border-white shadow-xl">
              <div className="relative aspect-square">
                <SafeImage src={IMG.aboutSecondary} alt="Tent glowing at a mountain campsite" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
              </div>
            </div>
            <p className="eyebrow absolute left-4 top-4 rounded bg-orange px-3 py-1.5 text-charcoal sm:left-5 sm:top-5">Built for Adventure</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <SectionHeading
              eyebrow="MORE THAN JUST A JOURNEY"
              title="Built for the Curious. Made for the Adventurous."
              text="Eagle Eye Adventure Club is about discovering new places, embracing the outdoors, and creating memorable experiences with people who share your sense of adventure."
            />
            <ul className="mt-9 space-y-6">
              {points.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sage text-forest">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg text-forest">{title}</h3>
                    <p className="text-sm text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink href="/about" variant="secondary" size="lg" className="mt-10">Get to Know Us</ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
