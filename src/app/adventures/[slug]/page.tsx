import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adventures, getAdventure } from "@/data/adventures";
import { absoluteUrl } from "@/lib/config";
import AdventureDetails from "@/components/adventures/AdventureDetails";
import RelatedAdventures from "@/components/adventures/RelatedAdventures";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return adventures.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const adventure = getAdventure(slug);
  if (!adventure) return { title: "Adventure not found" };
  return {
    title: adventure.title,
    description: adventure.overview,
    alternates: { canonical: absoluteUrl(`/adventures/${slug}`) },
    openGraph: {
      title: adventure.title,
      description: adventure.overview,
      images: [{ url: adventure.image.src, alt: adventure.image.alt }],
    },
  };
}

export default async function AdventurePage({ params }: Props) {
  const { slug } = await params;
  const adventure = getAdventure(slug);
  if (!adventure) notFound();

  return (
    <>
      <AdventureDetails adventure={adventure} />
      <RelatedAdventures currentSlug={adventure.slug} destinationSlug={adventure.destinationSlug} />
    </>
  );
}
