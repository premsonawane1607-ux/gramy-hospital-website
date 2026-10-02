import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ContentBlocks from "@/components/ContentBlocks";
import DoctorGrid from "@/components/DoctorGrid";
import { listDoctorCategories, getDoctorCategory } from "@/lib/content";

export function generateStaticParams() {
  return listDoctorCategories().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getDoctorCategory(params.slug);
  return { title: d ? `${d.title} – Gramy Hospital` : "Gramy Hospital" };
}

export default function DoctorCategoryPage({ params }: { params: { slug: string } }) {
  const d = getDoctorCategory(params.slug);
  if (!d) notFound();

  return (
    <>
      <PageBanner title={d.title ?? d.slug} />
      <section className="section-padding">
        <div className="container-default mx-auto max-w-4xl">
          <ContentBlocks nodes={d.body_nodes} />
        </div>
      </section>
      <DoctorGrid doctors={d.doctor_cards} heading="Matching Doctors" />
    </>
  );
}
