import { Fragment } from "react";
import Link from "next/link";

// Live `.pagination-area` (WordPress `paginate_links`): previous arrow, the
// page numbers with the current one as a span, next arrow.
export default function Pagination({
  page,
  pages,
  hrefFor,
}: {
  page: number;
  pages: number;
  hrefFor: (page: number) => string;
}) {
  if (pages < 2) return null;
  const items = [
    page > 1 && (
      <Link key="prev" className="lv-prev lv-page-numbers" href={hrefFor(page - 1)} aria-label="Previous page">
        <i className="ti ti-chevron-left" />
      </Link>
    ),
    ...Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
      n === page ? (
        <span key={n} aria-current="page" className="lv-page-numbers lv-current">
          {n}
        </span>
      ) : (
        <Link key={n} className="lv-page-numbers" href={hrefFor(n)}>
          {n}
        </Link>
      ),
    ),
    page < pages && (
      <Link key="next" className="lv-next lv-page-numbers" href={hrefFor(page + 1)} aria-label="Next page">
        <i className="ti ti-chevron-right" />
      </Link>
    ),
  ].filter(Boolean);
  return (
    <div className="lv-pagination-area lv-text-center">
      <nav aria-label="navigation">
        {items.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            {item}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
