import { Fragment } from "react";
import Link from "next/link";
import SearchForm from "./SearchForm";
import { blogCategories, blogTags, postsWithTag } from "@/lib/blog";

// Live `#secondary.blog-sidebar`: Search, Categories and Tags widgets.
export default function BlogSidebar({ query }: { query?: string }) {
  return (
    <div className="lv-title lv-blog-sidebar">
      <div className="lv-widget lv-widget_search">
        <SearchForm query={query} />
      </div>
      <div className="lv-widget lv-widget_categories">
        <h3 className="lv-widget-title">Categories</h3>
        <ul>
          {blogCategories.map((c) => (
            <li key={c.slug} className="lv-cat-item">
              <Link href={`/category/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lv-widget lv-widget_tag_cloud">
        <h3 className="lv-widget-title">Tags</h3>
        <div className="lv-tagcloud">
          {/* WordPress prints the cloud as whitespace-separated inline links at 8pt. */}
          {blogTags.map((t, i) => (
            <Fragment key={t.slug}>
              {i > 0 && " "}
              <Link
                href={`/tag/${t.slug}`}
                className="lv-tag-cloud-link"
                style={{ fontSize: "8pt" }}
                aria-label={`${t.name} (${postsWithTag(t.slug).length} items)`}
              >
                {t.name}
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
