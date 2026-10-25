import { adventures } from "@/data/adventures";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import AdventureCard from "@/components/adventures/AdventureCard";

// Varied column spans on a 12-col grid so the six cards don't read as identical boxes.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"];
const sizes = [
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw",
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 50vw, 100vw",
  "(min-width: 1024px) 50vw, 100vw",
];

export default function FeaturedAdventures() {
  const items = adventures.filter((a) => a.featured).slice(0, 6);
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="FIND YOUR NEXT ESCAPE"
            title="Experiences Worth Waking Up For"
            text="From peaceful mountain trails to unforgettable nights beneath the stars, find an adventure that speaks to you."
          />
          <ButtonLink href="/adventures" variant="outline" className="self-start lg:self-auto">View All Adventures</ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 2) * 0.08} className={`h-full ${spans[i]}`}>
              <AdventureCard adventure={a} layout="fill" sizes={sizes[i]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
