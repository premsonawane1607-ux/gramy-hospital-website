"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Live `.ph-services-slider` Owl Carousel, as initialised on the About Us page:
//   loop:true, autoplay:true (3000ms), smartSpeed:1000, margin:25,
//   autoplayHoverPause:true, nav:false, dots:false, and 1 card below 768px,
//   2 at 768-991px, 4 from 992px.
// It renders Owl's own stage/item markup (classes prefixed `lv-`), including
// the clones Owl adds on both sides so the loop never shows a gap.
const AUTOPLAY_MS = 3000;
const SPEED_MS = 1000;
const MARGIN_PX = 25;

function perViewForWidth(w: number): number {
  if (w >= 992) return 4;
  if (w >= 768) return 2;
  return 1;
}

export default function ServicesSlider({ children }: { children: ReactNode[] }) {
  const n = children.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const [perView, setPerView] = useState(4);
  const [itemWidth, setItemWidth] = useState(0);
  const [index, setIndex] = useState(0); // position among the real slides (runs past the ends while looping)
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Owl clones max(items * 2, 4, slide count rounded up to even) slides, half on each side.
  const clones = Math.max(perView * 2, 4, Math.ceil(n / 2) * 2) / 2;

  const measure = useCallback(() => {
    const el = outerRef.current;
    if (!el) return;
    const pv = perViewForWidth(document.documentElement.clientWidth);
    setPerView(pv);
    setItemWidth((el.clientWidth - MARGIN_PX * (pv - 1)) / pv);
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
    setIndex((i) => ((i % n) + n) % n);
  }, [perView, n]);

  const go = useCallback(
    (dir: 1 | -1) => {
      // Without transitions there is no transitionend to trigger the clone
      // jump, so wrap the position directly.
      setAnimate(!reducedMotion);
      setIndex((i) => (reducedMotion ? (((i + dir) % n) + n) % n : i + dir));
    },
    [reducedMotion, n],
  );

  useEffect(() => {
    if (paused || reducedMotion || n === 0) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, n, go]);

  // After sliding onto a clone, jump (without animation) to the matching real slide.
  const onTransitionEnd = () => {
    if (index >= n || index < 0) {
      setAnimate(false);
      setIndex(((index % n) + n) % n);
    }
  };

  if (n === 0) return null;

  const slides = [
    ...Array.from({ length: clones }, (_, i) => ({ slide: (((n - clones + i) % n) + n) % n, cloned: true })),
    ...children.map((_, i) => ({ slide: i, cloned: false })),
    ...Array.from({ length: clones }, (_, i) => ({ slide: i % n, cloned: true })),
  ];
  const step = itemWidth + MARGIN_PX;
  const current = index + clones;

  return (
    <div
      className="lv-ph-services-slider lv-owl-carousel lv-owl-theme lv-owl-loaded lv-owl-drag"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={outerRef}
        className="lv-owl-stage-outer"
        onPointerDown={(e) => {
          dragStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragStart.current === null) return;
          const dx = e.clientX - dragStart.current;
          dragStart.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onPointerLeave={() => {
          dragStart.current = null;
        }}
      >
        <div
          // Until measured (and without JS) the live 1/2/4-per-view widths come
          // from the `gh-owl-pending` rules in about-blog-live.css.
          className={itemWidth ? "lv-owl-stage" : "lv-owl-stage gh-owl-pending"}
          style={
            itemWidth
              ? {
                  transform: `translate3d(${-current * step}px, 0px, 0px)`,
                  transition: animate && !reducedMotion ? `all ${SPEED_MS / 1000}s` : "all 0s",
                  width: `${Math.ceil(slides.length * step)}px`,
                }
              : undefined
          }
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map(({ slide, cloned }, i) => (
            <div
              key={i}
              className={`lv-owl-item${cloned ? " lv-cloned" : ""}${i >= current && i < current + perView ? " lv-active" : ""}`}
              style={itemWidth ? { width: `${itemWidth}px`, marginRight: `${MARGIN_PX}px` } : { marginRight: `${MARGIN_PX}px` }}
              aria-hidden={cloned ? true : undefined}
            >
              {children[slide]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
