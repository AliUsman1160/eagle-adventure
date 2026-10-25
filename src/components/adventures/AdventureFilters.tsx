"use client";

import { useMemo, useState } from "react";
import { SearchX, Search, SlidersHorizontal, X } from "lucide-react";
import { adventures, categories, difficulties, durationBuckets } from "@/data/adventures";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import AdventureCard from "./AdventureCard";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
        active ? "border-forest bg-forest text-white" : "border-forest/20 bg-white text-forest hover:border-forest",
      )}
    >
      {children}
    </button>
  );
}

function FilterGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-2.5 text-grey">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        <Chip active={value === ""} onClick={() => onChange("")}>All</Chip>
        {options.map((o) => (
          <Chip key={o} active={value === o} onClick={() => onChange(value === o ? "" : o)}>
            {o}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}

export default function AdventureFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adventures.filter(
      (a) =>
        (!category || a.category === category) &&
        (!difficulty || a.difficulty === difficulty) &&
        (!duration || a.durationBucket === duration) &&
        (!q || [a.title, a.location, a.category, a.tagline].join(" ").toLowerCase().includes(q)),
    );
  }, [query, category, difficulty, duration]);

  const activeCount = [category, difficulty, duration].filter(Boolean).length + (query.trim() ? 1 : 0);
  const clear = () => {
    setQuery("");
    setCategory("");
    setDifficulty("");
    setDuration("");
  };

  return (
    <section className="py-12 sm:py-16" aria-label="Browse adventures">
      <h2 className="sr-only">Adventure results</h2>
      <Container>
        <div className="rounded-[var(--radius-card)] border border-forest/10 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor="adventure-search" className="sr-only">Search adventures</label>
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
              <input
                id="adventure-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, location or category"
                className="min-h-12 w-full rounded-lg border border-forest/20 bg-cream pl-10 pr-3 text-base placeholder:text-grey focus:border-forest"
              />
            </div>
            <button
              type="button"
              aria-expanded={showFilters}
              aria-controls="filter-panel"
              onClick={() => setShowFilters((s) => !s)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-forest/20 px-4 text-sm font-bold text-forest lg:hidden"
            >
              <SlidersHorizontal aria-hidden className="h-4 w-4" />
              Filters{activeCount ? ` (${activeCount})` : ""}
            </button>
          </div>

          <div id="filter-panel" className={cn("mt-5 space-y-5", showFilters ? "block" : "hidden lg:block")}>
            <div className="grid gap-5 lg:grid-cols-[2fr_1fr_1fr]">
              <FilterGroup legend="Category" options={categories} value={category} onChange={setCategory} />
              <FilterGroup legend="Difficulty" options={difficulties} value={difficulty} onChange={setDifficulty} />
              <FilterGroup legend="Duration" options={durationBuckets} value={duration} onChange={setDuration} />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-forest/10 pt-4">
            <p role="status" aria-live="polite" className="text-sm font-semibold text-forest">
              {results.length} {results.length === 1 ? "adventure" : "adventures"} found
            </p>
            {activeCount > 0 && (
              <button type="button" onClick={clear} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-bold text-orange-600 hover:underline">
                <X aria-hidden className="h-4 w-4" /> Clear filters
              </button>
            )}
          </div>
        </div>

        {results.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((a, i) => (
              <li key={a.slug} className="h-full">
                <Reveal delay={Math.min(i, 5) * 0.05} className="h-full">
                  <AdventureCard adventure={a} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-forest/25 bg-white px-6 py-16 text-center">
            <SearchX aria-hidden className="mx-auto h-10 w-10 text-grey" />
            <h2 className="mt-4 text-2xl text-forest">No adventures match your search</h2>
            <p className="mx-auto mt-2 max-w-md text-muted">Try a different keyword or remove a filter to see more trips.</p>
            <Button variant="secondary" className="mt-6" onClick={clear}>Clear filters</Button>
          </div>
        )}
      </Container>
    </section>
  );
}
