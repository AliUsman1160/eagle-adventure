export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type AdventureCategory =
  | "Trekking"
  | "Camping"
  | "Hiking"
  | "Waterfalls"
  | "Road Trips"
  | "Group Tours";

export type DurationBucket = "Day trip" | "2–3 days" | "4+ days";

export interface Img {
  src: string;
  alt: string;
}

export interface ItineraryDay {
  title: string;
  description: string;
}

export interface Adventure {
  slug: string;
  title: string;
  category: AdventureCategory;
  tagline: string;
  overview: string;
  description: string[];
  location: string;
  destinationSlug: string;
  duration: string;
  durationBucket: DurationBucket;
  difficulty: Difficulty;
  /** Placeholder only. Use null to display "Contact for pricing". */
  price: string | null;
  image: Img;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  whatToBring: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  image: Img;
  bestFor: string[];
}

export type GalleryCategory = "Mountains" | "Camping" | "Trekking" | "Nature";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  orientation: "landscape" | "portrait" | "square";
}

export interface Testimonial {
  id: string;
  name: string;
  trip: string;
  quote: string;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQGroup {
  title: string;
  items: FAQ[];
}

export interface Stat {
  label: string;
  value: string;
}
