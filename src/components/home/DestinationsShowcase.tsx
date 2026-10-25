import { destinations } from "@/data/destinations";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import DestinationCard from "@/components/destinations/DestinationCard";

// Bento-style layout: one large landscape card beside smaller ones.
const layout = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
];

export default function DestinationsShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="WHERE WILL YOU GO?"
            title="Places That Take Your Breath Away"
            text="A sample selection of landscapes to inspire your next journey. Destinations are placeholders and can be replaced."
          />
          <ButtonLink href="/destinations" variant="outline" className="self-start lg:self-auto">All Destinations</ButtonLink>
        </div>
        <div className="mt-12 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 6).map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 0.07} className={`h-full ${layout[i]}`}>
              <DestinationCard destination={d} large={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
