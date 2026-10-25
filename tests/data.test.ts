import { describe, expect, it } from "vitest";
import { adventures, getAdventure, categories } from "@/data/adventures";
import { destinations, getDestination } from "@/data/destinations";
import { galleryImages } from "@/data/gallery";
import { faqGroups, faqPreview } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { IMG } from "@/data/images";
import { siteConfig } from "@/lib/config";

const unique = (a: string[]) => new Set(a).size === a.length;

describe("adventure data", () => {
  it("has six adventures with unique slugs", () => {
    expect(adventures).toHaveLength(6);
    expect(unique(adventures.map((a) => a.slug))).toBe(true);
  });
  it("every adventure links to an existing destination", () => {
    adventures.forEach((a) => expect(getDestination(a.destinationSlug), a.slug).toBeDefined());
  });
  it("every adventure has the full set of detail fields", () => {
    adventures.forEach((a) => {
      expect(a.title && a.overview && a.location && a.duration).toBeTruthy();
      expect(a.image.alt.length).toBeGreaterThan(5);
      [a.highlights, a.itinerary, a.included, a.notIncluded, a.whatToBring, a.faqs, a.description].forEach((l) =>
        expect(l.length, a.slug).toBeGreaterThan(0),
      );
    });
  });
  it("prices are placeholders or null — never presented as real", () => {
    adventures.forEach((a) => {
      if (a.price !== null) expect(a.price.toLowerCase()).toContain("placeholder");
    });
  });
  it("getAdventure resolves and rejects slugs", () => {
    expect(getAdventure("mountain-trekking")?.title).toBe("Mountain Trekking");
    expect(getAdventure("nope")).toBeUndefined();
  });
  it("categories derive from data", () => {
    expect(categories.length).toBeGreaterThanOrEqual(6);
  });
});

describe("destinations", () => {
  it("has 6 unique destinations with alt text", () => {
    expect(destinations).toHaveLength(6);
    expect(unique(destinations.map((d) => d.slug))).toBe(true);
    destinations.forEach((d) => expect(d.image.alt).toBeTruthy());
  });
});

describe("gallery", () => {
  it("has unique ids, captions, alt text and all four categories", () => {
    expect(unique(galleryImages.map((g) => g.id))).toBe(true);
    galleryImages.forEach((g) => expect(g.caption && g.alt).toBeTruthy());
    expect(new Set(galleryImages.map((g) => g.category))).toEqual(new Set(["Mountains", "Camping", "Trekking", "Nature"]));
    expect(new Set(galleryImages.map((g) => g.orientation)).size).toBeGreaterThan(1);
  });
});

describe("faqs / testimonials / stats / images", () => {
  it("has 5 FAQ groups and a 4-question preview", () => {
    expect(faqGroups.map((g) => g.title)).toEqual([
      "General Information", "Trips & Activities", "Preparation & Equipment", "Families & Groups", "Pricing & Inquiries",
    ]);
    expect(faqPreview).toHaveLength(4);
  });
  it("testimonials are clearly sample content", () => {
    testimonials.forEach((t) => expect(`${t.name} ${t.trip} ${t.quote}`.toLowerCase()).toMatch(/sample|placeholder/));
  });
  it("has 4 stats", () => expect(siteConfig.stats).toHaveLength(4));
  it("all image URLs are https unsplash", () => {
    const urls = [
      ...Object.values(IMG),
      ...adventures.map((a) => a.image.src),
      ...destinations.map((d) => d.image.src),
      ...galleryImages.map((g) => g.src),
    ];
    urls.forEach((u) => expect(new URL(u).origin).toBe("https://images.unsplash.com"));
  });
});
