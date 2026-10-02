import allPagesRaw from "@/data/all-pages.json";
import specialistsRaw from "@/data/specialists.json";
import conditionPagesRaw from "@/data/condition-pages.json";
import livePagesRaw from "@/data/specialist-live.json";
import type { GenericPageEntry, DoctorProfileEntry, SpecialistEntry, ConditionPageEntry, LivePage } from "./types";

const allPages = allPagesRaw as unknown as Record<string, GenericPageEntry | DoctorProfileEntry>;
export const specialists = specialistsRaw as unknown as Record<string, SpecialistEntry>;

// High-fidelity "page-area" template pages that aren't part of the 14
// /specialists/* entries: the diagnostic-service pages under /services/*
// (radiology, sonography, microbiology) and the two catch-all treatment
// pages (/orthopedics, /pathology). Same original Elementor widget stack as
// the specialist pages, just reached through different route files.
export const conditionPages = conditionPagesRaw as unknown as Record<string, ConditionPageEntry>;

// Every specialist/condition page as it currently renders on the live site
// (banner, ordered article widgets, doctor section, sidebar). This is what
// ConditionPage renders; `specialists`/`conditionPages` above only still
// decide which slugs each route serves.
export const livePages = livePagesRaw as unknown as Record<string, LivePage>;

// Live `services-post` health-package pages (the destinations of the
// specialist sidebar links), served at /services/[slug] from livePages.
export const PACKAGE_SERVICE_SLUGS = [
  "special-male-health-package",
  "special-female-senior-citizen-health-package",
  "special-male-senior-citizen-health-package",
  "special-womens-health-checkup-package",
];

export const SPECIALIST_SLUGS = [
  "cosmetic-gynaecology",
  "cosmetic-surgery",
  "ent-surgery",
  "general-surgery",
  "robotic-surgery",
  "gynecology",
  "orthopedic-surgery",
  "neurology",
  "aesthetic-medicine",
  "prp-cartilage-rejuvenation",
  "neurosurgery",
  "plastic-surgery",
  "urology",
  "anti-ageing-nutrition-medicine",
];

function stripPrefix(slug: string, prefix: string): string {
  return prefix && slug.startsWith(prefix) ? slug.slice(prefix.length) : slug;
}

function byCategory<T>(category: string): [string, T][] {
  return Object.entries(allPages).filter(([, d]) => d.category === category) as [string, T][];
}

// ---- generic "page" content (About, Contact, Gallery, treatment pages, ...) ----
// "blog", "events", "services" also exist as generic pages (their live archive/
// landing pages) — those are consumed directly by the fixed listing routes
// instead of the catch-all, so RESERVED_TOP_SLUGS excludes them from it.
export const RESERVED_TOP_SLUGS = new Set([
  "specialists",
  "doctors",
  "services",
  "labtest",
  "career",
  "events",
  "blog",
  "doctor-categories",
  "taxonomy",
  "news",
  "contact-us",
  "about-us",
  "visitor-information",
  "find-a-doctor",
  "find-a-location",
]);

export function listGenericPages(): GenericPageEntry[] {
  return byCategory<GenericPageEntry>("posts-page-1")
    .map(([, d]) => d)
    .filter((d) => d.slug !== "__home__" && !SPECIALIST_SLUGS.includes(d.slug));
}

export function getGenericPage(slug: string): GenericPageEntry | null {
  return listGenericPages().find((d) => d.slug === slug) ?? null;
}

export function listCatchAllPageSlugs(): string[] {
  return listGenericPages()
    .map((d) => d.slug)
    .filter((slug) => !RESERVED_TOP_SLUGS.has(slug));
}

// ---- doctors ----
export function listDoctors(): (DoctorProfileEntry & { slug: string })[] {
  return byCategory<DoctorProfileEntry>("posts-doctors-1").map(([, d]) => ({
    ...d,
    slug: stripPrefix(d.slug, "doctors-post__"),
  }));
}

export function getDoctor(slug: string): (DoctorProfileEntry & { slug: string }) | null {
  return listDoctors().find((d) => d.slug === slug) ?? null;
}

export const DOCTOR_SLUG_BY_NAME: Record<string, string> = Object.fromEntries(
  listDoctors().map((d) => [d.name.trim(), d.slug])
);

// ---- doctor category archives ----
export function listDoctorCategories(): GenericPageEntry[] {
  return byCategory<GenericPageEntry>("taxonomies-doctors_cat-1").map(([, d]) => ({
    ...d,
    slug: stripPrefix(d.slug, "doctors-category__"),
  }));
}

export function getDoctorCategory(slug: string): GenericPageEntry | null {
  return listDoctorCategories().find((d) => d.slug === slug) ?? null;
}

// ---- services / labtest / career / events / blog ----
function makeCategoryHelpers(category: string, prefix: string) {
  const list = () =>
    byCategory<GenericPageEntry>(category).map(([, d]) => ({ ...d, slug: stripPrefix(d.slug, prefix) }));
  const get = (slug: string) => list().find((d) => d.slug === slug) ?? null;
  return { list, get };
}

export const servicesHelpers = makeCategoryHelpers("posts-services-1", "services-post__");
export const labtestHelpers = makeCategoryHelpers("posts-labtest-1", "labtest-post__");
export const careerHelpers = makeCategoryHelpers("posts-career-1", "career-post__");
export const eventHelpers = makeCategoryHelpers("posts-event-1", "event-post__");
export const blogHelpers = makeCategoryHelpers("posts-post-1", "");

// ---- misc small taxonomy archives ----
export function listTaxonomyPages(): GenericPageEntry[] {
  const cats: [string, string][] = [
    ["taxonomies-category-1", ""],
    ["taxonomies-post_tag-1", "tag__"],
    ["taxonomies-doctors_facility-1", ""],
    ["taxonomies-services_cat-1", ""],
  ];
  return cats.flatMap(([category, prefix]) =>
    byCategory<GenericPageEntry>(category).map(([, d]) => ({ ...d, slug: stripPrefix(d.slug, prefix) }))
  );
}

export function getTaxonomyPage(slug: string): GenericPageEntry | null {
  return listTaxonomyPages().find((d) => d.slug === slug) ?? null;
}

// ---- the three generic pages consumed by fixed listing routes ----
export function getArchivePage(slug: "blog" | "events" | "services"): GenericPageEntry | null {
  return byCategory<GenericPageEntry>("posts-page-1").map(([, d]) => d).find((d) => d.slug === slug) ?? null;
}
