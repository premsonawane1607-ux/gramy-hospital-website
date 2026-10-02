import type { Metadata } from "next";
import InnerPageLayout, { InnerSection } from "@/components/inner/InnerPageLayout";
import SectionHeading from "@/components/inner/SectionHeading";
import DoctorFinder from "@/components/inner/DoctorFinder";
import type { DoctorListing } from "@/components/inner/DoctorProfileCard";
import { getGenericPage, listDoctorCategories, listDoctors } from "@/lib/content";
import { localImage } from "@/lib/images";

export const metadata: Metadata = { title: "Find A Doctor – Gramy Hospital" };

// Doctor profiles (the same records /doctors/[slug] renders), ordered as the
// live /find-a-doctor/ grid lists them, with any newer profiles after. The
// Services filter is the live `doc_cat` taxonomy (doctor category archives).
function buildDirectory(): { doctors: DoctorListing[]; services: string[] } {
  const categories = listDoctorCategories().map((c) => ({
    label: (c.title ?? c.slug).replace(/^Doctors Category:\s*/, "").trim(),
    members: new Set(c.doctor_cards.map((d) => d.name.trim())),
  }));

  const liveOrder = (getGenericPage("find-a-doctor")?.doctor_cards ?? []).map((d) => d.name.trim());
  const rank = (name: string) => {
    const i = liveOrder.indexOf(name);
    return i === -1 ? liveOrder.length : i;
  };

  const doctors = listDoctors()
    .map((d, i) => ({ d, i }))
    .sort((a, b) => rank(a.d.name.trim()) - rank(b.d.name.trim()) || a.i - b.i)
    .map(({ d }) => {
      const name = d.name.trim();
      return {
        slug: d.slug,
        name,
        designation: d.tags_line,
        img: localImage(d.img) ?? d.img,
        experience: d.info?.experience,
        location: d.info?.location,
        services: categories.filter((c) => c.members.has(name)).map((c) => c.label),
      };
    });

  const services = categories
    .filter((c) => doctors.some((d) => d.services.includes(c.label)))
    .map((c) => c.label)
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));

  return { doctors, services };
}

export default function FindADoctorPage() {
  const { doctors, services } = buildDirectory();
  return (
    <InnerPageLayout
      title="Find A Doctor"
      bold="last"
      heroImage="/images/site/WhatsApp-Image-2026-07-29-at-10.13.33-AM-1-e1787573245280.jpeg"
    >
      <InnerSection>
        <SectionHeading sub="FIND HEALTH PROFESSIONALS">
          Find Your Desired <b>Health Professionals</b>
        </SectionHeading>
        <DoctorFinder doctors={doctors} services={services} />
      </InnerSection>
    </InnerPageLayout>
  );
}
