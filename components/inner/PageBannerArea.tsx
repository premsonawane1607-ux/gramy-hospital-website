import type { ReactNode } from "react";
import Link from "next/link";
import { HOSPITAL } from "@/lib/hospital-info";
import { BS_COL, BS_ROW } from "./live-styles";
import PrintButton from "./PrintButton";

export type BannerInfo = "whatsapp" | "print" | "mail";

// The live `.page-banner-area` (hospa-main.css + hospa-responsive.css,
// `hospa-toolkit-activate` padding): natural-ratio photo centred by the live
// wp-custom-css (`.page-banner-image{display:flex;justify-content:center}`),
// then the #E9EEF2 box (50/55/50/75px padding, -15px overlap at 1200-1500px,
// -75px outside that range; 35px/45px/30x25px padding and +15/+15/+10px offset
// below 1200px) holding a col-lg-8 title/breadcrumb and a col-lg-4 call pill +
// info pill. Most live pages carry a WhatsApp-only info pill (the email item
// is commented out); the services-post template still shows print + mail.
// Pages without a banner photo render only the box (`.without-image`).
export default function PageBannerArea({
  title,
  breadcrumb,
  image,
  info = ["whatsapp"],
  callLabel = true,
}: {
  /** h1 content; bold parts as <b> (live h1 <b> renders at `bolder` = 700). */
  title: ReactNode;
  /** Trail after "Home": a single label, or items (linked ones before the last). */
  breadcrumb: string | { text: string; href: string | null }[];
  image: { src: string; width: number; height: number } | null;
  info?: readonly BannerInfo[];
  /** The live single-post banner prints the phone number without the "CALL:" prefix. */
  callLabel?: boolean;
}) {
  const trail = typeof breadcrumb === "string" ? [{ text: breadcrumb, href: null }] : breadcrumb;
  const crumb =
    "relative text-[12px] leading-[18px] tracking-[1.2px] [&:not(:last-child)]:mr-[30px] [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:right-[-20px] [&:not(:last-child)]:before:top-1/2 [&:not(:last-child)]:before:-translate-y-1/2 [&:not(:last-child)]:before:text-paragraph [&:not(:last-child)]:before:content-['>']";
  // The live theme sets `word-break: break-word` on the crumb items, which only
  // shows when a trail is too long for the row (they then shrink and wrap
  // mid-word). In this project that is the multi-level service trails, so it
  // is limited to those and every single-level banner renders as before.
  const crumbBreak = trail.length > 1 ? " [word-break:break-word]" : "";
  const crumbLink = "font-medium text-optional hover:text-main";
  const infoIcon = "text-[20px] text-white transition-colors duration-[600ms] hover:text-optional";
  return (
    // Live body text stays 16px on mobile (globals.css drops it to 15px).
    <div data-a="banner-area" className="relative z-[11] pt-[30px] max-[767px]:text-[16px]">
      <div className="gh-header-container">
        {image && (
          <div className="flex flex-nowrap content-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-a="banner-img"
              src={image.src}
              width={image.width}
              height={image.height}
              alt="banner img"
              className="inline h-auto max-w-full rounded-[20px] align-middle"
            />
          </div>
        )}
        <div
          data-a="banner-box"
          className="relative mx-auto mt-[-75px] max-w-[1410px] rounded-[20px] bg-[#E9EEF2] pb-[50px] pl-[75px] pr-[55px] pt-[50px] max-[767px]:mt-[10px] max-[767px]:px-[25px] max-[767px]:py-[30px] min-[768px]:max-[991px]:mt-[15px] min-[768px]:max-[991px]:p-[45px] min-[992px]:max-[1199px]:mt-[15px] min-[992px]:max-[1199px]:p-[35px] min-[1200px]:max-[1500px]:mt-[-15px] min-[1600px]:max-w-[1630px]"
        >
          <div className={`${BS_ROW} items-center justify-center`}>
            <div className={`${BS_COL} min-[992px]:w-2/3`}>
              <h1
                data-a="h1"
                className="mb-[8px] text-[calc(1.375rem+1.5vw)] font-medium leading-[1.2] min-[1200px]:text-[2.5rem] [&_b]:font-bold"
              >
                {title}
              </h1>
              <ul className="flex">
                <li className={crumb + crumbBreak}>
                  <Link href="/" className={crumbLink}>
                    Home
                  </Link>
                </li>
                {trail.map((t, i) => (
                  <li key={i} className={crumb + crumbBreak} {...(i === trail.length - 1 ? { "data-a": "crumb" } : {})}>
                    {t.href ? (
                      <Link href={t.href} className={crumbLink}>
                        {t.text}
                      </Link>
                    ) : (
                      t.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${BS_COL} min-[992px]:w-1/3`}>
              <ul className="mb-0 text-end max-[991px]:mt-[25px] max-[991px]:text-start max-[767px]:mt-[15px]">
                <li className="mb-[15px]">
                  <div
                    data-a="banner-call"
                    className="group inline-flex items-center rounded-[50px] bg-white py-[5px] pl-[5px] pr-[25px]"
                  >
                    <div className="mr-[15px] max-[767px]:mr-[10px]">
                      <i className="ti ti-phone-call inline-block h-[40px] w-[40px] rounded-[50px] bg-optional-three text-center text-[22px] !leading-[40px] text-white transition-colors duration-[600ms] group-hover:bg-optional max-[767px]:h-[30px] max-[767px]:w-[30px] max-[767px]:text-[18px] max-[767px]:!leading-[30px]" />
                    </div>
                    <span className="text-[16px] tracking-[1.28px] text-[#2C7559] max-[767px]:text-[12px] min-[992px]:max-[1199px]:text-[14px]">
                      {callLabel && <>CALL: </>}
                      <a href={HOSPITAL.phoneHref} className="font-extrabold text-[#2C7559] hover:text-optional">
                        {HOSPITAL.phoneLabel}
                      </a>
                    </span>
                  </div>
                </li>
                <li className="mb-0">
                  <ul
                    data-a="banner-info"
                    className="mb-0 inline-flex items-center justify-end rounded-[30px] bg-main px-[22px] py-[10px] leading-none"
                  >
                    {info.map((kind) => (
                      <li key={kind} className="mb-0 [&:not(:last-child)]:mr-[22px]">
                        {kind === "whatsapp" && (
                          <a
                            href={HOSPITAL.whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat with Gramy Hospital on WhatsApp"
                            className="inline-block leading-none"
                          >
                            <i className={`ti ti-brand-whatsapp ${infoIcon}`} />
                          </a>
                        )}
                        {kind === "print" && <PrintButton className={infoIcon} />}
                        {kind === "mail" && (
                          <a href={HOSPITAL.emailHref} aria-label="Email Gramy Hospital" className="inline-block leading-none">
                            <i className={`ti ti-mail-opened ${infoIcon}`} />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
