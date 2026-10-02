import Image from "next/image";
import { appSection } from "@/lib/homepage-data";

export default function AppSection() {
  return (
    <section className="section-padding bg-white pt-0">
      <div className="container-default">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card">
            <Image src={appSection.image} alt="Gramy Hospital mobile app" fill className="object-cover" />
          </div>

          <div>
            <span className="section-title sub !mx-0 !max-w-none !text-left">{appSection.sub}</span>
            <h2 className="mt-2 max-w-xl">
              {appSection.titleLead} <b className="font-extrabold">{appSection.titleBold}</b>
            </h2>

            <div className="mt-6 flex items-center gap-4">
              <Image src={appSection.statIcon} alt="" width={44} height={44} className="rounded-full" />
              <div>
                <h5 className="text-base font-bold text-black">{appSection.statTitle}</h5>
                <span className="text-sm text-paragraph">{appSection.statDescription}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {appSection.buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className="flex items-center gap-3 rounded-full border border-black/10 py-2 pl-3 pr-6 transition hover:border-main"
                >
                  <i className={`ti ${btn.icon} text-2xl text-black`} aria-hidden="true" />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[11px] uppercase tracking-wide text-paragraph">{btn.eyebrow}</span>
                    <span className="text-sm font-bold text-black">{btn.label}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
