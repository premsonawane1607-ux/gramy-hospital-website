import { HOSPITAL } from "@/lib/hospital-info";

// Live `.patients-visitors-desc .inner-content .info-box` ("Need Assistance?"):
// #E9EEF2, 20px radius, 50px padding (20px mobile), 50px top margin, 25px h5
// (18px mobile), blackColor rows 20px apart, 32px white icon circles
// (optionalColor glyph, inverted on row hover), paragraph-colored links that
// turn mainColor on hover. Row text is verbatim from the live page.
const ROWS = [
  { icon: "ti-brand-whatsapp", label: "", text: HOSPITAL.whatsappLabel, href: HOSPITAL.whatsappHref, external: true },
  { icon: "ti-phone-call", label: "Phone: ", text: HOSPITAL.phoneLabel, href: HOSPITAL.phoneHref },
  { icon: "ti-mail", label: "Email: ", text: HOSPITAL.email, href: HOSPITAL.emailHref },
  { icon: "ti-map-pin", label: "Location: ", text: `${HOSPITAL.name}, ${HOSPITAL.address}` },
];

export default function ContactDetailsBox() {
  return (
    <div className="mt-[50px] rounded-[20px] bg-[#E9EEF2] p-[50px] max-[767px]:p-[20px]">
      <h5 className="mb-[25px] text-[25px] leading-[1.2] max-[767px]:text-[18px]">Need Assistance?</h5>
      <ul className="mb-0 px-0">
        <li className="mb-[20px] flex items-center text-black">
          <span>
            Our patient care team is available to assist you with appointments, admissions, visitor queries, and
            other hospital-related information.
          </span>
        </li>
        {ROWS.map((row) => (
          <li key={row.icon} className="group mb-[20px] flex items-center text-black last:mb-0">
            <div className="mr-[10px]">
              <i
                className={`ti ${row.icon} inline-block h-[32px] w-[32px] rounded-[50px] bg-white text-center text-[18px] !leading-[32px] text-optional transition-colors duration-[600ms] group-hover:bg-optional group-hover:text-white`}
                aria-hidden="true"
              />
            </div>
            <span>
              {row.label}
              {row.href ? (
                <a
                  href={row.href}
                  className="text-paragraph hover:text-main"
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {row.text}
                </a>
              ) : (
                row.text
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
