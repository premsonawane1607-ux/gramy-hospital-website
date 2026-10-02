import { notFound } from "next/navigation";
import DoctorTestimonials from "@/components/DoctorTestimonials";
import { getDoctor, listDoctors } from "@/lib/content";
import { localImage } from "@/lib/images";

export function generateStaticParams() {
  return listDoctors().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getDoctor(params.slug);
  return { title: d ? `${d.name} – Gramy Hospital` : "Gramy Hospital" };
}

const INFO_ORDER = ["qualifications", "experience", "phone", "location", "affiliated hospitals", "memberships"];
const INFO_ICONS: Record<string, string> = {
  qualifications: "ti-files",
  experience: "ti-medal",
  phone: "ti-phone-call",
  location: "ti-map-pin",
  "affiliated hospitals": "ti-building",
  memberships: "ti-user",
};

// A stray leading space before a period/comma is a leftover from stripping
// `<strong>` tags out of the original "About" copy during data extraction
// (e.g. "24 years of clinical practice ."); harmless to clean up at render
// time for every doctor rather than only the ones someone happens to spot.
function cleanText(s: string) {
  return s.replace(/\s+([.,])/g, "$1");
}

// `.doctor-details-area.pb-100.container-fluid` — verified against the live
// site's raw HTML/CSS (all 32 doctors-post pages share one Elementor
// template): full-width fluid container (30px gutters, capped 540/720/960/
// 1140 below 1400px, 100px gutters capped 1920px at 1400–1500px), 25%/75%
// photo/content columns that stack below 1025px. The photo column is sticky
// (desktop only). Top-content is the light-gray info card; "AREAS OF
// EXPERTISE" reuses the mint `.doctor-details-sidebar` box style per item in
// a 4-column grid; "About" is the peach `.doctor-details-desc .content` box.
// Live has NO page banner on doctor pages — content starts directly under
// the header with the section's own 30px top padding. The category spans
// under the tags line are `display:none` on live, so they aren't rendered.
// The social share box is omitted when a doctor has no social links (all 32).
// The phone row links via `tel:` with only the "+91 " prefix stripped
// (spaces kept — live-verbatim, e.g. `tel:22 1234 5678`); "Book An
// Appointment" goes to /book-an-appointment/ with `.default-btn` red
// (`optional-two`) by default, mainColor on hover, per
// `.doctor-details-top-content .default-btn`.
export default function DoctorPage({ params }: { params: { slug: string } }) {
  const d = getDoctor(params.slug);
  if (!d) notFound();

  // Local /public copy when downloaded, otherwise the live URL itself (only
  // DR.-RAFIQUE-ULLAH-KHAN.jpeg is missing locally) — plain <img> like the
  // original's `img.post-img`, natural intrinsic sizing, 20px radius.
  const img = localImage(d.img) ?? d.img;

  return (
    <>
      <section className="gh-header-container pb-[50px] pt-[30px] min-[768px]:pb-[100px]">
        <div className="grid grid-cols-1 gap-y-[25px] min-[1025px]:grid-cols-[25%_75%] min-[1025px]:gap-x-[30px]">
          <div className="min-[1025px]:sticky min-[1025px]:top-[165px] min-[1025px]:self-start">
            <div className="overflow-hidden rounded-[20px]">
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt={d.name} className="h-auto w-full rounded-[20px]" />
              )}
            </div>
          </div>
          <div>
            <div className="relative rounded-[20px] bg-[#E9EEF2] p-[25px] min-[768px]:max-[991px]:p-[30px] min-[1200px]:max-[1399px]:p-[30px] min-[1400px]:p-[45px]">
              <div className="mb-[25px] min-[1200px]:pr-[200px]">
                <h2 className="text-[25px] font-extrabold text-black min-[768px]:text-[30px]">{d.name}</h2>
                <span className="mt-[10px] block text-[15px] text-main min-[768px]:mt-3 min-[768px]:text-[18px]">
                  {d.tags_line}
                </span>
              </div>
              <ul className="mb-[25px] flex flex-col">
                {INFO_ORDER.filter((k) => d.info[k]).map((k) => (
                  <li key={k} className="mb-5 flex items-center last:mb-0">
                    <i
                      className={`ti ${INFO_ICONS[k]} flex h-[33px] w-[33px] flex-none items-center justify-center rounded-full bg-white text-lg text-optional`}
                      aria-hidden="true"
                    />
                    <span className="ml-[10px] text-sm text-paragraph">
                      <strong className="font-semibold capitalize text-black">{k}:</strong>{" "}
                      {k === "phone" ? (
                        <a
                          href={`tel:${d.info[k].replace(/^\+91\s+/, "")}`}
                          className="transition hover:text-main"
                        >
                          {d.info[k]}
                        </a>
                      ) : (
                        d.info[k]
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="/book-an-appointment/" className="default-btn !bg-optional-two hover:!bg-main">
                <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
                Book An Appointment
              </a>
              {/* Purple share box — absolutely positioned top-right on desktop
                  (the title's 200px right padding reserves its room), in-flow
                  below the button on mobile. Rendered only for doctors with
                  social links on the original page. */}
              {d.socials && d.socials.length > 0 && (
                <ul className="mb-0 mt-[20px] table p-0 min-[768px]:absolute min-[768px]:right-[45px] min-[768px]:top-[45px] min-[768px]:mt-0 min-[768px]:flex min-[768px]:items-center min-[768px]:rounded-full min-[768px]:bg-main min-[768px]:p-[5px_7px]">
                  {d.socials.map((s) => (
                    <li key={s.href} className="mr-[5px] inline-flex last:mr-0">
                      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                        <i
                          className={`ti ${s.icon} inline-block h-[35px] w-[35px] rounded-full text-center text-[17px] leading-[35px] text-white transition hover:bg-white hover:text-optional`}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {d.expertise.length > 0 && (
              <>
                <h3 className="mb-[25px] mt-[45px] text-[20px] first:mt-0 min-[768px]:text-[25px]">
                  AREAS OF EXPERTISE
                </h3>
                <div className="grid grid-cols-1 gap-[10px] min-[1025px]:grid-cols-4">
                  {d.expertise.map((e, i) => (
                    <div key={i} className="rounded-[20px] bg-[#D7ECE4] p-[25px] text-center min-[768px]:max-[991px]:p-[30px] min-[1200px]:max-[1399px]:p-[20px] min-[1400px]:p-[30px]">
                      <h5 className="text-[17px] font-medium text-black">{e}</h5>
                    </div>
                  ))}
                </div>
              </>
            )}

            {d.about.length > 0 && (
              <div className="mb-[25px] mt-[25px] rounded-[20px] bg-[#F2DDD9] p-[25px] min-[768px]:max-[991px]:p-[30px] min-[1400px]:p-[45px]">
                <h3 className="mb-3 text-[22px] min-[768px]:mb-[15px] min-[768px]:text-[25px]">About</h3>
                {d.about.map((p, i) => (
                  <p key={i} className="mb-4 text-paragraph last:mb-0">
                    {cleanText(p)}
                  </p>
                ))}
              </div>
            )}

            {d.testimonials && d.testimonials.length > 0 && (
              <DoctorTestimonials
                items={d.testimonials.map((t) => ({ ...t, img: localImage(t.img) ?? t.img }))}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
