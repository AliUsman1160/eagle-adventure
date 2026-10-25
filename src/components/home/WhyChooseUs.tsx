import { Compass, Map, Tent, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const benefits = [
  { icon: Compass, title: "Thoughtful Planning", text: "Experiences designed to make every journey more memorable." },
  { icon: Map, title: "Local Discovery", text: "Discover landscapes, cultures, and places worth exploring." },
  { icon: Users, title: "Community & Connection", text: "Share the journey with fellow adventure enthusiasts." },
  { icon: Tent, title: "Memorable Experiences", text: "Turn ordinary weekends into stories worth telling." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-forest py-20 text-white sm:py-28">
      <svg aria-hidden viewBox="0 0 600 200" className="pointer-events-none absolute -bottom-2 left-0 w-full text-white/[0.04]" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 200V120l80-70 70 60 90-90 100 110 70-50 90 80 100-70v110z" />
      </svg>
      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="WHY EAGLE EYE?"
          title="Your Adventure. Our Commitment."
          text="What we aim for with every journey we plan."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="bg-forest">
              <Reveal delay={i * 0.07} className="h-full p-7 transition-colors hover:bg-forest-700 sm:p-8">
                <Icon aria-hidden className="h-8 w-8 text-orange" strokeWidth={1.5} />
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
