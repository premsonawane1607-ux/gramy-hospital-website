import PageBanner from "@/components/PageBanner";
import DoctorCard from "@/components/DoctorCard";
import { listDoctors } from "@/lib/content";

export const metadata = { title: "Find a Doctor – Gramy Hospital" };

export default function DoctorsPage() {
  const doctors = listDoctors();
  return (
    <>
      <PageBanner title="Find a Doctor" />
      <section className="section-padding">
        <div className="container-default grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((d) => (
            <DoctorCard key={d.slug} name={d.name} designation={d.tags_line} img={d.img} href={`/doctors/${d.slug}`} />
          ))}
        </div>
      </section>
    </>
  );
}
