import type { ReactNode } from "react";
import "../about-blog-live.css";
import BlogSidebar from "./BlogSidebar";

// Live `.blog-area.ptb-100`: Bootstrap container with the col-lg-8 results
// column and the col-lg-4 sidebar. Shared by the blog listing, the category
// and tag archives and the search results.
export default function BlogArea({ query, children }: { query?: string; children: ReactNode }) {
  return (
    <div className="gh-lv">
      <div className="lv-blog-area lv-ptb-100">
        <div className="lv-container">
          <div className="lv-row">
            <div className="lv-col-lg-8 lv-col-md-12">
              <div className="lv-blog-left-sidebar">
                <div className="lv-row">{children}</div>
              </div>
            </div>
            <div className="lv-col-lg-4 lv-col-md-12">
              <BlogSidebar query={query} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
