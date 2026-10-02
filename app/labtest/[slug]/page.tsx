import { notFound } from "next/navigation";
import GenericContentPage from "@/components/GenericContentPage";
import { labtestHelpers } from "@/lib/content";

export function generateStaticParams() {
  return labtestHelpers.list().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = labtestHelpers.get(params.slug);
  return { title: d ? `${d.title} – Gramy Hospital` : "Gramy Hospital" };
}

export default function LabtestDetailPage({ params }: { params: { slug: string } }) {
  const d = labtestHelpers.get(params.slug);
  if (!d) notFound();
  return <GenericContentPage entry={d} />;
}
