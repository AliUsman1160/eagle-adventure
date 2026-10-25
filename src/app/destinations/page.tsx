import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/config";
import { IMG } from "@/data/images";
import PageHero from "@/components/ui/PageHero";
import DestinationsExplorer from "@/components/destinations/DestinationsExplorer";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore sample mountain valleys, alpine lakes, waterfalls and forests that inspire outdoor adventures.",
  alternates: { canonical: absoluteUrl("/destinations") },
  openGraph: { title: "Destinations", description: "Sample destinations to inspire your next outdoor adventure." },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="WHERE WILL YOU GO?"
        title="Places That Take Your Breath Away"
        text="A sample collection of landscapes to spark ideas. Destinations are placeholders and don't confirm the trips currently on offer."
        image={IMG.heroDestinations}
        imageAlt="Mountain valley with layered peaks"
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />
      <DestinationsExplorer />
      <FinalCTA title="Found a Place You Love?" text="Get in touch to ask about trips and what's possible." />
    </>
  );
}
