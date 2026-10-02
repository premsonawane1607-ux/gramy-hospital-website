import Link from "next/link";
import DoctorCarousel from "./DoctorCarousel";
import type { LiveDoctor } from "@/lib/types";

// Live `Hospa_DoctorSliderWid` widget: Bootstrap `.container` gutters (12px),
// `.doctor-slider-inner` (relative, overflow hidden) with the h2
// ("Available Doctors Under …", 42px/25px mobile, 50/45px — 25/25px mobile —
// margins) above the Owl slider.
export function DoctorSlider({
  id,
  heading,
  doctors,
  loop,
}: {
  id: string;
  heading: string;
  doctors: LiveDoctor[];
  loop: boolean;
}) {
  return (
    <div data-wid={id} data-wtype="doctors" className="gh-w">
      <div className="gh-docslider">
        <div data-a="doc-inner" className="gh-docslider__inner">
          <h2>{heading}</h2>
          <DoctorCarousel doctors={doctors} loop={loop} />
        </div>
      </div>
    </div>
  );
}

function ProfileLink({ d, children, hidden }: { d: LiveDoctor; children: React.ReactNode; hidden?: boolean }) {
  const a11y = hidden ? { tabIndex: -1, "aria-hidden": true as const } : {};
  if (!d.href) return <>{children}</>;
  return d.external ? (
    <a href={d.href} target="_blank" rel="noopener noreferrer" {...a11y}>
      {children}
    </a>
  ) : (
    <Link href={d.href} {...a11y}>
      {children}
    </Link>
  );
}

// Live custom-HTML `.gh-docs` widget (robotic-surgery, orthopedic-surgery):
// a STATIC 3 / 2 / 1-column doctor grid that replaces the hidden slider on
// those pages. Markup and CSS are the widget's own, verbatim.
export function DoctorStaticGrid({
  id,
  heading,
  headingWeight,
  doctors,
}: {
  id: string;
  heading: string;
  headingWeight: number;
  doctors: LiveDoctor[];
}) {
  return (
    <div data-wid={id} data-wtype="docgrid" className="gh-w">
      <div data-a="dg" className="gh-docs">
        <h2 data-a="dg-h" className="gh-docs__heading" style={{ fontWeight: headingWeight }}>
          {heading}
        </h2>
        <div data-a="dg-grid" className="gh-docs__grid">
          {doctors.map((d) => (
            <div key={d.name} data-a="dg-card" className="gh-docs__card">
              <div data-a="dg-media" className="gh-docs__media">
                <ProfileLink d={d} hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {d.img && <img src={d.img} alt={d.name} loading="lazy" />}
                </ProfileLink>
                <a data-a="dg-btn" className="gh-docs__btn" href="tel:02235347300">
                  <span className="gh-docs__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </span>
                  Book an appointment
                </a>
              </div>
              <h3 data-a="dg-name" className="gh-docs__name">
                <ProfileLink d={d}>{d.name}</ProfileLink>
              </h3>
              <p data-a="dg-role" className="gh-docs__role">
                {d.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
