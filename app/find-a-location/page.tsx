import type { Metadata } from "next";
import PageBannerArea from "@/components/inner/PageBannerArea";
import LocationFinder from "@/components/inner/LocationFinder";
import { BS_CONTAINER, PTB_100 } from "@/components/inner/live-styles";
import { LOCATIONS } from "@/lib/hospital-info";

export const metadata: Metadata = { title: "Our Locations – Gramy Hospital" };

// Live /find-a-location/: page banner, then the `HospaLocationCard` widget's
// `.find-location-area.ptb-100` (section title, search form, list + map row,
// bouncing `.find-location-shape`) directly followed by the footer.
export default function OurLocationsPage() {
  return (
    <>
      <PageBannerArea
        title={
          <>
            Our <b>Locations</b>
          </>
        }
        breadcrumb="Our Locations"
        image={{ src: "/images/site/bg20.jpg", width: 1728, height: 316 }}
      />
      <div data-a="loc-area" className={`relative z-[1] ${PTB_100}`}>
        <div className={BS_CONTAINER}>
          <div className="mx-auto mb-[40px] max-w-[635px] text-center">
            <span className="mb-[12px] block text-[12px] font-bold leading-[18px] tracking-[1.2px] text-optional max-[767px]:mb-[10px] max-[767px]:text-[10px] max-[767px]:leading-[15px]">
              FIND A LOCATION
            </span>
            <h2 className="mb-0 text-[42px] leading-[1.3] max-[767px]:text-[28px] [&_b]:font-extrabold">
              Find Your <b>Nearest</b> Location
            </h2>
          </div>
          <LocationFinder locations={LOCATIONS} />
        </div>
        <div className="absolute right-[10%] top-[15%] z-[-1] -translate-x-[10%] -translate-y-[15%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/site/shape-5.png" width={75} height={77} alt="shape" className="gh-shape-bounce" />
        </div>
      </div>
    </>
  );
}
