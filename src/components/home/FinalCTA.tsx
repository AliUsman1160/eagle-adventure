import { IMG } from "@/data/images";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import { ButtonLink } from "@/components/ui/Button";

export default function FinalCTA({
  title = "Your Next Story Starts Outside.",
  text = "Find your next adventure and make room for experiences that stay with you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-24 text-center sm:py-32">
      <SafeImage src={IMG.cta} alt="Tents glowing under a night sky at a mountain campsite" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal/70" />
      <Container>
        <p className="eyebrow text-orange">READY WHEN YOU ARE</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{text}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/adventures" size="lg">Explore Adventures</ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outline-light">Contact Us</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
