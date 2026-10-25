import type { FAQ, FAQGroup } from "@/types";

export const faqGroups: FAQGroup[] = [
  {
    title: "General Information",
    items: [
      { question: "What is Eagle Eye Adventure Club?", answer: "Eagle Eye Adventure Club is an outdoor adventure brand. This website is a preview using sample content — the real offerings are confirmed directly with the company." },
      { question: "Where do the trips go?", answer: "The destinations shown are samples. Actual destinations and routes will be confirmed when you get in touch." },
    ],
  },
  {
    title: "Trips & Activities",
    items: [
      { question: "What kinds of activities are offered?", answer: "Sample categories include trekking, camping, hiking, waterfall visits, road trips and group tours. The final list depends on the company's current programme." },
      { question: "Are beginners welcome?", answer: "Many outdoor activities suit beginners, while others require fitness or experience. Each trip lists a difficulty level, and the actual requirements depend on the specific trip." },
    ],
  },
  {
    title: "Preparation & Equipment",
    items: [
      { question: "What should I bring on an adventure trip?", answer: "Typically comfortable footwear, weather-appropriate layers, water, sun protection and any personal medication. The exact packing list depends on the specific trip and season." },
      { question: "Is gear provided?", answer: "That depends on the trip. Ask when you inquire so you know exactly what is and is not included." },
    ],
  },
  {
    title: "Families & Groups",
    items: [
      { question: "Can groups or families participate?", answer: "Groups and families are often welcome, especially on easier trips. Age limits and group sizes depend on the specific trip, so please ask." },
      { question: "Can a trip be tailored for our group?", answer: "Customised arrangements may be possible. Share your group size and preferences through the contact page." },
    ],
  },
  {
    title: "Pricing & Inquiries",
    items: [
      { question: "How do I inquire about a trip?", answer: "Use the inquiry form on the Contact page or the inquiry button on any adventure. The company will confirm details, availability and pricing directly." },
      { question: "Are the prices on the website real?", answer: "Any prices shown are placeholders in this preview. Final pricing is confirmed by the company." },
      { question: "Does this website process bookings or payments?", answer: "No. This website does not take bookings or payments. Trips are only confirmed directly with the company." },
    ],
  },
];

const all = faqGroups.flatMap((g) => g.items);
const pick = (q: string): FAQ => {
  const item = all.find((i) => i.question === q);
  if (!item) throw new Error(`FAQ not found: ${q}`);
  return item;
};

export const faqPreview: FAQ[] = [
  pick("What should I bring on an adventure trip?"),
  pick("Are beginners welcome?"),
  pick("How do I inquire about a trip?"),
  pick("Can groups or families participate?"),
];
