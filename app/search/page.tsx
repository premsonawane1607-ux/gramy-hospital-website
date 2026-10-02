import { notFound } from "next/navigation";
import PageBannerArea from "@/components/inner/PageBannerArea";
import BlogArea from "@/components/blog/BlogArea";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import SearchForm from "@/components/blog/SearchForm";
import { SEARCH_PAGE_SIZE, searchSite } from "@/lib/blog";

type SearchParams = { s?: string | string[]; paged?: string | string[] };
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(first(searchParams.paged), 10) || 1;
  return { title: `Search Results for “${first(searchParams.s)}” – ${page > 1 ? `Page ${page} – ` : ""}Gramy Hospital` };
}

// Live site search (`/?s=<terms>`, `&paged=<n>`): the blog layout listing 10
// results per page — articles, events and career posts — or "Nothing Found"
// with a second search form.
export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const query = first(searchParams.s);
  const page = Math.max(1, parseInt(first(searchParams.paged), 10) || 1);
  const results = searchSite(query);
  const pages = Math.ceil(results.length / SEARCH_PAGE_SIZE);
  if (page > 1 && page > pages) notFound();
  const hrefFor = (n: number) => `/search?s=${encodeURIComponent(query)}${n > 1 ? `&paged=${n}` : ""}`;

  return (
    <>
      <PageBannerArea
        title={
          <>
            Search Results for: <span>{query}</span>
          </>
        }
        breadcrumb={`Search Results for: ${query}`}
        image={null}
        info={["print", "mail"]}
      />
      <BlogArea query={query}>
        {results.length === 0 ? (
          <section className="lv-no-results lv-not-found">
            <header className="lv-page-header">
              <h1 className="lv-page-title">Nothing Found</h1>
            </header>
            <div className="lv-page-content">
              <p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
              <SearchForm query={query} />
            </div>
          </section>
        ) : (
          <>
            {results.slice((page - 1) * SEARCH_PAGE_SIZE, page * SEARCH_PAGE_SIZE).map((entry) => (
              <BlogCard key={entry.href} entry={entry} />
            ))}
            <Pagination page={page} pages={pages} hrefFor={hrefFor} />
          </>
        )}
      </BlogArea>
    </>
  );
}
