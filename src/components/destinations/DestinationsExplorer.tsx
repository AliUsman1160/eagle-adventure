"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, SearchX } from "lucide-react";
import { destinations } from "@/data/destinations";
import { adventures } from "@/data/adventures";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import Reveal from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function DestinationsExplorer() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter((d) => [d.name, d.region, d.tagline, d.description, ...d.bestFor].join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="py-12 sm:py-16" aria-label="Browse destinations">
      <Container>
        <div className="relative mx-auto max-w-xl">
          <label htmlFor="destination-search" className="sr-only">Search destinations</label>
          <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
          <input
            id="destination-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, region or activity"
            className="min-h-12 w-full rounded-lg border border-forest/20 bg-white pl-11 pr-3 text-base placeholder:text-grey focus:border-forest"
          />
          </div>
          <p role="status" aria-live="polite" className="mt-3 text-center text-sm text-muted">
            {results.length} {results.length === 1 ? "destination" : "destinations"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-forest/25 bg-white px-6 py-16 text-center">
            <SearchX aria-hidden className="mx-auto h-10 w-10 text-grey" />
            <h2 className="mt-4 text-2xl text-forest">No destinations found</h2>
            <p className="mt-2 text-muted">Try another search term.</p>
            <Button variant="secondary" className="mt-6" onClick={() => setQuery("")}>Clear search</Button>
          </div>
        ) : (
          <ul className="mt-12 space-y-16 sm:space-y-20">
            {results.map((d, i) => {
              const related = adventures.filter((a) => a.destinationSlug === d.slug);
              return (
                <li key={d.slug} id={d.slug} className="scroll-mt-28">
                  <Reveal>
                    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                      <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]", i % 2 === 1 && "lg:order-2")}>
                        <SafeImage src={d.image.src} alt={d.image.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
                      </div>
                      <div>
                        <p className="eyebrow text-orange-600">{d.region}</p>
                        <h2 className="mt-2 text-3xl text-forest sm:text-4xl">{d.name}</h2>
                        <p className="mt-3 text-lg font-medium text-charcoal">{d.tagline}</p>
                        <p className="mt-3 text-muted">{d.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Best for">
                          {d.bestFor.map((b) => (
                            <li key={b} className="rounded bg-sage px-2.5 py-1 text-xs font-bold text-forest">{b}</li>
                          ))}
                        </ul>
                        {related.length > 0 && (
                          <div className="mt-6 border-t border-forest/10 pt-5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-grey">Related sample adventures</h3>
                            <ul className="mt-3 space-y-2">
                              {related.map((a) => (
                                <li key={a.slug}>
                                  <Link href={`/adventures/${a.slug}`} className="group inline-flex items-center gap-2 font-semibold text-forest hover:text-orange-600">
                                    {a.title}
                                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <ButtonLink href="/contact" variant="secondary" className="mt-7">
                          Inquire About {d.name}
                        </ButtonLink>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </section>
  );
}
