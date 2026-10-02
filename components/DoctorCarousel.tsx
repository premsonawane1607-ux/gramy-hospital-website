"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LiveDoctor } from "@/lib/types";

// Live `.ser-doctor-slider` Owl Carousel, as initialised on every
// specialist/condition page:
//   autoplay:true (5000ms), margin:50, nav:true, dots:false, smartSpeed:1000,
//   autoplayHoverPause:true, responsive 1 card <768px / 2 at 768-991px / 3 from
//   992px, and a per-page `loop` (true on six pages, false elsewhere).
// Behaviour verified on the live pages:
// - loop:true keeps sliding forever, even when every doctor already fits;
// - loop:false advances until the last card is in view, then stays there,
//   and never moves when all doctors fit;
// - the prev/next arrows only exist when there are more doctors than visible
//   cards, and loop:false disables the one that cannot move.
const AUTOPLAY_MS = 5000;
const SPEED_MS = 1000;
const GAP_PX = 50;

function perViewForWidth(w: number): number {
  if (w >= 992) return 3;
  if (w >= 768) return 2;
  return 1;
}

function DoctorCard({ d }: { d: LiveDoctor }) {
  const name = d.href ? (
    d.external ? (
      <a href={d.href} target="_blank" rel="noopener noreferrer">
        {d.name}
      </a>
    ) : (
      <Link href={d.href}>{d.name}</Link>
    )
  ) : (
    d.name
  );
  const photo = d.img ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={d.img} width={d.imgWidth} height={d.imgHeight} alt="image" draggable={false} />
  ) : null;
  return (
    <div data-a="doc-card">
      <div className="gh-doccard__image">
        {d.href && !d.external ? (
          <Link href={d.href} tabIndex={-1} aria-hidden="true">
            {photo}
          </Link>
        ) : d.href ? (
          <a href={d.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
            {photo}
          </a>
        ) : (
          photo
        )}
        <div className="gh-doccard__btn">
          <a data-a="doc-btn" href="tel:02235347300" className="gh-live-btn">
            <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
            Book an appointment
          </a>
        </div>
      </div>
      <div className="gh-doccard__content">
        <h3>{name}</h3>
        <span data-a="doc-role">{d.designation}</span>
      </div>
    </div>
  );
}

export default function DoctorCarousel({ doctors, loop }: { doctors: LiveDoctor[]; loop: boolean }) {
  const n = doctors.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const [perView, setPerView] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const [index, setIndex] = useState(0); // position among the real slides (may run past the ends while looping)
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const clones = loop ? perView : 0;
  const maxIndex = Math.max(0, n - perView);
  const hasNav = n > perView;

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const pv = perViewForWidth(window.innerWidth);
    setPerView(pv);
    setItemWidth((el.clientWidth - GAP_PX * (pv - 1)) / pv);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Keep the position valid when the breakpoint changes.
  useEffect(() => {
    setAnimate(false);
    setIndex((i) => (loop ? ((i % n) + n) % n : Math.min(i, Math.max(0, n - perView))));
  }, [perView, loop, n]);

  const go = useCallback(
    (dir: 1 | -1) => {
      // Without transitions there is no transitionend to trigger the clone
      // jump, so wrap the looping position directly.
      setAnimate(!reducedMotion);
      setIndex((i) =>
        loop ? (reducedMotion ? (((i + dir) % n) + n) % n : i + dir) : Math.min(maxIndex, Math.max(0, i + dir)),
      );
    },
    [loop, maxIndex, reducedMotion, n],
  );

  useEffect(() => {
    if (paused || reducedMotion || n === 0) return;
    if (!loop && index >= maxIndex) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, loop, index, maxIndex, n, go]);

  // After sliding onto a clone, jump (without animation) to the matching real slide.
  const onTransitionEnd = () => {
    if (!loop) return;
    if (index >= n || index < 0) {
      setAnimate(false);
      setIndex(((index % n) + n) % n);
    }
  };

  if (n === 0) return null;

  const slides = loop
    ? [...Array.from({ length: clones }, (_, i) => doctors[(((n - clones + i) % n) + n) % n]), ...doctors, ...Array.from({ length: clones }, (_, i) => doctors[i % n])]
    : doctors;
  const step = itemWidth + GAP_PX;
  const offset = -(index + clones) * step;
  // Owl centres the stage (cards + their 50px trailing margins) when a
  // non-looping slider holds fewer doctors than fit.
  const centered = !loop && n < perView;

  return (
    <div
      className="gh-docslider__slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={viewportRef}
        className="overflow-hidden"
        onPointerDown={(e) => {
          dragStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragStart.current === null) return;
          const dx = e.clientX - dragStart.current;
          dragStart.current = null;
          if (Math.abs(dx) > 40 && (loop || hasNav)) go(dx < 0 ? 1 : -1);
        }}
        onPointerLeave={() => {
          dragStart.current = null;
        }}
      >
        <div
          className={centered ? "mx-auto flex w-fit" : "flex"}
          style={{
            transform: `translate3d(${itemWidth ? offset : 0}px, 0, 0)`,
            transition: animate && !reducedMotion ? `transform ${SPEED_MS}ms ease` : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((d, i) => (
            <div
              key={i}
              // Until measured (and without JS) the live 1/2/3-per-view widths come from CSS.
              className={
                itemWidth
                  ? "mr-[50px] flex-none"
                  : "mr-[50px] w-full flex-none min-[768px]:w-[calc((100%-50px)/2)] min-[992px]:w-[calc((100%-100px)/3)]"
              }
              style={itemWidth ? { width: `${itemWidth}px` } : undefined}
              aria-hidden={loop && (i < clones || i >= clones + n) ? true : undefined}
            >
              <DoctorCard d={d} />
            </div>
          ))}
        </div>
      </div>
      {hasNav && (
        <div className="gh-docslider__navwrap">
          <button
            type="button"
            aria-label="Previous doctors"
            disabled={!loop && index <= 0}
            onClick={() => go(-1)}
            className="gh-docslider__nav gh-docslider__nav--prev"
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next doctors"
            disabled={!loop && index >= maxIndex}
            onClick={() => go(1)}
            className="gh-docslider__nav gh-docslider__nav--next"
          >
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
