import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/config";
import { IMG } from "@/data/images";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A sample gallery of mountains, campsites, trails and nature moments from the outdoors.",
  alternates: { canonical: absoluteUrl("/gallery") },
  openGraph: { title: "Gallery", description: "Moments from the wild — mountains, camping, trekking and nature." },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="CAPTURED ALONG THE WAY"
        title="Moments from the Wild"
        text="Peaks, campsites, trails and quiet corners of nature. Sample photography, ready to be replaced with real trip photos."
        image={IMG.heroGallery}
        imageAlt="Snow-covered mountain peak under a clear sky"
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <GalleryGrid />
      <FinalCTA />
    </>
  );
}
