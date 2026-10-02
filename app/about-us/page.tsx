import type { Metadata } from "next";
import "@/components/about-blog-live.css";
import PageBannerArea from "@/components/inner/PageBannerArea";
import { ElColumn, ElDocument, ElSection, ElWidget } from "@/components/live/Elementor";
import {
  AboutAppointment,
  AboutBlog,
  AboutIntro,
  AboutServices,
  AboutVideo,
  AboutWhyChoose,
  FeatureCard,
  OverviewCard,
} from "@/components/about/AboutSections";

export const metadata: Metadata = { title: "About Us – Gramy Hospital" };

// Live `/about-us/` (Elementor document 4742), section by section. The two
// sections the live page hides on every device (partner logos, specialists
// slider) are not rendered. Element ids are the live ones: the per-element
// rules in about-blog-live.css (card colours, column margins) key on them.
export default function AboutUsPage() {
  return (
    <>
      <PageBannerArea
        title={
          <>
            About <b>Us</b>
          </>
        }
        breadcrumb="About Us"
        image={{ src: "/images/live/2025/01/bg7.jpg", width: 1728, height: 316 }}
      />
      <div className="gh-lv">
        <div className="lv-page-area">
          {/* WordPress' own `#post-4742 > .entry-content` wrappers around the document. */}
          <div>
            <div className="lv-entry-content">
              <ElDocument id="4742">
              <ElSection id="255b334">
                <ElColumn id="ff62b5e" size={100}>
                  <ElWidget id="d06dcca" type="Hospa_Maternity_About_Content">
                    <AboutIntro />
                  </ElWidget>
                </ElColumn>
              </ElSection>

              <ElSection id="161b091" boxed>
                <ElColumn id="7252b97" size={100}>
                  <ElWidget id="bd1d977" type="video">
                    <AboutVideo />
                  </ElWidget>
                </ElColumn>
              </ElSection>

              <ElSection id="831e095" boxed>
                <ElColumn id="152214e" size={33}>
                  <ElWidget id="1b01fc8" type="Hospa_Feature_Card_Maternity">
                    <FeatureCard
                      icon="ti-alert-square-rounded"
                      title="VISITOR INFORMATION"
                      text="Helping you plan your visit with ease through essential information on appointments, facilities, visiting hours, and patient services."
                      href="/visitor-information"
                    />
                  </ElWidget>
                </ElColumn>
                <ElColumn id="8950b8b" size={33}>
                  <ElWidget id="e2ee6ff" type="Hospa_Feature_Card_Maternity">
                    <FeatureCard
                      icon="ti-stethoscope"
                      title="FIND A DOCTOR"
                      text="Connect with experienced specialists across various medical disciplines and find the right expert for your healthcare needs."
                      href="/find-a-doctor"
                    />
                  </ElWidget>
                </ElColumn>
                <ElColumn id="9b20ea9" size={33}>
                  <ElWidget id="984f3e5" type="Hospa_Feature_Card_Maternity">
                    <FeatureCard
                      icon="ti-ambulance"
                      title="OUR LOCATIONS"
                      text="Access quality healthcare at our conveniently located facilities, designed to provide seamless care close to your community."
                      href="/find-a-location"
                    />
                  </ElWidget>
                </ElColumn>
              </ElSection>

              <ElSection id="abad90a">
                <ElColumn id="31435b6" size={100}>
                  <ElWidget id="b30e505" type="Hospa_ServicesPost_Psychiatric">
                    <AboutServices />
                  </ElWidget>
                </ElColumn>
              </ElSection>

              <ElSection id="7704c77">
                <ElColumn id="62eaa57" size={100}>
                  <ElWidget id="9286482" type="Hospa_TreatmentMaternity" className="lv-pt-100">
                    <AboutWhyChoose />
                  </ElWidget>
                </ElColumn>
              </ElSection>

              <ElSection id="e9f81e5">
                <ElColumn id="e706d73" size={100}>
                  <ElWidget id="147c9da" type="Hospa_PostsMaternity" className="lv-pt-100">
                    <AboutBlog />
                  </ElWidget>
                </ElColumn>
              </ElSection>

              <ElSection id="a20f21c" boxed className="lv-pt-100">
                <ElColumn id="972ca17" size={33}>
                  <ElWidget id="bdcb70f" type="Hospa_Overview_Card">
                    <OverviewCard
                      lead="Experienced"
                      bold="specialists"
                      text="Our team of experts is dedicated to providing top-quality care at every stage of your journey."
                      shape="/images/live/2025/01/img1.png"
                    />
                  </ElWidget>
                </ElColumn>
                <ElColumn id="b2fa822" size={33}>
                  <ElWidget id="652817d" type="Hospa_Overview_Card">
                    <OverviewCard
                      lead="Holistic"
                      bold="approach"
                      text="Comprehensive services that prioritize your health, comfort, relax, and well-being."
                      shape="/images/live/2025/01/img2.png"
                    />
                  </ElWidget>
                </ElColumn>
                <ElColumn id="de1c32d" size={33}>
                  <ElWidget id="02b4eea" type="Hospa_Overview_Card">
                    <OverviewCard
                      lead="Modern"
                      bold="facilities"
                      text="Advanced technology and a nurturing environment for the best possible outcomes."
                      shape="/images/live/2025/01/img3.png"
                    />
                  </ElWidget>
                </ElColumn>
              </ElSection>

              <ElSection id="97a2594">
                <ElColumn id="793119d" size={100}>
                  <ElWidget id="80f7c8b" type="Hospa_Maternity_Appointment" className="lv-pt-100">
                    <AboutAppointment />
                  </ElWidget>
                </ElColumn>
              </ElSection>
              </ElDocument>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
