import DoctorCard from "./DoctorCard";
import { DOCTOR_SLUG_BY_NAME } from "@/lib/content";
import type { DoctorCardRef } from "@/lib/types";

export default function DoctorGrid({ doctors, heading }: { doctors: DoctorCardRef[]; heading: string }) {
  if (!doctors || doctors.length === 0) return null;
  return (
    <section className="section-padding bg-[#F7F8FC]">
      <div className="container-default">
        <h2 className="mb-10 text-center text-3xl font-bold">{heading}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((d, i) => (
            <DoctorCard
              key={i}
              name={d.name}
              designation={d.designation}
              img={d.img}
              href={DOCTOR_SLUG_BY_NAME[d.name.trim()] ? `/doctors/${DOCTOR_SLUG_BY_NAME[d.name.trim()]}` : null}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
