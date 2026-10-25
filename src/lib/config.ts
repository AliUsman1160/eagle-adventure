/**
 * Central, editable company configuration.
 * Every value marked PLACEHOLDER is sample content — replace with real details.
 * Leave a value as an empty string to hide it / show a neutral placeholder in the UI.
 */
export const siteConfig = {
  name: "Eagle Eye Adventure Club",
  shortName: "Eagle Eye",
  description:
    "Eagle Eye Adventure Club is a sample adventure and outdoor experiences brand: trekking, camping, hiking, waterfalls and scenic journeys.",
  /** Set NEXT_PUBLIC_SITE_URL when a production domain exists. Never hard-code an invented domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",

  contact: {
    email: "", // e.g. "hello@yourdomain.com"
    phone: "", // e.g. "+92 300 0000000"
    location: "", // e.g. "City, Country"
    /** Digits only with country code, e.g. "923000000000". Empty = WhatsApp link hidden. */
    whatsappNumber: "",
    hours: "",
  },

  /** Leave empty to render the icon as a disabled placeholder (no fake profile links). */
  socials: {
    facebook: "",
    instagram: "",
    youtube: "",
  },

  /** Sample figures (dummy values) — NOT verified company statistics. Replace with real numbers. */
  stats: [
    { label: "Adventures Organized", value: "150+" },
    { label: "Destinations Explored", value: "25+" },
    { label: "Happy Travelers", value: "2,000+" },
    { label: "Years of Experience", value: "8+" },
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/adventures", label: "Adventures" },
  { href: "/destinations", label: "Destinations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return siteConfig.url ? `${siteConfig.url.replace(/\/$/, "")}${path}` : path;
}

export function whatsappLink(text?: string) {
  const n = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (!n) return null;
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
