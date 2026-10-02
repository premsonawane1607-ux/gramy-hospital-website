"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { galleryCategories } from "@/lib/gallery-data";

export default function HospitalGallery({ heading }: { heading?: string } = {}) {
  const [activeCat, setActiveCat] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = galleryCategories[activeCat].images;

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  return (
    <section className="section-padding">
      <div className="container-default">
        {heading && (
          <div className="section-title mb-12 text-center">
            <h2>{heading}</h2>
          </div>
        )}
        <div className="mb-5 flex flex-wrap justify-center gap-6">
          {galleryCategories.map((cat, i) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActiveCat(i);
                setLightboxIndex(null);
              }}
              className={`relative px-1 pb-1 text-[15px] font-medium transition ${
                i === activeCat ? "text-black" : "text-[#6d7882] hover:text-black"
              }`}
            >
              {cat.label}
              {i === activeCat && <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#BB1212]" />}
            </button>
          ))}
        </div>

        {/* Fixed grid — 4 columns desktop (992px+, 5 rows for a 20-image
            category), 3 tablet (576-991px), 2 mobile — `.hospa-gallery-item`
            values from hospa-main.css:
            border-radius 7px, 25px row/column gap, 1.2x hover zoom. Flexbox
            with percentage basis (not CSS grid — grid-template-columns +
            next/image fill collapsed rows in headless verification), and
            the aspect box uses the padding-top percentage technique (not
            the `aspect-ratio` CSS property, which combined with flex-basis
            produced wildly wrong heights on some cells in that same check). */}
        <div className="flex flex-wrap gap-[25px]">
          {images.map((img, index) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group block flex-none basis-[calc(50%-12.5px)] overflow-hidden rounded-[7px] min-[576px]:basis-[calc(33.333%-16.67px)] min-[992px]:basis-[calc(25%-18.75px)]"
            >
              <div className="relative w-full pt-[66.6667%]">
                <Image
                  src={img.src}
                  alt=""
                  fill
                  loading="eager"
                  sizes="(min-width: 992px) 20vw, (min-width: 576px) 33vw, 50vw"
                  className="object-cover transition duration-[600ms] group-hover:scale-[1.2]"
                />
                <span className="absolute inset-0 bg-black/0 transition duration-[600ms] group-hover:bg-black/30" />
                <span className="ti ti-zoom-in absolute inset-0 flex items-center justify-center text-3xl text-white opacity-0 transition duration-[600ms] group-hover:opacity-100" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-xl text-white transition hover:bg-white/10"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition hover:bg-white/10 sm:left-6"
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i + 1) % images.length));
            }}
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition hover:bg-white/10 sm:right-6"
          >
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </button>

          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightboxIndex].src}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
}
