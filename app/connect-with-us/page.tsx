import type { Metadata } from "next";
import Link from "next/link";
import InnerPageLayout, { InnerSection } from "@/components/inner/InnerPageLayout";
import SectionHeading from "@/components/inner/SectionHeading";
import InfoCard from "@/components/inner/InfoCard";
import ConnectForm from "@/components/inner/ConnectForm";
import { HOSPITAL } from "@/lib/hospital-info";

export const metadata: Metadata = { title: "Connect With Us – Gramy Hospital" };

const LINK = "text-paragraph hover:text-main";

// Same `HospaContactArea` structure as /contact-us (pastel info cards beside
// the bordered form, stacking below 992px).
export default function ConnectWithUsPage() {
  return (
    <InnerPageLayout title="Connect With Us" heroImage="/images/site/bg1.jpg">
      <InnerSection>
        <SectionHeading
          sub="CONNECT WITH US"
          description="Contact our team for appointments, support, feedback, and general healthcare enquiries."
        >
          How Can We <b>Help You?</b>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-10 min-[992px]:grid-cols-[1fr_2fr]">
          <div className="grid grid-cols-1 content-start gap-[25px] min-[768px]:grid-cols-2 min-[992px]:grid-cols-1">
            <InfoCard icon="ti-phone-plus" title="Call Or WhatsApp" bg="bg-[#F2DDD9]">
              <span className="block">
                CALL:{" "}
                <a href={HOSPITAL.phoneHref} className={LINK}>
                  {HOSPITAL.phoneLabel}
                </a>
              </span>
              <span className="block">
                WhatsApp:{" "}
                <a href={HOSPITAL.whatsappHref} target="_blank" rel="noopener noreferrer" className={LINK}>
                  {HOSPITAL.whatsappLabel}
                </a>
              </span>
            </InfoCard>
            <InfoCard icon="ti-mail" title="Email Us" bg="bg-[#C4DCF3]">
              <a href={HOSPITAL.emailHref} className={`${LINK} break-all`}>
                {HOSPITAL.email}
              </a>
            </InfoCard>
            <InfoCard icon="ti-ambulance" title="Our Locations" bg="bg-[#D6D2F1]">
              <span className="mb-[15px] block">{HOSPITAL.address}</span>
              <Link href="/find-a-location" className="gh-feature-card__link">
                <span aria-hidden="true">&#8594;</span> View Location
              </Link>
            </InfoCard>
            <InfoCard icon="ti-clock-hour-8" title="Visiting Hours" bg="bg-[#D7ECE4]">
              {HOSPITAL.visitingHours.map((h) => (
                <span key={h} className="block">
                  {h}
                </span>
              ))}
              <Link href="/visitor-information#visiting-hours" className="gh-feature-card__link mt-[15px]">
                <span aria-hidden="true">&#8594;</span> Ward &amp; ICU Hours
              </Link>
            </InfoCard>
          </div>

          <div className="min-[992px]:pl-[25px]">
            <h2 className="mb-[15px] text-[25px] min-[768px]:text-[42px]">
              Send Us A <b className="font-extrabold">Message</b> Anytime
            </h2>
            <p className="mb-[25px] text-paragraph">
              Your email address will not be published. Required fields are marked *
            </p>
            <ConnectForm />
          </div>
        </div>
      </InnerSection>
    </InnerPageLayout>
  );
}
