import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/types";
import { cn } from "@/lib/utils";
import SafeImage from "@/components/ui/SafeImage";

export default function DestinationCard({
  destination: d,
  large = false,
  sizes = "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw",
}: {
  destination: Destination;
  large?: boolean;
  sizes?: string;
}) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] bg-charcoal">
      <SafeImage
        src={d.image.src}
        alt={d.image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/65 via-45% to-charcoal/5" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="eyebrow text-orange">{d.region}</p>
        <h3 className={cn("mt-1.5 text-white", large ? "text-3xl sm:text-4xl" : "text-2xl")}>
          <Link
            href={`/destinations#${d.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {d.name}
          </Link>
        </h3>
        <p className={cn("mt-2 text-sm text-white/80", large ? "max-w-md" : "line-clamp-2")}>{d.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white transition-colors group-hover:text-orange">
          Explore destination
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
