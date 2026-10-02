import Link from "next/link";
import { services } from "@/lib/homepage-data";

const HOSPITAL_ADDRESS = "WR7G+PFC, Sidhwa Estate, Azad Nagar, Colaba, Mumbai, Maharashtra 400005";
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOSPITAL_ADDRESS)}`;

export default function PageSidebar({ currentHref }: { currentHref?: string }) {
  const related = services.items.filter((s) => s.href !== currentHref);

  return (
    <aside className="flex flex-col gap-6">
      <div className="card-shadow rounded-card bg-white p-6">
        <h3 className="mb-4 text-base font-semibold text-black">Related Services</h3>
        <ul className="flex flex-col gap-2">
          {related.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-paragraph hover:bg-main/10 hover:text-main"
              >
                {s.title}
                <span aria-hidden="true">&#8594;</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-shadow rounded-card bg-white p-6">
        <h3 className="mb-3 text-base font-semibold text-black">Get Directions</h3>
        <p className="mb-4 text-sm text-paragraph">{HOSPITAL_ADDRESS}</p>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="default-btn w-full !py-2.5 text-sm">
          Get Directions
        </a>
      </div>
    </aside>
  );
}
