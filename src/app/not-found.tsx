import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-forest pb-24 pt-44 text-center text-white">
      <Container>
        <p className="eyebrow text-orange">404 — OFF THE TRAIL</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">We couldn&rsquo;t find that page.</h1>
        <p className="mx-auto mt-4 max-w-lg text-white/75">The adventure or page you&rsquo;re looking for may have moved or doesn&rsquo;t exist.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/adventures" size="lg">Browse Adventures</ButtonLink>
          <ButtonLink href="/" size="lg" variant="outline-light">Back Home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
