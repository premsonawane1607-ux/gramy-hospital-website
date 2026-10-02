import "./specialist-live.css";
import PageBannerArea, { type BannerInfo } from "./inner/PageBannerArea";
import RichText from "./RichText";
import { DoctorSlider, DoctorStaticGrid } from "./SpecialistDoctors";
import SpecialistSidebar from "./SpecialistSidebar";
import SpecialistCommentForm from "./SpecialistCommentForm";
import type { LiveBlock, LivePage } from "@/lib/types";

// Every specialist / condition / diagnostic-service inner page, rendered from
// data/specialist-live.json — a 1:1 capture of the page's CURRENT live
// Elementor stack on gramyhospital.com:
//
//   .page-banner-area            photo banner (or box only on older pages)
//   .services-details-area       ptb-100, 1320px boxed container
//     .services-details-desc     67% article column: the page's own ordered
//                                text / image / doctor / question widgets
//     sidebar column             33%: services list + Get Directions
//
// Nothing here is derived per template: widget order, images and their
// position in the article, which doctor widget a page uses (auto carousel,
// static grid, or none), whether the question form exists, the sidebar list
// and which side the sidebar sits on all come from the page's live markup,
// so the per-page differences on the live site are preserved. Widgets the
// live site hides (elementor-hidden-*) are not in the data. `data-wid`
// carries the live Elementor widget id of each block.
function Block({ block }: { block: LiveBlock }) {
  switch (block.type) {
    case "text":
      return (
        <div data-wid={block.id} data-wtype="text" className="gh-w gh-rich">
          <RichText nodes={block.nodes} />
        </div>
      );
    case "image":
      return (
        <div
          data-wid={block.id}
          data-wtype="image"
          className={`gh-w gh-w--image${block.wide ? " gh-w--wide" : ""}${block.src ? "" : " gh-w--image-missing"}`}
        >
          {block.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.src} width={block.width ?? undefined} height={block.height ?? undefined} alt={block.alt} />
          )}
        </div>
      );
    case "doctors":
      return <DoctorSlider id={block.id} heading={block.heading} doctors={block.doctors} loop={block.loop} />;
    case "docgrid":
      return (
        <DoctorStaticGrid
          id={block.id}
          heading={block.heading}
          headingWeight={block.headingWeight}
          doctors={block.doctors}
        />
      );
    case "list":
      return (
        <div data-wid={block.id} data-wtype="list" className="gh-w">
          <div data-a="la">
            <ul className="gh-checklist">
              {block.items.map((item) => (
                <li key={item}>
                  <i className="ti ti-checks" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "form":
      return <SpecialistCommentForm id={block.id} website={block.website} />;
    case "question":
      return (
        <div data-wid={block.id} data-wtype="question">
          <div className="gh-question gh-sda__wrap !p-0">
            {block.blocks.map((b) => (
              <Block key={b.id} block={b} />
            ))}
          </div>
        </div>
      );
  }
}

export default function ConditionPage({ page }: { page: LivePage }) {
  const article = (
    <div key="desc" data-a="col-desc" className="gh-sda__col gh-sda__col--desc">
      <div className="gh-sda__wrap">
        {page.blocks.map((b) => (
          <Block key={b.id} block={b} />
        ))}
      </div>
    </div>
  );
  const sidebar = (
    <div key="side" className="gh-sda__col gh-sda__col--side">
      <div className="gh-sda__wrap">
        <SpecialistSidebar sidebar={page.sidebar} />
      </div>
    </div>
  );

  return (
    <>
      <PageBannerArea
        title={<RichText nodes={page.banner.h1} />}
        breadcrumb={page.banner.breadcrumb.slice(1)}
        image={page.banner.image}
        info={page.banner.info as BannerInfo[]}
      />
      <div data-a="area" className="gh-sda">
        <div className="gh-sda__container">{page.sidebarFirst ? [sidebar, article] : [article, sidebar]}</div>
      </div>
    </>
  );
}
