import { healthcareCta } from "@/lib/homepage-data";

// Matches the original `HospaHealthcare_Area` widget (`.solution-area >
// .container > .solution-inner` with a background-image + dark gradient
// overlay, `.content` capped at max-width:395px). CSS values taken directly
// from hospa-main.css/hospa-responsive.css: border-radius 30px, padding
// 100px desktop / 50px tablet+laptop / 30px mobile, h2 42px/30px mobile with
// a bold <b>, and a button that INVERTS the sitewide .default-btn colors
// (optionalColor by default, mainColor on hover — the opposite of every
// other default-btn on the site). The "HEALTHCARE SOLUTION" label is red
// (#F82828, the same "optional-two" token used for the header's Emergency
// button) on the live site, not the purple hospa-main.css's generic
// `.sub{color:var(--mainColor)}` rule would suggest — confirmed by sampling
// the user's screenshot pixel-for-pixel; the live site evidently overrides
// this one instance and the static snapshot's CSS didn't capture it.
export default function HealthcareSolutionSection() {
  return (
    <div className="container-default">
      <div
        className="relative overflow-hidden rounded-[30px] bg-cover bg-center p-[30px] min-[768px]:p-[50px] min-[1200px]:p-[100px]"
        style={{ backgroundImage: `url(${healthcareCta.image})` }}
      >
        {/* `-z-10` on this overlay was silently invisible: the parent div is
            `relative` but has no z-index of its own, so it never becomes an
            isolated stacking context, and a *negative* z-index child in that
            situation escapes to the nearest ancestor that does form one —
            which put the overlay behind the page's own white body background
            instead of just behind this section's content. Giving the content
            an explicit positive z-index instead is unambiguous: the overlay
            (no z-index, default painted first) can never render behind its
            own parent's background-image regardless of stacking context, and
            the content (z-10) is guaranteed above the overlay. */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(-90deg, rgba(2,13,43,0.2) 0%, #020D2B 100%)" }}
        />
        <div className="relative z-10 max-w-[395px]">
          <span className="mb-[12px] block text-[10px] font-bold tracking-[1.2px] text-optional-two min-[1200px]:mb-[15px] min-[1200px]:text-xs">
            {healthcareCta.sub}
          </span>
          <h2 className="mb-[30px] text-[30px] text-white min-[1200px]:text-[42px]">
            {healthcareCta.titleLead} <b className="font-extrabold">{healthcareCta.titleBold}</b>
          </h2>
          <a
            href={`tel:${healthcareCta.phone.replace(/-/g, "")}`}
            className="default-btn !bg-optional hover:!bg-main"
          >
            <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
}
