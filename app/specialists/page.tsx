import PageBanner from "@/components/PageBanner";
import SpecialistCard from "@/components/SpecialistCard";
import { SPECIALIST_SLUGS, specialists } from "@/lib/content";

export const metadata = { title: "Specialities – Gramy Hospital" };

export default function SpecialistsPage() {
  return (
    <>
      <PageBanner title="Specialities" />
      <section className="section-padding">
        <div className="container-default grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALIST_SLUGS.map((slug) => {
            const s = specialists[slug];
            return (
              <SpecialistCard
                key={slug}
                slug={slug}
                title={s.title}
                heroImg={s.hero_img}
                doctorCount={s.doctors?.length ?? 0}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
