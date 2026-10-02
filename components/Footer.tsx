import Link from "next/link";
import Image from "next/image";
import BackToTopButton from "./BackToTopButton";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "For Patient",
    links: [
      { label: "Find a Doctor", href: "/find-a-doctor" },
      { label: "Request An Appointment", href: "tel:022-35347300" },
      { label: "Opinion", href: "/contact" },
    ],
  },
  {
    title: "Centres of Excellence",
    links: [
      { label: "Bariatric / Weight Loss Surgery", href: "/bariatric-weight-loss-surgery" },
      { label: "Bone Marrow Transplant", href: "/bone-marrow-transplant" },
      { label: "Cancer Care / Oncology", href: "/cancer-care-oncology" },
      { label: "Eye Care / Ophthalmology", href: "/eye-care-ophthalmology" },
      { label: "Kidney Transplant", href: "/kidney-transplant" },
      { label: "Minimal Access / Laparoscopic Surgery", href: "/minimal-access-laparoscopic-surgery" },
      { label: "Nephrology", href: "/nephrology" },
      { label: "Orthopedics", href: "/orthopedics" },
      { label: "Robotic Surgery", href: "/specialists/robotic-surgery" },
    ],
  },
  {
    title: "Top Procedures",
    links: [
      { label: "CAR T-Cell Therapy", href: "/car-t-cell-therapy" },
      { label: "Chemotherapy", href: "/chemotherapy" },
      { label: "LVAD", href: "/lvad" },
      { label: "Robotic Heart Surgery", href: "/robotic-heart-surgery" },
      { label: "The Da Vinci Xi Robotic System", href: "/the-da-vinci-xi-robotic-system" },
      { label: "Kidney Transplant", href: "/kidney-transplant" },
      { label: "Lung Transplant", href: "/lung-transplant" },
      { label: "Bone Marrow Transplant", href: "/bone-marrow-transplant" },
      { label: "HIPEC", href: "/hipec" },
      { label: "Valvular Heart Surgery", href: "/valvular-heart-surgery" },
      { label: "Coronary Artery Bypass Grafting (CABG)", href: "/coronary-artery-bypass-grafting-cabg" },
      { label: "Knee Replacement Surgery", href: "/knee-replacement-surgery" },
      { label: "ECMO", href: "/ecmo" },
      { label: "Cochlear Implant", href: "/cochlear-implant" },
    ],
  },
  {
    title: "Corporate",
    links: [
      { label: "About US", href: "/about-us" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

const SOCIALS = [
  { icon: "flaticon-facebook", label: "Facebook" },
  { icon: "flaticon-twitter", label: "Twitter" },
  { icon: "flaticon-instagram", label: "Instagram" },
  { icon: "flaticon-linkedin", label: "LinkedIn" },
];

const LEGAL_LINKS = [
  { label: "HR Compliances", href: "/hr-compliances" },
  { label: "Labour Compliances", href: "/labour-compliances" },
  { label: "Environmental Clearances", href: "/environmental-clearances" },
  { label: "Environmental Policy", href: "/environmental-policy" },
  { label: "Bio Medical Report", href: "/bio-medical-report" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <>
      {/* Background is full viewport width (no side margin) per explicit
          request — the original `.footer-area` rule does carry a side
          margin at some breakpoints, but the background is kept edge-to-edge
          here while the inner content below stays on container-default,
          unchanged, matching the rest of the footer's flush sections
          (compliance strip, copyright bar). */}
      <footer className="rounded-t-[40px] bg-[#020D2B] text-white/80">
        <div className="container-default grid grid-cols-1 gap-x-10 gap-y-[25px] pt-[50px] min-[1200px]:grid-cols-[3fr_9fr] min-[768px]:pt-[100px]">
          <div>
            <Link href="/">
              <Image src="/images/theme/gramy-hospital-white.png" alt="Gramy Hospital" width={170} height={48} />
            </Link>

            <p className="mt-[30px] mb-[30px] max-w-xs text-[15px] leading-relaxed text-[#ADB1BC]">
              <span className="font-medium text-white">Locations: </span>
              WR7G+PFC, Sidhwa Estate, Azad Nagar, Colaba, Mumbai, Maharashtra 400005
            </p>

            <ul className="text-[15px] text-[#ADB1BC]">
              <li className="text-base font-medium text-white">Visiting Hours: </li>
              <li className="mt-[7px]">Sunday: 08:00 AM - 10:00 PM</li>
              <li className="mt-[7px]">Monday - Friday: 06:00 AM - 12:00 AM</li>
            </ul>
          </div>
          {/* Nested row: col-sm-6 (2-up from 576px) / col-lg-3 (4-up from
              992px) — a 3-step stack, not a single md: jump. */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-[25px] min-[576px]:grid-cols-2 min-[992px]:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-[30px] text-xl font-bold text-white">{col.title}</h3>
                <ul className="flex flex-col gap-[18px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[15px] text-[#ADB1BC] hover:text-main hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {col.title === "Corporate" && (
                  <div className="mt-[50px]">
                    <span className="mb-[25px] block text-lg font-bold text-white">Social Media</span>
                    <div className="flex gap-5">
                      {SOCIALS.map((s) => (
                        <a
                          key={s.label}
                          href="#"
                          aria-label={s.label}
                          className="text-[#ADB1BC] transition hover:text-main"
                        >
                          <i className={`${s.icon} text-base`} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="h-[25px]" />
      </footer>

      {/* The compliance links + Advisory Notice are siblings of `.footer-area`
          in the original DOM (the closing `</footer>` comes before them),
          not children inside the rounded/margined box — so this is a plain
          flush-width strip in the same dark color, not inset like the box
          above it. */}
      <div className="bg-[#020D2B] pt-10 text-left text-white">
        <div className="container-default">
          <p className="text-sm leading-relaxed">
            {/* The wrapping <span> in the original has an inline color:#ffffff,
                but every <a> inside it still renders in the sitewide default
                Bootstrap link color (--bs-link-color-rgb: 149,136,232, i.e.
                mainColor) since an element's own color rule always wins over
                an inherited one — confirmed against the live site's screenshot. */}
            {LEGAL_LINKS.map((l, i) => (
              <span key={l.href}>
                <Link href={l.href} className="text-main hover:text-[#776DBA] hover:underline">
                  {l.label}
                </Link>
                {i < LEGAL_LINKS.length - 1 && " | "}
              </span>
            ))}
          </p>
          <p className="mt-4 max-w-6xl text-sm leading-relaxed">
            Advisory Notice: 1. Lately, unauthorized individuals have attempted to make fraudulent representations
            of Max Hospitals, using fake numbers to solicit private information and swindle money from
            unsuspecting and innocent individuals. Please note that Gramy Hospital never solicits information such
            as bank details or payment authorisation on any link. We request you to be careful when sharing any
            sensitive information or clicking on unverified links. 2. Gramy Hospital never charges any money for
            job opportunities. Beware of any fraudulent individuals or agencies making such offers, and always
            verify information with official sources.
          </p>
        </div>
      </div>

      {/* `.copyright-area { margin-top: 75px; padding: 25px 0; background:
          #8EC0EE; }` — the 75px belongs to this bar itself, separating it
          from the advisory notice above, not to the strip above it. */}
      <div className="mt-[75px] bg-[#8EC0EE] py-[25px] text-center text-sm text-paragraph">
        <p>©2026 GramyHospital, All Rights Reserved.</p>
      </div>

      <BackToTopButton />
    </>
  );
}
