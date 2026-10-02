import Link from "next/link";
import DirectionsCard from "./DirectionsCard";
import type { LivePage } from "@/lib/types";

// Live sidebar column: `Hospa_SD_sidebar_posts` (`.services-details-sidebar
// .services-list`) then `Hospa_Get_DirectionCard`. The list is per page on the
// live site — 8 services-post links (cosmetic-gynaecology, gynecology and the
// diagnostic pages), 4 package links in reverse order (pathology), or the 4
// health-checkup packages + Radiology (everything else) — so it comes from
// the synced page data rather than being derived here. Links without a local
// route (the package posts) go to the live site.
export default function SpecialistSidebar({ sidebar }: { sidebar: LivePage["sidebar"] }) {
  return (
    <>
      <div>
        <ul data-a="sb-list" className="gh-sdlist">
          {sidebar.items.map((item, i) => {
            const pos = i === 0 ? "sb-first" : i === sidebar.items.length - 1 ? "sb-last" : undefined;
            const arrow = <i className="ti ti-arrow-right" aria-hidden="true" />;
            return (
              <li key={item.href}>
                {item.external ? (
                  <a data-a={pos} href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.title}
                    {arrow}
                  </a>
                ) : (
                  <Link data-a={pos} href={item.href}>
                    {item.title}
                    {arrow}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {sidebar.address && (
        <div>
          <DirectionsCard address={sidebar.address} placeholder={sidebar.placeholder} mapImage={sidebar.mapImage} />
        </div>
      )}
    </>
  );
}
