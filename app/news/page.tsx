import type { Metadata } from "next";
import NewsGallery from "@/components/NewsGallery";
import SpecialistBanner from "@/components/SpecialistBanner";
import { localImage } from "@/lib/images";

export const metadata: Metadata = { title: "News – Gramy Hospital" };

// The live `/news/` page is a plain WordPress `[gallery]` shortcode
// (`gallery-columns-3`, 6 newspaper-clipping images, 25px gutters via the
// classic negative-margin trick) inside the same `.page-banner-area` /
// `.page-banner-inner.without-image` banner every specialist page uses —
// confirmed by fetching the live page directly (there is no per-thumbnail
// carousel/arrows on the live site itself, just a click-to-open lightbox).
// This bypasses the generic `/[slug]` catch-all (which was rendering a
// completely different, unrelated `PageBanner` + 2-3 col grid) since a
// static route always wins over the dynamic catch-all in Next.js.
const IMAGES = [
  "https://gramyhospital.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-8.19.41-AM-612x518.jpeg",
  "https://gramyhospital.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-8.19.42-AM-1-e1788173557778-612x518.jpeg",
  "https://gramyhospital.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-8.19.42-AM-e1788173581416-612x518.jpeg",
  "https://gramyhospital.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-8.19.43-AM-1-e1788173604947-612x518.jpeg",
  "https://gramyhospital.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-8.19.43-AM-e1788173624562-612x518.jpeg",
  "https://gramyhospital.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-8.19.44-AM-e1788173646688-612x518.jpeg",
];

export default function NewsPage() {
  const images = IMAGES.map((u) => localImage(u)).filter((u): u is string => !!u);
  return (
    <>
      <SpecialistBanner title="News" />
      <section className="py-[50px] min-[768px]:py-[100px]">
        <div className="gh-specialist-container">
          <NewsGallery images={images} />
        </div>
      </section>
    </>
  );
}
