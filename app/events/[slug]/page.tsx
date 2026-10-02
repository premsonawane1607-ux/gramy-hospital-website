import { notFound } from "next/navigation";
import GenericContentPage from "@/components/GenericContentPage";
import { eventHelpers } from "@/lib/content";

export function generateStaticParams() {
  return eventHelpers.list().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = eventHelpers.get(params.slug);
  return { title: d ? `${d.title} – Gramy Hospital` : "Gramy Hospital" };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const d = eventHelpers.get(params.slug);
  if (!d) notFound();
  return <GenericContentPage entry={d} />;
}
