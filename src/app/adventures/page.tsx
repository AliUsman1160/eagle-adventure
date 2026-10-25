import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/config";
import { IMG } from "@/data/images";
import PageHero from "@/components/ui/PageHero";
import AdventureFilters from "@/components/adventures/AdventureFilters";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Adventures & Trips",
  description: "Browse sample trekking, camping, hiking, waterfall and road-trip adventures. Search and filter by category, difficulty and duration.",
  alternates: { canonical: absoluteUrl("/adventures") },
  openGraph: { title: "Adventures & Trips", description: "Browse sample outdoor adventures and find your next escape." },
};

export default function AdventuresPage() {
  return (
    <>
      <PageHero
        eyebrow="FIND YOUR NEXT ESCAPE"
        title="Adventures & Trips"
        text="From easy day hikes to multi-day treks, browse our sample experiences. Search, filter and find the journey that suits you."
        image={IMG.heroAdventures}
        imageAlt="Mountain landscape at golden hour"
        crumbs={[{ label: "Home", href: "/" }, { label: "Adventures" }]}
      />
      <AdventureFilters />
      <FinalCTA title="Not Sure Where to Start?" text="Tell us what you're looking for and we'll help you find the right adventure." />
    </>
  );
}
