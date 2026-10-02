import { notFound } from "next/navigation";
import GenericContentPage from "@/components/GenericContentPage";
import { listTaxonomyPages, getTaxonomyPage } from "@/lib/content";

export function generateStaticParams() {
  return listTaxonomyPages().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getTaxonomyPage(params.slug);
  return { title: d ? `${d.title} – Gramy Hospital` : "Gramy Hospital" };
}

export default function TaxonomyPage({ params }: { params: { slug: string } }) {
  const d = getTaxonomyPage(params.slug);
  if (!d) notFound();
  return <GenericContentPage entry={d} />;
}
