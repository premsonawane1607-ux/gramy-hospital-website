import Link from "next/link";
import { HOSPITAL } from "@/lib/hospital-info";
import { LIVE_BTN, LIVE_BTN_ICON } from "./live-styles";

export interface DoctorListing {
  slug: string;
  name: string;
  designation: string;
  img: string | null;
  experience?: string;
  location?: string;
  services: string[];
}

// Live /find-a-doctor/ `.doctor-card` (hospa-main.css): 25px bottom margin,
// natural-height photo with a 20px radius (no crop — only `max-width:100%`),
// the white/red "Book Appointment" pill pinned 15px from the photo's bottom,
// then a centred 18px/700 name linking to the profile and the designation
// 12px below.
export default function DoctorProfileCard({ doctor }: { doctor: DoctorListing }) {
  const href = `/doctors/${doctor.slug}`;
  return (
    <div data-a="fd-card" className="mb-[25px]">
      <div className="relative">
        <Link href={href}>
          {doctor.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={doctor.img} alt={doctor.name} className="block h-auto max-w-full rounded-[20px]" />
          ) : (
            <span className="block aspect-[3/4] w-full rounded-[20px] bg-[#E1E6EB]" />
          )}
        </Link>
        <div className="absolute inset-x-0 bottom-[15px] text-center">
          <a
            data-a="fd-btn"
            href={HOSPITAL.phoneHref}
            className={`${LIVE_BTN} border border-optional-two bg-white text-optional-two hover:bg-optional-two hover:text-white`}
          >
            <i className={`ti ti-circle-arrow-right-filled ${LIVE_BTN_ICON}`} aria-hidden="true" />
            Book Appointment
          </a>
        </div>
      </div>
      <div data-a="fd-content" className="pt-[25px] text-center">
        <h3 className="mb-0 text-[18px] font-bold leading-[1.2] text-black">
          <Link href={href} className="hover:text-main">
            {doctor.name}
          </Link>
        </h3>
        <span data-a="fd-role" className="mt-[12px] block text-paragraph">
          {doctor.designation}
        </span>
      </div>
    </div>
  );
}
