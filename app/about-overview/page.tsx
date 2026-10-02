import type { Metadata } from "next";
import "@/components/about-overview-live.css";
import PageBannerArea from "@/components/inner/PageBannerArea";
import { ElColumn, ElDocument, ElSection, ElWidget } from "@/components/live/Elementor";
import {
  OverviewAbout,
  OverviewDoctors,
  OverviewInsurance,
  OverviewMoreAbout,
  OverviewPrinciples,
  OverviewSolution,
  OverviewTestimonials,
  OverviewWhyChoose,
} from "@/components/about-overview/OverviewSections";

export const metadata: Metadata = { title: "About Overview – Gramy Hospital" };

// Live `/about-overview/` (Elementor document 480) — the page all three home
// "Why choose Gramy" cards (Patient-Centered Care, Advanced Medical
// Excellence, Comprehensive Specialty Care) link to. Eight full-width
// sections, each a single widget, in the live order.
const SECTIONS = [
  { section: "52f8d10", column: "d12ebd0", widget: "fb83b8f", type: "Hospa_About_Area", content: <OverviewAbout /> },
  { section: "1880cce", column: "1720114", widget: "603c32d", type: "Hospa_FeedbackArea", content: <OverviewTestimonials /> },
  { section: "d447bfc", column: "c0496cd", widget: "8f61548", type: "HospaAboutThree", content: <OverviewMoreAbout /> },
  { section: "80be7c4", column: "5aa2c0c", widget: "e558dc7", type: "HospaChooseArea", content: <OverviewWhyChoose /> },
  { section: "9dcb617", column: "499c644", widget: "d70f5e0", type: "HospaHealthcare_Area", content: <OverviewSolution /> },
  { section: "eff4d4c", column: "39c8434", widget: "1007ae1", type: "Hospa_FeaturesFour", content: <OverviewPrinciples /> },
  { section: "9cbb14f", column: "9761001", widget: "0167861", type: "Hospa_DoctorsTab", content: <OverviewDoctors /> },
  { section: "fa48842", column: "35ccef2", widget: "52bf453", type: "hospa_Partner_Two", content: <OverviewInsurance /> },
];

export default function AboutOverviewPage() {
  return (
    <>
      <PageBannerArea
        title={
          <>
            <b>About Us - </b>Overview
          </>
        }
        breadcrumb="About Overview"
        image={{ src: "/images/site/bg1.jpg", width: 1728, height: 316 }}
      />
      <div className="gh-ov">
        <div className="lv-page-area">
          {/* WordPress' own `#post-480 > .entry-content` wrappers around the document. */}
          <div>
            <div className="lv-entry-content">
              <ElDocument id="480">
                {SECTIONS.map((s) => (
                  <ElSection key={s.section} id={s.section} tag="div">
                    <ElColumn id={s.column} size={100}>
                      <ElWidget id={s.widget} type={s.type}>
                        {s.content}
                      </ElWidget>
                    </ElColumn>
                  </ElSection>
                ))}
              </ElDocument>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
