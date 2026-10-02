import { notFound } from "next/navigation";
import GenericContentPage from "@/components/GenericContentPage";
import ConditionPage from "@/components/ConditionPage";
import { servicesHelpers, conditionPages, livePages, PACKAGE_SERVICE_SLUGS } from "@/lib/content";

// Slugs rendered from the synced live data instead of the generic template.
const liveServicePage = (slug: string) =>
  conditionPages[slug] || PACKAGE_SERVICE_SLUGS.includes(slug) ? livePages[slug] : undefined;

export function generateStaticParams() {
  return [...servicesHelpers.list().map((d) => d.slug), ...PACKAGE_SERVICE_SLUGS].map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = liveServicePage(params.slug);
  if (page) return { title: `${page.title} – Gramy Hospital` };
  const d = servicesHelpers.get(params.slug);
  return { title: d ? `${d.title} – Gramy Hospital` : "Gramy Hospital" };
}

// The diagnostic-service pages captured from the live site (radiology,
// sonography, microbiology, pathology) and the four health-package pages
// render through ConditionPage from the synced live data. The other /services/* slugs are not part of that set and
// keep using the pre-existing generic template.
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const page = liveServicePage(params.slug);
  if (page) return <ConditionPage page={page} />;

  const d = servicesHelpers.get(params.slug);
  if (!d) notFound();
  return <GenericContentPage entry={d} showSidebar currentHref={`/services/${params.slug}`} />;
}
