import { siteConfig } from "@/lib/config";
import Container from "@/components/ui/Container";

export default function StatsStrip() {
  return (
    <section id="stats" aria-label="Club at a glance" className="border-b border-forest/10 bg-white">
      <Container>
        <dl className="grid grid-cols-2 divide-forest/10 py-2 lg:grid-cols-4 lg:divide-x">
          {siteConfig.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-4 py-7 text-center sm:py-9">
              <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted sm:text-sm">{s.label}</dt>
              <dd className="font-heading text-4xl font-extrabold text-forest sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="pb-4 text-center text-xs text-grey">Sample figures for preview only — to be replaced with real company numbers.</p>
      </Container>
    </section>
  );
}
