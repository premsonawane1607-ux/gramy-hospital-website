import { notFound } from "next/navigation";
import ConditionPage from "@/components/ConditionPage";
import { SPECIALIST_SLUGS, livePages } from "@/lib/content";

export function generateStaticParams() {
  return SPECIALIST_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = SPECIALIST_SLUGS.includes(params.slug) ? livePages[params.slug] : undefined;
  return { title: page ? `${page.title} – Gramy Hospital` : "Gramy Hospital" };
}

export default function SpecialistPage({ params }: { params: { slug: string } }) {
  const page = SPECIALIST_SLUGS.includes(params.slug) ? livePages[params.slug] : undefined;
  if (!page) notFound();

  return <ConditionPage page={page} />;
}
