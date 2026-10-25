import { unsplash } from "@/lib/utils";
import type { Destination } from "@/types";

/** Sample destinations — replace with the places your company actually operates in. */
export const destinations: Destination[] = [
  {
    slug: "hunza-valley",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    tagline: "Terraced valleys beneath towering, snow-capped giants.",
    description:
      "A dramatic valley of orchards, ancient forts and high peaks. A natural fit for scenic drives, viewpoints and slow, photo-friendly days.",
    image: { src: unsplash("1506905925346-21bda4d32df4", 1600), alt: "Mountain range rising above a green valley" },
    bestFor: ["Scenic drives", "Photography", "Culture"],
  },
  {
    slug: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    tagline: "Alpine lakes, high plateaus and enormous night skies.",
    description:
      "A gateway to high-altitude lakes and open plateaus where the night sky is the main attraction. Ideal for camping-focused journeys.",
    image: { src: unsplash("1501785888041-af3ef285b470", 1600), alt: "Calm alpine lake surrounded by mountains" },
    bestFor: ["Camping", "Stargazing", "Lakes"],
  },
  {
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Gilgit-Baltistan",
    tagline: "Green pastures at the foot of a legendary peak.",
    description:
      "Reached on foot through pine forests, this high meadow rewards trekkers with sweeping views of massive snow-covered peaks.",
    image: { src: unsplash("1464822759023-fed622ff2c3b", 1600), alt: "Snow-covered peaks above an alpine meadow" },
    bestFor: ["Trekking", "Mountain views", "Camping"],
  },
  {
    slug: "swat-valley",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    tagline: "Rivers, forests and rolling green hills.",
    description:
      "Lush, forested hillsides and rivers make Swat a relaxing region for hiking, nature trails and easy weekend escapes.",
    image: { src: unsplash("1472214103451-9374bd1c798e", 1600), alt: "Rolling green hills and forest" },
    bestFor: ["Hiking", "Rivers", "Weekend trips"],
  },
  {
    slug: "naran-kaghan",
    name: "Naran & Kaghan",
    region: "Khyber Pakhtunkhwa",
    tagline: "Glacial streams, waterfalls and alpine lakes.",
    description:
      "A valley of cascading water and cool mountain air, with trails that lead to waterfalls and high-altitude lakes.",
    image: { src: unsplash("1433086966358-54859d0ed716", 1600), alt: "Waterfall flowing through a green gorge" },
    bestFor: ["Waterfalls", "Lakes", "Family trips"],
  },
  {
    slug: "neelum-valley",
    name: "Neelum Valley",
    region: "Azad Kashmir",
    tagline: "A river-carved valley of forests and mist.",
    description:
      "Pine-clad slopes and a bright river define this valley, well suited to relaxed group tours and shared adventures.",
    image: { src: unsplash("1470071459604-3b5ec3a7fe05", 1600), alt: "Misty forest valley" },
    bestFor: ["Group tours", "Nature", "Relaxation"],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
