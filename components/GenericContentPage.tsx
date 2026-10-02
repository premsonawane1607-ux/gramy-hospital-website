import Image from "next/image";
import PageBanner from "./PageBanner";
import ContentBlocks from "./ContentBlocks";
import DoctorGrid from "./DoctorGrid";
import PageSidebar from "./PageSidebar";
import { localImage } from "@/lib/images";
import type { GenericPageEntry } from "@/lib/types";

export default function GenericContentPage({
  entry,
  doctorsHeading,
  showSidebar = false,
  currentHref,
}: {
  entry: GenericPageEntry;
  doctorsHeading?: string;
  showSidebar?: boolean;
  currentHref?: string;
}) {
  const title = entry.title ?? entry.slug;
  const hero = localImage(entry.hero_img);
  const galleryImages = (entry.images ?? []).map((u) => localImage(u)).filter((u): u is string => !!u);
  const hasContent = !!hero || entry.body_nodes.length > 0 || galleryImages.length > 0 || entry.doctor_cards.length > 0;
  const heading = doctorsHeading ?? `Available Doctors Under ${title}`;

  const content = (
    <>
      {hero && (
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-card">
          <Image src={hero} alt={title} fill className="object-cover" />
        </div>
      )}
      <ContentBlocks nodes={entry.body_nodes} />
      {galleryImages.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image src={src} alt={title} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
      {!hasContent && (
        <p className="italic text-gray-500">
          This page is interactive/dynamic on the live site (a form, account, or cart flow) and has no static
          content to reproduce here. See the{" "}
          <a href="tel:022-35347300" className="text-main underline">
            phone contact
          </a>{" "}
          options instead.
        </p>
      )}
    </>
  );

  return (
    <>
      <PageBanner title={title} />
      <section className="section-padding">
        <div className="container-default">
          {showSidebar ? (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
              <div className="mx-auto w-full max-w-4xl lg:mx-0">{content}</div>
              <PageSidebar currentHref={currentHref} />
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">{content}</div>
          )}
        </div>
      </section>
      <DoctorGrid doctors={entry.doctor_cards} heading={heading} />
    </>
  );
}
