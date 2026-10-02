import blogRaw from "@/data/blog-live.json";
import type { RichNode } from "./types";

// Blog content synced 1:1 from the live site (data/blog-live.json): the
// articles with their Elementor text widget, the category/tag lists of the
// sidebar, and the event/career entries the live site search also returns.

export interface BlogPost {
  slug: string;
  title: string;
  /** As printed on the live site, e.g. "June 9, 2026". */
  date: string;
  minsRead: string;
  category: string;
  tags: string[];
  /** Full-size featured image (article page, About Us cards). */
  image: string;
  /** 800x530 crop used by the listing cards. */
  cardImage: string;
  /** 150x150 crop used by the previous/next block. */
  thumb: string;
  elementorId: string;
  nodes: RichNode[];
}

export interface BlogTerm {
  slug: string;
  name: string;
}

export interface SearchResult {
  title: string;
  href: string;
  date: string;
  minsRead: string;
  /** Only articles carry an image and a category pill on the live cards. */
  post?: BlogPost;
}

interface OtherEntry {
  type: string;
  title: string;
  href: string;
  date: string;
  minsRead: string;
  searchText: string;
}

const data = blogRaw as unknown as {
  posts: BlogPost[];
  categories: BlogTerm[];
  tags: BlogTerm[];
  searchOthers: OtherEntry[];
};

/** Newest first, the live `/blog/` order. */
export const blogPosts = data.posts;
export const blogCategories = data.categories;
export const blogTags = data.tags;

export const blogPostHref = (post: BlogPost) => `/blog/${post.slug}`;

export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getBlogCategory(slug: string): BlogTerm | null {
  return blogCategories.find((c) => c.slug === slug) ?? null;
}

export function getBlogTag(slug: string): BlogTerm | null {
  return blogTags.find((t) => t.slug === slug) ?? null;
}

export const postsInCategory = (slug: string) => blogPosts.filter((p) => p.category === slug);
export const postsWithTag = (slug: string) => blogPosts.filter((p) => p.tags.includes(slug));

/** WordPress order: "previous" is the next older article, "next" the next newer one. */
export function adjacentPosts(slug: string): { previous: BlogPost | null; next: BlogPost | null } {
  const i = blogPosts.findIndex((p) => p.slug === slug);
  return { previous: blogPosts[i + 1] ?? null, next: i > 0 ? blogPosts[i - 1] : null };
}

// ---- site search (live `/?s=`) ----
export const SEARCH_PAGE_SIZE = 10;

function nodeText(node: RichNode): string {
  return typeof node === "string" ? node : (node.children ?? []).map(nodeText).join("");
}

// Everything the live search covers, in its date order (newest first).
const searchIndex: (SearchResult & { titleText: string; text: string })[] = [
  ...blogPosts.map((post) => ({
    title: post.title,
    href: blogPostHref(post),
    date: post.date,
    minsRead: post.minsRead,
    post,
    titleText: post.title.toLowerCase(),
    text: `${post.title}\n${post.nodes.map(nodeText).join(" ")}`.toLowerCase(),
  })),
  ...data.searchOthers.map((o) => ({
    title: o.title,
    href: o.href,
    date: o.date,
    minsRead: o.minsRead,
    titleText: o.title.toLowerCase(),
    text: o.searchText,
  })),
];

// WordPress' English search stopwords.
const STOPWORDS = new Set(
  "about,an,are,as,at,be,by,com,for,from,how,in,is,it,of,on,or,that,the,this,to,was,what,when,where,who,will,with,www".split(","),
);

/**
 * WordPress search: every term must appear in the title or content
 * (case-insensitive substring), title matches rank first, then newest first.
 * An empty query lists everything, as the live `/?s=` does.
 */
export function searchSite(query: string): SearchResult[] {
  const sentence = query.trim().toLowerCase().replace(/\s+/g, " ");
  if (!sentence) return searchIndex;
  let terms = sentence.split(" ").filter((t) => !STOPWORDS.has(t) && !/^[a-z]$/.test(t));
  if (terms.length === 0 || terms.length > 9) terms = [sentence];
  const rank = (e: (typeof searchIndex)[number]) => {
    if (terms.length === 1) return e.titleText.includes(terms[0]) ? 1 : 2;
    if (e.titleText.includes(sentence)) return 1;
    if (terms.every((t) => e.titleText.includes(t))) return 2;
    if (terms.some((t) => e.titleText.includes(t))) return 3;
    return e.text.includes(sentence) ? 5 : 6;
  };
  return searchIndex
    .map((e, i) => ({ e, i }))
    .filter(({ e }) => terms.every((t) => e.text.includes(t)))
    .sort((a, b) => rank(a.e) - rank(b.e) || a.i - b.i)
    .map(({ e }) => e);
}
