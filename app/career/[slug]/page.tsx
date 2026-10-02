import { notFound } from "next/navigation";
import GenericContentPage from "@/components/GenericContentPage";
import { careerHelpers } from "@/lib/content";

export function generateStaticParams() {
  return careerHelpers.list().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = careerHelpers.get(params.slug);
  return { title: d ? `${d.title} – Gramy Hospital` : "Gramy Hospital" };
}

export default function CareerDetailPage({ params }: { params: { slug: string } }) {
  const d = careerHelpers.get(params.slug);
  if (!d) notFound();
  return <GenericContentPage entry={d} />;
}
