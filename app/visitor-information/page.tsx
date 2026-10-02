import type { Metadata } from "next";
import PageBannerArea from "@/components/inner/PageBannerArea";
import CheckList from "@/components/inner/CheckList";
import ContactDetailsBox from "@/components/inner/ContactDetailsBox";
import { BS_CONTAINER, PTB_100 } from "@/components/inner/live-styles";

export const metadata: Metadata = { title: "Visitor Information – Gramy Hospital" };

const GUIDELINES = [
  "Carry a valid visitor pass at all times.",
  "Maintain silence within patient care areas.",
  "Follow infection control and hygiene protocols.",
  "Limit the number of visitors per patient.",
  "Avoid visiting if experiencing fever, cold, cough, or other infectious symptoms.",
  "Follow instructions provided by hospital staff and security personnel.",
];

const ENTRY_RULES = [
  "One attendant may stay with the patient as per hospital policy.",
  "Attendants are requested to cooperate with medical and nursing staff during treatment and procedures.",
  "Hospital regulations regarding patient care areas must be strictly followed.",
];

const AMENITIES = [
  "Comfortable waiting areas.",
  "Patient assistance services.",
  "Pharmacy services.",
  "Diagnostic facilities.",
  "Emergency care support.",
  "Wheelchair assistance.",
  "Parking facilities (subject to availability).",
];

// `.patients-visitors-desc .content/.inner-content` (hospa-main.css +
// hospa-responsive.css) shared heading styles.
const SUB = "mb-[12px] block text-[12px] font-bold leading-[18px] tracking-[1.2px] text-optional max-[767px]:mb-[10px] max-[767px]:text-[10px] max-[767px]:leading-[15px]";
const H2 = "mb-[15px] text-[40px] leading-[1.2] max-[767px]:text-[25px] [&_b]:font-extrabold";
// Only `.content h2` tightens to 12px on mobile; `.inner-content h2` keeps 15px.
const H2_CONTENT = `${H2} max-[767px]:mb-[12px]`;
const H3 = "mb-[20px] mt-[50px] text-[25px] leading-[1.2] max-[767px]:text-[20px]";
const UL = "mb-[1rem] list-disc pl-[2rem]";

// Live /visitor-information/: page banner, then the `Hospa_Visitor_Information`
// widget's `.patients-visitors-area.ptb-100` directly followed by the footer.
export default function VisitorInformationPage() {
  return (
    <>
      <PageBannerArea
        title={
          <>
            <b>Visitor</b> Information
          </>
        }
        breadcrumb="Visitor Information"
        image={{ src: "/images/site/newimg41-e1787572865818.jpeg", width: 1600, height: 370 }}
      />
      <div className={PTB_100}>
        <div className={BS_CONTAINER}>
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto mb-[55px] max-w-[855px] max-[767px]:mb-[35px]">
              <span className={SUB}>UPDATED: SEPTEMBER 26, 2023</span>
              <h2 className={H2_CONTENT}>
                <b>Visiting</b> Hours
              </h2>
              <p className="mb-[15px]">
                To promote patient recovery and ensure uninterrupted medical care, we request all visitors to adhere to
                the designated visiting hours.
              </p>
              <p className="mb-[15px]">
                <b>General Ward &amp; Private Rooms</b>
              </p>
              <ul className={UL}>
                <li>Morning: 11:00 AM – 1:00 PM</li>
                <li>Evening: 5:00 PM – 7:00 PM</li>
              </ul>
              <p className="mb-[15px]">
                <b>ICU &amp; Critical Care Units</b>
              </p>
              <ul className={UL}>
                <li>Morning: 11:00 AM – 12:00 PM</li>
                <li>Evening: 5:00 PM – 6:00 PM</li>
              </ul>
              <p className="mb-0">
                <i>Visiting hours may vary based on the patient&apos;s condition and hospital policies.</i>
              </p>
            </div>

            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/site/IMG-20260729-WA0018.jpg"
                width={1280}
                height={960}
                alt="image"
                className="inline h-auto max-w-full rounded-[20px] align-middle"
              />
            </div>

            <div className="mx-auto mt-[75px] max-w-[855px] max-[767px]:mt-[35px]">
              <span className={SUB}>GUIDELINES</span>
              <h2 className={H2}>
                <b>Visitor </b> Guidelines
              </h2>
              To maintain a safe and healing environment for all patients, we kindly request visitors to:
              <ul className={UL}>
                {GUIDELINES.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>

              <h3 className={H3}>Public Entrances</h3>
              <CheckList items={ENTRY_RULES} />

              <h3 className={H3}>Facilities &amp; Amenities</h3>
              <CheckList intro="To make your visit more convenient, Gramy Hospital offers:" items={AMENITIES} />

              <ContactDetailsBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
