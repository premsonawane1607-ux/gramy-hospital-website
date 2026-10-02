import Link from "next/link";
import { getBlogCategory, type SearchResult } from "@/lib/blog";

// Live `.blog-card.single-blog-card` (blog listing, category, tag and search
// results). Articles carry the 800x530 image with the category pill; the
// event/career entries a search can return have neither.
export default function BlogCard({ entry }: { entry: SearchResult }) {
  const { post } = entry;
  const category = post ? getBlogCategory(post.category) : null;
  return (
    <div className="lv-col-lg-12 lv-col-md-12">
      <div className="lv-blog-card lv-single-blog-card">
        {post && (
          <div className="lv-blog-image">
            <Link href={entry.href} className="lv-blog-img lv-d-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cardImage} alt={post.title} />
            </Link>
            {category && (
              <Link href={`/category/${category.slug}`} className="lv-tag-btn">
                {category.name}
              </Link>
            )}
          </div>
        )}
        <div className={post ? "lv-blog-content lv-with-img" : "lv-blog-content"}>
          <ul className="lv-meta">
            <li>{entry.date}</li>
            <li>{entry.minsRead}</li>
          </ul>
          <h3>
            <Link href={entry.href}>{entry.title}</Link>
          </h3>
          <Link href={entry.href} className="lv-blog-btn">
            <i className="ti ti-arrow-right" />
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
