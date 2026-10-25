import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/config";
import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import FeaturedAdventures from "@/components/home/FeaturedAdventures";
import AboutPreview from "@/components/home/AboutPreview";
import DestinationsShowcase from "@/components/home/DestinationsShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Adventure & Outdoor Experiences` },
  description: "Discover mountain treks, camping nights, waterfalls and scenic journeys with Eagle Eye Adventure Club.",
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedAdventures />
      <AboutPreview />
      <DestinationsShowcase />
      <WhyChooseUs />
      <HowItWorks />
      <GalleryPreview />
      <Testimonials />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
