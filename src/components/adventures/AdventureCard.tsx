import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Mountain } from "lucide-react";
import type { Adventure, Difficulty } from "@/types";
import { cn } from "@/lib/utils";
import SafeImage from "@/components/ui/SafeImage";

const difficultyStyle: Record<Difficulty, string> = {
  Easy: "bg-sage text-forest",
  Moderate: "bg-orange/15 text-[#8a4a05]",
  Challenging: "bg-forest text-white",
};

export function DifficultyBadge({ level, className }: { level: Difficulty; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold", difficultyStyle[level], className)}>
      <Mountain aria-hidden className="h-3 w-3" />
      {level}
    </span>
  );
}

export default function AdventureCard({
  adventure,
  layout = "grid",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  adventure: Adventure;
  /** "grid" uses a fixed image ratio; "fill" lets the image stretch to equalise row heights. */
  layout?: "grid" | "fill";
  priority?: boolean;
  sizes?: string;
}) {
  const { slug, title, category, tagline, location, duration, difficulty, price, image } = adventure;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-forest/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-forest/10">
      <div className={cn("relative overflow-hidden", layout === "grid" ? "aspect-[4/3]" : "min-h-60 flex-1")}>
        <SafeImage
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-charcoal/80 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-white">
          {category}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-xl text-forest">
          <Link href={`/adventures/${slug}`} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{tagline}</p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          <li className="flex items-center gap-1.5">
            <MapPin aria-hidden className="h-3.5 w-3.5 text-orange-600" />
            <span className="sr-only">Location: </span>
            {location}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock aria-hidden className="h-3.5 w-3.5 text-orange-600" />
            <span className="sr-only">Duration: </span>
            {duration}
          </li>
          <li>
            <span className="sr-only">Difficulty: </span>
            <DifficultyBadge level={difficulty} />
          </li>
        </ul>
        <div className="mt-1 flex items-center justify-between border-t border-forest/10 pt-4">
          <p className="text-xs font-semibold text-forest">{price ?? "Contact for pricing"}</p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-forest transition-colors group-hover:text-orange-600">
            Explore Trip
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
