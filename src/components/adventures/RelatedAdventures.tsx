import { adventures } from "@/data/adventures";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AdventureCard from "./AdventureCard";

export default function RelatedAdventures({
  currentSlug,
  destinationSlug,
  title = "You Might Also Like",
}: {
  currentSlug?: string;
  destinationSlug?: string;
  title?: string;
}) {
  const pool = adventures.filter((a) => a.slug !== currentSlug);
  const sameDestination = destinationSlug ? pool.filter((a) => a.destinationSlug === destinationSlug) : [];
  const rest = pool.filter((a) => !sameDestination.includes(a));
  const items = [...sameDestination, ...rest].slice(0, 3);

  return (
    <section className="bg-sage py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="KEEP EXPLORING" title={title} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08} className="h-full">
              <AdventureCard adventure={a} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
