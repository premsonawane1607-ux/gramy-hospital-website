import { notFound } from "next/navigation";
import GenericContentPage from "@/components/GenericContentPage";
import ConditionPage from "@/components/ConditionPage";
import PageBanner from "@/components/PageBanner";
import HospitalGallery from "@/components/HospitalGallery";
import {
  listCatchAllPageSlugs,
  getGenericPage,
  conditionPages,
  specialists,
  livePages,
  SPECIALIST_SLUGS,
} from "@/lib/content";

// The 14 specialist pages live at top-level URLs on the live site (e.g.
// /ent-surgery/, not /specialists/ent-surgery/ — that path 301s to the
// top-level one), so they're also generated here, reusing the same
// ConditionPage render the dedicated /specialists/[slug] route already uses.
export function generateStaticParams() {
  return [...listCatchAllPageSlugs(), ...SPECIALIST_SLUGS].map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const live = specialists[params.slug] || conditionPages[params.slug] ? livePages[params.slug] : undefined;
  if (live) return { title: `${live.title} – Gramy Hospital` };
  const d = getGenericPage(params.slug);
  return { title: d ? `${d.title} – Gramy Hospital` : "Gramy Hospital" };
}

// Corporate/utility/account pages don't carry the "Related Services + Get
// Directions" sidebar that treatment pages (e.g. /ent, /orthopedics) show on
// the live site — everything else defaults to showing it.
const NO_SIDEBAR_PREFIXES = [
  "about",
  "contact",
  "career",
  "gallery",
  "news",
  "testimonials",
  "faq",
  "privacy",
  "terms",
  "login",
  "register",
  "cart",
  "checkout",
  "shop",
  "my-account",
  "profile",
  "home",
  "coming-soon",
  "disclaimer",
  "investor",
  "leadership",
  "csr",
  "hr-compliances",
  "labour-compliances",
  "environmental",
  "volunteer",
  "donate",
  "research",
  "technology",
  "our-",
  "working-hours",
  "time-table",
  "pricing-plan",
  "feedback",
  "doctor",
  "education",
  "announcements",
  "awards",
  "book-an-appointment",
  "find-a-",
  "visitor-information",
  "health-information",
  "online-",
  "immigration-services",
  "international-patients",
  "pay-your-bills",
  "request-an-appointment",
  "get-an-opinion",
  "radiology-instruction-guide",
  "blog",
  "departments",
  "specials",
];

export default function GenericPage({ params }: { params: { slug: string } }) {
  if (params.slug === "gallery") {
    return (
      <>
        <PageBanner title="Gallery" />
        <HospitalGallery />
      </>
    );
  }

  // Specialist pages (top-level live URLs, e.g. /ent-surgery) and the
  // condition/treatment pages: both render from the page data synced from
  // the live site. Everything else in this catch-all (corporate/utility
  // pages) keeps the generic template below.
  const live = specialists[params.slug] || conditionPages[params.slug] ? livePages[params.slug] : undefined;
  if (live) return <ConditionPage page={live} />;

  const d = getGenericPage(params.slug);
  if (!d) notFound();
  const showSidebar = !NO_SIDEBAR_PREFIXES.some((p) => params.slug.startsWith(p));
  return <GenericContentPage entry={d} showSidebar={showSidebar} currentHref={`/${params.slug}`} />;
}
