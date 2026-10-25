import Container from "./Container";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import SafeImage from "./SafeImage";

/** Shared inner-page hero. Sits under the transparent header (main has a negative top margin). */
export default function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal pb-14 pt-32 sm:pb-20 sm:pt-40">
      <SafeImage src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/50" />
      <Container>
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-6 flex items-center gap-3 text-orange">
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{text}</p>
      </Container>
    </section>
  );
}
