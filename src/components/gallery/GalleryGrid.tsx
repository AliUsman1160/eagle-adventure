"use client";

import { useCallback, useMemo, useState } from "react";
import { galleryImages } from "@/data/gallery";
import type { GalleryCategory } from "@/types";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import Lightbox from "./Lightbox";

const filters: ("All" | GalleryCategory)[] = ["All", "Mountains", "Camping", "Trekking", "Nature"];
const ratio = { landscape: "aspect-[4/3]", portrait: "aspect-[3/4]", square: "aspect-square" } as const;

export default function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = useMemo(
    () => (filter === "All" ? galleryImages : galleryImages.filter((g) => g.category === filter)),
    [filter],
  );
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section className="py-12 sm:py-16" aria-label="Photo gallery">
      <Container>
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors",
                filter === f ? "border-forest bg-forest text-white" : "border-forest/20 bg-white text-forest hover:border-forest",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="mt-4 text-sm text-muted">
          Showing {images.length} {images.length === 1 ? "photo" : "photos"}
        </p>

        <ul className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {images.map((img, i) => (
            <li key={img.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open image: ${img.caption}`}
                className="group relative block w-full overflow-hidden rounded-[var(--radius-card)] bg-sage"
              >
                <span className={cn("relative block", ratio[img.orientation])}>
                  <SafeImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-3 text-left text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-sm">
                  {img.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
      <Lightbox images={images} index={openIndex} onClose={close} onChange={setOpenIndex} />
    </section>
  );
}
