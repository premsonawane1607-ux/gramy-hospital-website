import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import LabTestSection from "@/components/LabTestSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HospitalGallery from "@/components/HospitalGallery";
import HealthcareSolutionSection from "@/components/HealthcareSolutionSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import { about, aboutVideo, services, whyChoose } from "@/lib/homepage-data";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 items-center gap-y-[30px] xl:grid-cols-2 xl:gap-x-6">
          <div>
            <span className="section-title sub !mx-0 !max-w-none !text-left">{about.sub}</span>
            {/* `.about-content h2 { font-size:42px }` (25px / margin-bottom:12px
                below the 767px breakpoint) — this h2 had no font-size class at
                all, so it was inheriting the tiny body size instead, which is
                also why the bold "Care & Amenities" portion (font-weight:800
                via `.about-content h2 b`, already correct here through
                `font-extrabold`) barely read as bold: the weight contrast was
                there, just invisible at that shrunken size. */}
            <h2 className="mt-2 text-[25px] md:text-[42px]">
              {about.titleLead} <b className="font-extrabold">{about.titleBold}</b>
            </h2>
            <p className="mt-4 text-paragraph">{about.paragraph}</p>
            <div className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              <ul className="flex flex-col gap-5">
                {about.checklist.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-medium text-black">
                    <i className="ti ti-checks flex-none text-xl text-optional-three" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-col gap-5 sm:mt-0">
                {about.checklistTwo.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-medium text-black">
                    <i className="ti ti-checks flex-none text-xl text-optional-three" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-paragraph">{about.missionParagraph}</p>
            {/* Original markup only has the generic `.default-btn` class here
                with no color override in hospa-main.css, but the live site
                renders this specific button in optionalColorTwo (#F82828),
                not the sitewide default purple — confirmed by sampling the
                live screenshot directly. */}
            <Link href={about.ctaHref} className="default-btn !bg-optional-two hover:!bg-main mt-5 inline-flex">
              <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
              {about.ctaLabel}
            </Link>
          </div>
          {/* Live image proportions: plain natural-ratio photo (880x975 portrait),
              no square crop, no max-width cap (live .col-xl-6 has neither). */}
          <div className="relative mx-auto w-full lg:mx-0 lg:ml-[50px]">
            <div className="overflow-hidden rounded-card">
              <Image src={about.image} alt="Gramy Hospital" width={880} height={975} className="h-auto w-full" />
            </div>
            {about.counters.map((c, i) => (
              <div
                key={c.label}
                className={`absolute ${i === 0 ? "right-0 top-0" : "left-0 bottom-0"} rounded-[20px] p-[15px] text-center shadow-[0_4px_30px_rgba(84,72,161,0.1)] ${c.bg}`}
              >
                <div className={`flex items-center justify-center rounded-[20px] border border-white ${i === 0 ? "gap-1 p-[25px]" : "gap-0 px-[25px] py-[15px] max-[767px]:px-[10px] max-[767px]:py-[10px] min-[1200px]:max-[1399px]:px-[15px] min-[1200px]:max-[1399px]:py-[7px]"}`}>
                  <span className={`text-[35px] font-black text-black ${i === 0 ? "leading-none" : "leading-[1.2]"}`}>{c.value}</span>
                  {c.suffix && <span className={`text-[35px] font-black text-black ${i === 0 ? "leading-none" : "leading-[1.2]"}`}>{c.suffix}</span>}
                </div>
                <p className={`mt-[5px] text-xs tracking-[1.2px] text-black ${i === 0 ? "" : "leading-[1.8]"}`}>
                  {c.label}
                  <br />
                  <span>{c.labelSpan}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* About video */}
      <div className="pb-20">
        <div className="container-default">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-card">
            <video
              className="aspect-video w-full bg-black"
              src={aboutVideo.src}
              poster={aboutVideo.poster}
              controls
              loop
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <Section sub={services.sub} title={services.titleLead} titleBold={services.titleBold} className="bg-[#F7F8FC]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((s) => (
            <ServiceCard key={s.title} title={s.title} description={s.description} icon={s.icon} href={s.href} />
          ))}
        </div>
      </Section>

      {/* Why choose — exact live `.why-choose-us-area.pb-75` rebuild (HospaChooseArea
          widget): NO card boxes, bare 80px flower icons, left-aligned 25px titles,
          15px/20px text gaps, sliding-arrow Learn More links, 3 cols >=992px /
          2 cols at 576-991 / stacked below, 24px gutters, 75px bottom padding
          (25px mobile) with NO top padding. Values verbatim from hospa-main.css
          `.why-choose-us-card` (15571-15618) + hospa-responsive.css mobile rules. */}
      <section className="bg-white pb-[75px] max-[767px]:pb-[25px]">
        <div className="mx-auto w-full max-w-[1320px] px-[12px]">
          <div className="section-title">
            <span className="sub">{whyChoose.sub}</span>
            <h2>
              {whyChoose.titleLead} <b className="font-extrabold">{whyChoose.titleBold}</b>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.items.map((w) => (
              <div key={w.title} className="mb-[25px]">
                <Image
                  src={w.icon}
                  alt={w.title}
                  width={80}
                  height={80}
                  className="mb-[30px] max-[767px]:mb-[25px] max-[767px]:block max-[767px]:mx-auto"
                />
                <h3 className="mb-[15px] max-w-[380px] text-[25px] font-medium leading-[1.4] text-black max-[767px]:mb-[12px] max-[767px]:text-[22px]">
                  {w.title}
                </h3>
                <p className="mb-[20px] max-w-[365px] text-base text-paragraph">{w.description}</p>
                <Link href={w.href} className="gh-feature-card__link !text-[14.5px]">
                  <span aria-hidden="true">&#8594;</span> Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab tests */}
      <LabTestSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Gallery preview (Hospital / OT / Wards tabs) */}
      <HospitalGallery heading="Gallery" />

      {/* Healthcare solution CTA — TestimonialsSection above already carries its
          own 100px/50px bottom section-padding, and .solution-area has no
          padding of its own in the original CSS, so no extra gap is added here. */}
      <HealthcareSolutionSection />

      {/* Blog & articles — original .blog-area only declares pb-100 (bottom);
          a matching top gap is added here for the same reason there's none
          between Solution and Blog otherwise. */}
      <div className="pt-[50px] min-[768px]:pt-[100px]">
        <BlogPreviewSection />
      </div>
    </>
  );
}
