import type { ReactNode } from "react";
import SpecialistBanner from "@/components/SpecialistBanner";

// Shared shell for the homepage quick-link destination pages: the live
// WITH-image `.page-banner-area` (photo, then the gray title box carrying the
// h1, Home > Title breadcrumb and phone/print/email pills) followed by the
// page's own `.ptb-100` sections.
export default function InnerPageLayout({
  title,
  heroImage,
  bold = "first",
  children,
}: {
  title: string;
  heroImage: string;
  bold?: "first" | "last";
  children: ReactNode;
}) {
  return (
    <>
      <SpecialistBanner
        title={title}
        heroImage={heroImage}
        boldFirstWord={bold === "first"}
        boldLastWord={bold === "last"}
      />
      {children}
    </>
  );
}

// `.ptb-100` + Bootstrap `.container` — the wrapper every one of these live
// widgets (patients-visitors-area, doctor-area, find-location-area,
// contact-us-area) sits in.
export function InnerSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative z-[1] py-[50px] min-[768px]:py-[100px] ${className}`}>
      <div className="gh-specialist-container">{children}</div>
    </section>
  );
}
