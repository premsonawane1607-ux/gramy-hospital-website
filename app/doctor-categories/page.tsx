import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { listDoctorCategories } from "@/lib/content";

export const metadata = { title: "Doctor Categories – Gramy Hospital" };

export default function DoctorCategoriesIndexPage() {
  const items = listDoctorCategories();
  return (
    <>
      <PageBanner title="Doctor Categories" />
      <section className="section-padding">
        <div className="container-default grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/doctor-categories/${s.slug}`}
              className="card-shadow rounded-card bg-white p-5 text-sm font-medium hover:-translate-y-1 hover:text-main"
            >
              {s.title ?? s.slug}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
