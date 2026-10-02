import Link from "next/link";

interface CTAAction {
  label: string;
  href: string;
}

// Same treatment as the homepage `HospaHealthcare_Area` band
// (HealthcareSolutionSection): photo background under a blackColor gradient,
// 30px radius, 100/50/30px padding, red sub label, white 42px/30px h2 with an
// 800-weight <b>, and the inverted optionalColor -> mainColor button.
export default function CTASection({
  sub,
  titleLead,
  titleBold,
  body,
  image = "/images/site/newimg33.jpeg",
  primary,
  secondary,
}: {
  sub: string;
  titleLead: string;
  titleBold: string;
  body?: string;
  image?: string;
  primary: CTAAction;
  secondary?: CTAAction;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[30px] bg-cover bg-center p-[30px] min-[768px]:p-[50px] min-[1200px]:p-[100px]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(-90deg, rgba(2,13,43,0.2) 0%, #020D2B 100%)" }}
      />
      <div className="relative z-10 max-w-[480px]">
        <span className="mb-[12px] block text-[10px] font-bold tracking-[1.2px] text-optional-two min-[1200px]:mb-[15px] min-[1200px]:text-xs">
          {sub}
        </span>
        <h2 className="mb-[20px] text-[30px] text-white min-[1200px]:text-[42px]">
          {titleLead} <b className="font-extrabold">{titleBold}</b>
        </h2>
        {body && <p className="mb-[30px] text-white/80">{body}</p>}
        <div className="flex flex-wrap gap-[15px]">
          <Link href={primary.href} className="default-btn !bg-optional hover:!bg-main">
            <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
            {primary.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className="default-btn !bg-white !text-black hover:!bg-main hover:!text-white">
              <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
