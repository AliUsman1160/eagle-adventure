import { galleryImages } from "@/data/gallery";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SafeImage from "@/components/ui/SafeImage";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

// Hand-picked layout (ids from gallery data) with varied ratios on a 4-col grid.
const picks: { id: string; cls: string }[] = [
  { id: "g1", cls: "col-span-2 row-span-2" },
  { id: "g2", cls: "row-span-2" },
  { id: "g4", cls: "" },
  { id: "g6", cls: "row-span-2" },
  { id: "g9", cls: "" },
  { id: "g11", cls: "col-span-2" },
];

export default function GalleryPreview() {
  const items = picks
    .map((p) => ({ ...p, img: galleryImages.find((g) => g.id === p.id) }))
    .filter((p): p is typeof p & { img: NonNullable<typeof p.img> } => Boolean(p.img));

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="CAPTURED ALONG THE WAY" title="Moments from the Wild" />
          <ButtonLink href="/gallery" variant="outline" className="self-start sm:self-auto">View Full Gallery</ButtonLink>
        </div>
        <div className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[13rem]">
          {items.map(({ id, cls, img }, i) => (
            <Reveal key={id} delay={(i % 3) * 0.06} className={`h-full ${cls}`}>
              <figure className="group relative h-full overflow-hidden rounded-[var(--radius-card)]">
                <SafeImage src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                  {img.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
