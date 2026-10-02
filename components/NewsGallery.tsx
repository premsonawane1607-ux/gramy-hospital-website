"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// `.gallery-item{padding:0 25px 25px 0}` / `.gallery{margin:0 -25px -25px 0}`
// — the classic WordPress gallery negative-margin gutter trick, reproduced
// here as a plain flex-wrap grid with a 25px gap instead (same visual
// result). `gallery-columns-3` → 3 per row at desktop, 2 at mobile isn't
// specified separately by WordPress (its own responsive CSS collapses to
// fewer columns below ~600px) so this follows the same 2/3-column pattern
// used elsewhere on the site (e.g. HospitalGallery).
export default function NewsGallery({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const resolved = images;

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % resolved.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + resolved.length) % resolved.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, resolved.length]);

  if (resolved.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-[25px]">
        {resolved.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group block flex-none basis-[calc(50%-12.5px)] overflow-hidden rounded-[10px] min-[768px]:basis-[calc(33.333%-16.67px)]"
          >
            <div className="relative w-full pt-[84.6405%]">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-[600ms] group-hover:scale-[1.05]"
              />
            </div>
          </button>
        ))}
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
              setLightboxIndex((i) => (i === null ? i : (i - 1 + resolved.length) % resolved.length));
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
              setLightboxIndex((i) => (i === null ? i : (i + 1) % resolved.length));
            }}
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition hover:bg-white/10 sm:right-6"
          >
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={resolved[lightboxIndex]} alt="" fill sizes="100vw" className="object-contain" priority />
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {lightboxIndex + 1} / {resolved.length}
          </span>
        </div>
      )}
    </>
  );
}
