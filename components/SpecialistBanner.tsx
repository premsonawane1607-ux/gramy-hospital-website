"use client";

import Image from "next/image";
import Link from "next/link";

// Matches the original site's `.page-banner-area` / `.page-banner-inner.without-image`
// widget used on every Specialist inner page (light gray-blue box, H1 + breadcrumb
// on the left, a phone pill on the right) — not the generic homepage PageBanner.
//
// Verified against the live site's raw HTML + hospa-main.css/hospa-responsive.css
// (a prior pass had approximated several of these values from the class NAME
// pattern rather than checking the actual markup):
//
// - The title is a plain `<h1>` with no class, NOT `.content h2`/`.h2` — so the
//   `.page-banner-inner .content h2{font-size:40px}` rule the component used to
//   target never actually applied to it. The real applicable rule is Bootstrap's
//   own bare `h1,.h1{font-size:calc(1.375rem+1.5vw)}`, locked to `2.5rem` only
//   from 1200px — fluid at EVERY width below that, not a hardcoded 25px step.
//   Same reasoning removes the 15px gap below the title (that belonged to the
//   `.content h2{margin-bottom:15px}` rule, which never applied either) — the
//   real gap is just the heading's own base 0.5rem/8px bottom margin.
// - `.page-banner-inner` itself has a genuine 4-tier padding/margin schedule
//   (≤767:"30px 25px"/mt:10px, 768-991:45px all sides/mt:15px, 992-1199:35px
//   all sides/mt:15px, 1200+:"75px 55px 75px 75px"/mt:-15px — yes, the box
//   pulls upward at desktop) plus a wider 1630px cap from 1600px, none of which
//   the previous flat px-[25px]/min-[576px]:p-[45px] schedule captured (wrong
//   breakpoint boundary too — 576px isn't one of the real steps, 768px is).
// - The outer `.page-banner-area .container-fluid` wrapper turns out to be the
//   exact same stepped container-fluid schedule already built for the header
//   (`.gh-header-container`) — reused here instead of a flat px-[30px].
// - The phone-pill icon is smaller on mobile (30px/18px icon, 10px margin) than
//   desktop (40px/22px icon, 15px margin), and its text sizes 12/16/14/16px at
//   the four tiers — the previous version only had a 2-step 12/16px split.
// - A second row below the phone pill (`.information li .info-list`, a
//   mainColor pill with print + email icon buttons) existed on the live page
//   but wasn't rendered at all — confirmed missing by direct screenshot
//   comparison against the live site. Its mailto link on the live site is a
//   literal `href="http://care@gramyhospital.com"` (wrong scheme, an evident
//   typo on the original site), corrected here to a working `mailto:` link
//   rather than reproduced as broken.
//
// Some pages (e.g. Contact Us) use the WITH-image variant instead: a plain
// `<img>` (just `img{max-width:100%;height:auto}` + `border-radius:20px`, no
// special positioning) sits above this same box, and the box's own
// `margin-top:-75px` at 1200px+ pulls it up to overlap the image's bottom
// edge — that negative margin already existed above for the imageless case,
// so passing `heroImage` needs no extra styling here. Those pages also bold
// only the FIRST word of the h1 (`<b>Contact</b> Us`) while the breadcrumb's
// copy of the title stays plain — `boldFirstWord` splits on the first space
// and bolds only that piece in the h1, leaving the breadcrumb `<li>` alone.
export default function SpecialistBanner({
  title,
  heroImage,
  boldFirstWord = false,
  boldLastWord = false,
}: {
  title: string;
  heroImage?: string | null;
  boldFirstWord?: boolean;
  /** Live `Find a <b>Doctor</b>` variant: bolds only the final word. */
  boldLastWord?: boolean;
}) {
  const spaceIndex = title.indexOf(" ");
  const lastSpaceIndex = title.lastIndexOf(" ");
  const titleNode =
    boldFirstWord && spaceIndex > -1 ? (
      <>
        <b className="font-extrabold">{title.slice(0, spaceIndex)}</b>
        {title.slice(spaceIndex)}
      </>
    ) : boldLastWord && lastSpaceIndex > -1 ? (
      <>
        {title.slice(0, lastSpaceIndex + 1)}
        <b className="font-extrabold">{title.slice(lastSpaceIndex + 1)}</b>
      </>
    ) : (
      title
    );

  return (
    <div className="pt-[30px]">
      <div className="gh-header-container">
        {heroImage && (
          <div className="relative aspect-[1728/316] w-full overflow-hidden rounded-[20px]">
            <Image src={heroImage} alt="" fill className="object-cover" priority />
          </div>
        )}
        <div className="mx-auto mt-[10px] max-w-[1410px] rounded-[20px] bg-[#E9EEF2] px-[25px] py-[30px] min-[768px]:mt-[15px] min-[768px]:p-[45px] min-[992px]:mt-[15px] min-[992px]:p-[35px] min-[1200px]:mt-[-15px] min-[1200px]:pb-[75px] min-[1200px]:pl-[75px] min-[1200px]:pr-[55px] min-[1200px]:pt-[75px] min-[1600px]:max-w-[1630px]">
          <div className="flex flex-col items-start justify-between gap-4 min-[992px]:flex-row min-[992px]:items-center">
            <div>
              <h1 className="mb-2 text-[calc(1.375rem+1.5vw)] font-medium text-black min-[1200px]:text-[2.5rem]">
                {titleNode}
              </h1>
              <ul className="flex flex-wrap">
                <li className="relative mr-[30px] text-xs tracking-[1.2px] after:absolute after:-right-[20px] after:top-1/2 after:-translate-y-1/2 after:text-paragraph after:content-['>']">
                  <Link href="/" className="font-medium text-optional hover:text-main">
                    Home
                  </Link>
                </li>
                <li className="text-xs tracking-[1.2px] text-paragraph">{title}</li>
              </ul>
            </div>
            <div className="min-[992px]:text-right">
              <a
                href="tel:022-35347300"
                className="group inline-flex items-center rounded-full bg-white py-[5px] pl-[5px] pr-[25px] transition"
              >
                <span className="mr-[10px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-optional-three text-white transition group-hover:bg-optional min-[768px]:mr-[15px] min-[768px]:h-10 min-[768px]:w-10">
                  <i className="ti ti-phone-call text-[18px] min-[768px]:text-[22px]" aria-hidden="true" />
                </span>
                <span className="text-xs tracking-[1.28px] text-[#2C7559] min-[768px]:text-base min-[992px]:text-sm min-[1200px]:text-base">
                  CALL: <span className="font-extrabold">+91 22-35347300</span>
                </span>
              </a>
              <div className="mt-[15px] inline-flex items-center justify-end rounded-[30px] bg-main px-[22px] py-[10px]">
                <button
                  type="button"
                  onClick={() => window.print()}
                  aria-label="Print this page"
                  className="mr-[22px] text-[20px] leading-none text-white transition hover:text-optional"
                >
                  <i className="ti ti-printer" aria-hidden="true" />
                </button>
                <a
                  href="mailto:care@gramyhospital.com"
                  aria-label="Email Gramy Hospital"
                  className="text-[20px] leading-none text-white transition hover:text-optional"
                >
                  <i className="ti ti-mail-opened" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
