"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SPECIALIST_SLUGS } from "@/lib/content";

// Display label + doctor count shown in the live site's "Specialities" mega
// menu — these are the nav's own labels (e.g. "Gynaec", "Neuro Surgery"),
// which differ from the specialist page's own title in a few cases.
const SPECIALITY_MENU_META: Record<string, { label: string; count: string }> = {
  "cosmetic-gynaecology": { label: "Cosmetic Gynaecology", count: "2+ Doctors Available." },
  "cosmetic-surgery": { label: "Cosmetic Surgery", count: "2+ Doctors Available." },
  "ent-surgery": { label: "ENT Surgery", count: "1+ Doctors Available." },
  "general-surgery": { label: "General Surgery", count: "1+ Doctors Available." },
  "robotic-surgery": { label: "Robotic Surgery", count: "1+ Doctors Available." },
  gynecology: { label: "Gynaec", count: "6+ Doctors Available." },
  "orthopedic-surgery": { label: "Orthopedic Surgery", count: "2+ Doctors Available." },
  neurology: { label: "Neurology", count: "1+ Doctors Available." },
  "aesthetic-medicine": { label: "Aesthetic Medicine", count: "1+ Doctors Available." },
  "prp-cartilage-rejuvenation": { label: "PRP & Cartilage Rejuvenation", count: "1+ Doctors Available." },
  neurosurgery: { label: "Neuro Surgery", count: "2+ Doctors Available." },
  "plastic-surgery": { label: "Plastic Surgery", count: "1+ Doctors Available." },
  urology: { label: "Urology", count: "2+ Doctors Available." },
  "anti-ageing-nutrition-medicine": { label: "Anti-Ageing Nutrition Medicine", count: "2+ Doctors Available." },
};

const TOP_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Blog", href: "/blog" },
];

const IMISS_LINKS = [
  { label: "Endoscopy Spine", href: "/endoscopy-spine" },
  { label: "ENT", href: "/ent" },
  { label: "General Surgery", href: "/specialists/general-surgery" },
  { label: "Gynecology", href: "/specialists/gynecology" },
  { label: "Neurosurgery", href: "/specialists/neurosurgery" },
  { label: "Orthopedics", href: "/orthopedics" },
  { label: "Urology", href: "/specialists/urology" },
];

const SPECIAL_LINKS = [
  { label: "Antiaging and Wellness", href: "/antiaging-and-wellness" },
  { label: "Cancer Surgery", href: "/cancer-surgery" },
  { label: "Pain Management", href: "/pain-management" },
  { label: "Robotic Replacement Surgeries", href: "/robotic-replacement-surgeries" },
];

const DIAGNOSTIC_LINKS = [
  { label: "Pathology", href: "/services/pathology" },
  { label: "Radiology", href: "/services/radiology" },
  { label: "Sonography", href: "/services/sonography" },
];

type DropdownKey = "imiss" | "special" | "diagnostic";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const specialityItems = SPECIALIST_SLUGS.map((slug) => ({
    slug,
    title: SPECIALITY_MENU_META[slug]?.label ?? slug,
    count: SPECIALITY_MENU_META[slug]?.count ?? "",
  }));
  const specialityColumns = [specialityItems.slice(0, 5), specialityItems.slice(5, 10), specialityItems.slice(10, 14)];

  const dropdown = (key: DropdownKey, label: string, links: { label: string; href: string }[]) => (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(key)}
      onMouseLeave={() => setOpenDropdown((cur) => (cur === key ? null : cur))}
    >
      <button className="flex items-center gap-1 text-[14.5px] font-medium text-black hover:text-main">
        {label}
        <span className="text-xs">▾</span>
      </button>
      {openDropdown === key && (
        <div className="gh-nav-dropdown absolute left-0 top-full bg-white">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="gh-nav-dropdown__link">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top announcement bar — `.top-header-area .container-fluid` is a
          centered, Bootstrap-stepped container (540/720/960/1140), only
          truly fluid (30px padding, no cap) in the 1400-1599px gap, and
          capped again at 1920px/100px padding from 1600px up — see
          .gh-header-container in globals.css. Link is font-weight:500 with
          no underline and hovers to optionalColorTwo (red), and the button
          is a plain-cornered (no border-radius) rect with uniform 15px
          padding — all taken directly from hospa-main.css. */}
      {/* Top announcement bar — live height is exactly the button height
          (51px): the row carries no vertical padding of its own, so py-0
          here (an earlier py-2 added 16px the original does not have). */}
      <div className="hidden bg-[#8EC0EE] lg:block">
        <div className="gh-header-container flex items-center justify-between py-0 text-sm text-black">
          <p>
            Plan your visit by scheduling an appointment with our medical experts.{" "}
            <Link href="/about-us" className="font-medium hover:text-optional-two">
              Learn More <span aria-hidden="true">&#8594;</span>
            </Link>
          </p>
          <a
            href="tel:022-35347300"
            className="flex items-center bg-optional p-[15px] text-sm font-medium text-white hover:bg-black"
          >
            <i className="ti ti-calendar-plus mr-[10px] text-xl" aria-hidden="true" />
            Request An Appointment
          </a>
        </div>
      </div>

      {/* Small utility row — `.top-navbar-list li:last-child a{color:var(--optionalColor)}`
          gives the last item (Blog) a permanent blue color, not just on hover. */}
      <div className="hidden border-b border-[#EEEDF5]/50 bg-white text-sm text-black lg:block">
        <div className="gh-header-container flex items-center justify-end gap-10 py-5">
          {TOP_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={i === TOP_LINKS.length - 1 ? "text-optional hover:text-main" : "hover:text-main"}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* `.navbar .container-fluid` — same centered, stepped schedule as the
          top bar above (.gh-header-container): capped at 540/720/960/1140
          below 1400px, fluid only in the 1400-1599px gap, capped again at
          1920px from 1600px up. Confirmed identical to
          `.top-header-area .container-fluid` by direct comparison across
          every breakpoint in hospa-responsive.css.
          `.navbar .navbar-brand { padding-top:0; padding-bottom:0 }` and the
          navbar itself zeroes all padding (hospa-main.css 13377-13416) — the
          row's height is only the logo's displayed size — the live site renders
          the same 958x374 file at 210x82 (browser-measured 82px tall), so the
          row is ~82px tall, with no vertical padding stacked on top of it. An
          earlier py-3 here added 24px the original does not have. */}
      <div className="gh-header-container relative flex items-center justify-between py-0">
        <Link href="/" className="flex items-center gap-2 lg:-translate-y-1/2" aria-label="Gramy Hospital - home">
          <Image src="/images/theme/gramy-hospital.png" alt="Gramy Hospital" width={210} height={82} priority className="h-auto w-[210px]" />
        </Link>

        {/* `justify-between` on the row (kept unchanged, unmodified from the
            original) always pins its LAST child flush to the row's right
            edge, regardless of the other children's sizes — that's what has
            kept the Emergency button's position fixed through every attempt
            below. A fixed-pixel margin-left on <nav> doesn't work as a
            "move it right" control here: (a) space-between silently absorbs
            roughly half of any margin added to a middle item, and (b) even
            accounting for that, a single fixed px value can't be correct at
            every container tier — .gh-header-container ranges from a 960px
            cap at the 992-1199px viewport tier up to 1920px at 1600px+, so a
            value tuned for one tier overflows badly at a narrower one (it
            pushed Emergency half off-screen at 1024px).
            Fix: group <nav> and the Emergency button into one wrapper below,
            with a small constant gap-x between them. That wrapper — not
            <nav> alone — is now the row's actual last child, so it still
            gets pinned flush-right by justify-between exactly like Emergency
            did on its own before; Emergency's own final position is
            therefore byte-identical to the untouched original. The gap
            between nav and Emergency is a small fixed value, completely
            independent of container width, so it can never overflow at any
            breakpoint — there was always at least this much free space
            before (that space just used to sit between nav and Emergency
            as part of the large auto-computed space-between gap; nothing
            new is being invented, that same room is just being reused). */}
        <div className="hidden items-center gap-x-10 lg:flex">
        <nav className="hidden items-center gap-8 lg:flex">
          {/* `.nav-item.active .nav-link { color: var(--mainColor) }` in the
              original — "Home" carries `current-menu-item active` on the
              live homepage, confirmed via the user's screenshot. */}
          <Link
            href="/"
            className={`text-[14.5px] font-medium hover:text-main ${isHome ? "text-main" : "text-black"}`}
          >
            Home
          </Link>

          {/* No `relative` here on purpose: the mega-menu panel positions
              itself against the wide header row (which is `relative`) so its
              viewport-breakout math stays correct. This div only exists as
              the `group` hover scope — since the panel is a DOM child of it,
              hovering from the trigger into the panel never leaves the
              hoverable area, matching the original site's pure-CSS
              `.nav-item:hover .dropdown-menu` behavior (no JS timers/gaps). */}
          <div className="group">
            <button className="flex items-center gap-1 text-[14.5px] font-medium text-black hover:text-main">
              Specialities
              <span className="text-xs">▾</span>
            </button>

            <div className="invisible absolute left-1/2 top-full z-40 w-screen max-w-[1470px] -translate-x-1/2 translate-y-[18px] px-5 opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div
                className="grid grid-cols-3 gap-x-6 gap-y-2.5 bg-white p-5"
                style={{ borderRadius: 20, boxShadow: "0px 4px 70px 0px rgba(0,0,0,0.1)" }}
              >
                {specialityColumns.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-2.5">
                    {col.map((s) => (
                      <Link key={s.slug} href={`/specialists/${s.slug}`} className="gh-mega-item">
                        {s.title}
                        <span className="gh-mega-item__count">{s.count}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {dropdown("imiss", "iMiss", IMISS_LINKS)}
          {dropdown("special", "Special", SPECIAL_LINKS)}
          {dropdown("diagnostic", "Diagnostic", DIAGNOSTIC_LINKS)}
        </nav>

        {/* `.navbar .others-option .option-item .default-btn` in hospa-main.css
            overrides the generic solid default-btn to an outline style here:
            white fill, optionalColorTwo (red) text + 1px border, solid red
            on hover — confirmed against the live site's screenshot. */}
        <div className="hidden lg:block">
          <a
            href="tel:022-35347300"
            className="default-btn !border !border-optional-two !bg-white !text-optional-two hover:!bg-optional-two hover:!text-white"
          >
            <i className="ti ti-alarm-plus-filled" aria-hidden="true" />
            Emergency
          </a>
        </div>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-black" />
          <span className="block h-0.5 w-6 bg-black" />
          <span className="block h-0.5 w-6 bg-black" />
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-gray-100 bg-white px-4 pb-6 lg:hidden">
          <ul className="flex flex-col gap-1 py-2">
            <li>
              <Link href="/" className="block py-2 font-medium text-black" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
          </ul>

          {[
            { label: "Specialities", links: specialityItems.map((s) => ({ label: s.title, href: `/specialists/${s.slug}` })) },
            { label: "iMiss", links: IMISS_LINKS },
            { label: "Special", links: SPECIAL_LINKS },
            { label: "Diagnostic", links: DIAGNOSTIC_LINKS },
          ].map((group) => (
            <div key={group.label}>
              <p className="mt-3 mb-1 text-xs font-semibold uppercase text-gray-400">{group.label}</p>
              <ul className="grid grid-cols-1 gap-1">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block py-1 text-sm text-paragraph"
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="mt-3 mb-1 text-xs font-semibold uppercase text-gray-400">More</p>
          <ul className="grid grid-cols-2 gap-1">
            {TOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-1 text-sm text-paragraph" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <a href="tel:022-35347300" className="default-btn mt-4 inline-flex !bg-optional-two">
            <i className="ti ti-alarm-plus-filled" aria-hidden="true" />
            Emergency
          </a>
        </div>
      )}
    </header>
  );
}
