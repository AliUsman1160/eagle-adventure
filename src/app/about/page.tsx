import type { Metadata } from "next";
import { Compass, Eye, HeartHandshake, Leaf, Target, Users } from "lucide-react";
import { absoluteUrl } from "@/lib/config";
import { IMG } from "@/data/images";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SafeImage from "@/components/ui/SafeImage";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Eagle Eye Adventure Club: our mission, values and approach to outdoor adventure.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: { title: "About Eagle Eye Adventure Club", description: "Built for the curious. Made for the adventurous." },
};

const values = [
  { icon: Compass, title: "Curiosity", text: "We love finding out what's around the next bend." },
  { icon: Leaf, title: "Respect for Nature", text: "Wild places deserve care. We aim to leave them as we found them." },
  { icon: Users, title: "Community", text: "Adventure is better shared. We value the people we explore with." },
  { icon: HeartHandshake, title: "Honesty", text: "Clear information about what a trip involves and what it does not." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="MORE THAN JUST A JOURNEY"
        title="Built for the Curious. Made for the Adventurous."
        text="Eagle Eye Adventure Club is about discovering new places, embracing the outdoors and sharing the experience with people who love it too."
        image={IMG.heroAbout}
        imageAlt="Layered mountain ridges in soft morning light"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="WHO WE ARE" title="A club for people who'd rather be outside" />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Eagle Eye Adventure Club brings together trekking, camping, hiking and scenic travel for anyone who wants more from a weekend, or a whole week.
              </p>
              <p>
                {/* EDITABLE: replace with the company's real story, founders and history. */}
                Our full story, team and history will be shared here. This preview intentionally uses general wording until the club&rsquo;s real details are added.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <SafeImage src={IMG.aboutStory} alt="Hiker on a trail through green hills" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest py-16 text-white sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, label: "OUR MISSION", text: "To help people discover the outdoors through well-planned, memorable and welcoming adventures." },
            { icon: Eye, label: "OUR VISION", text: "A community of explorers who travel thoughtfully, connect with nature and with each other." },
          ].map(({ icon: Icon, label, text }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="h-full rounded-[var(--radius-card)] border border-white/15 p-8 sm:p-10">
                <Icon aria-hidden className="h-8 w-8 text-orange" strokeWidth={1.5} />
                <h2 className="eyebrow mt-6 text-orange">{label}</h2>
                <p className="mt-3 font-heading text-2xl font-bold leading-snug sm:text-3xl">{text}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="WHAT WE VALUE" title="Core Values" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="h-full rounded-[var(--radius-card)] border border-forest/10 bg-white p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sage text-forest">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-xl text-forest">{title}</h3>
                    <p className="mt-2 text-sm text-muted">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sage py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <SectionHeading eyebrow="OUR PHILOSOPHY" title="Go slowly. Look closely. Take only memories." />
            <ul className="mt-7 space-y-4 text-muted">
              <li><strong className="text-forest">Plan well, then be present.</strong> Good preparation frees you to enjoy the moment.</li>
              <li><strong className="text-forest">Every pace is welcome.</strong> From easy walks to demanding treks, there is room for everyone.</li>
              <li><strong className="text-forest">Leave it better.</strong> Respect the landscapes and the communities who live there.</li>
            </ul>
          </Reveal>
          <Reveal className="lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <SafeImage src={IMG.community} alt="Explorer in a red jacket on a snowy summit" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 text-center sm:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="A COMMUNITY OF EXPLORERS" title="Adventure is better together" text="Friends, families and teams — the best trips are the ones we share. Come as you are and meet people who love the outdoors as much as you do." />
          <ButtonLink href="/adventures" size="lg" className="mt-9">Explore Adventures</ButtonLink>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
