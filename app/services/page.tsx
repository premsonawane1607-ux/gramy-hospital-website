import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import ContentBlocks from "@/components/ContentBlocks";
import { getArchivePage, servicesHelpers } from "@/lib/content";

export const metadata = { title: "Our Services – Gramy Hospital" };

export default function ServicesIndexPage() {
  const archive = getArchivePage("services");
  const items = servicesHelpers.list();

  return (
    <>
      <PageBanner title="Our Services" />
      <section className="section-padding">
        <div className="container-default">
          {archive && (
            <div className="mx-auto mb-12 max-w-4xl">
              <ContentBlocks nodes={archive.body_nodes} />
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-shadow rounded-card bg-white p-6 hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold hover:text-main">{s.title ?? s.slug}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
