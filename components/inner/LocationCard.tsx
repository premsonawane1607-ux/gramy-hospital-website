import type { HospitalLocation } from "@/lib/hospital-info";

// Live `.find-location-content .location-inner .box`, CSS verbatim from
// hospa-main.css/hospa-responsive.css. The live 125px image cap targets a
// misspelled `.box .let .image img` selector, so it never applies: the
// 1280x960 photo is only bounded by `max-width:100%` and flex-shrinks into
// whatever the 175px-max address column and the 45px arrow leave over.
export function LocationBox({ location }: { location: HospitalLocation }) {
  return (
    <div
      data-a="loc-box"
      className="mb-[15px] flex items-center justify-between rounded-[20px] border border-[#E1E6EB] p-[15px] last:mb-0 max-[767px]:block max-[767px]:p-[10px]"
    >
      <div className="flex items-center max-[767px]:block">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={location.image.src}
            width={location.image.width}
            height={location.image.height}
            alt="Image"
            className="inline h-auto max-w-full align-middle min-[992px]:max-[1199px]:max-w-[105px]"
          />
        </div>
        <div className="ml-[20px] max-[767px]:ml-0 max-[767px]:mt-[20px]">
          <span data-a="loc-city" className="mb-[10px] block text-[12px] leading-[18px] text-[#687390]">
            {location.city}
          </span>
          <h3 className="mb-[10px] text-[18px] font-bold leading-[1.2]">{location.name}</h3>
          <p className="mb-0 max-w-[175px] text-[#687390]">{location.address}</p>
        </div>
      </div>
      <div className="text-end max-[767px]:mt-[15px]">
        <div>
          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${location.name}`}
          >
            <i
              data-a="loc-arrow"
              className="ti ti-arrow-right inline-block h-[45px] w-[45px] rounded-[50px] bg-[#8EC0EE] text-center text-[20px] !leading-[45px] text-black transition-colors duration-[600ms] hover:bg-main hover:text-white"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
