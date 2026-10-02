"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Live `.testimonial-slider` Owl Carousel, as initialised on the About
// Overview page:
//   loop:true, autoplay:true (3000ms), smartSpeed:1000, margin:25, items:1,
//   autoHeight:true, autoplayHoverPause:true, nav:true (custom prev/next
//   buttons), dots:false.
// It renders Owl's own stage/item/nav markup (classes prefixed `lv-`),
// including the clones Owl adds on both sides so the loop never shows a gap.
const AUTOPLAY_MS = 3000;
const SPEED_MS = 1000;
const MARGIN_PX = 25;

export default function TestimonialSlider({ children }: { children: ReactNode[] }) {
  const n = children.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragStart = useRef<number | null>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [height, setHeight] = useState<number | null>(null);
  const [index, setIndex] = useState(0); // position among the real slides (runs past the ends while looping)
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Owl clones max(items * 2, 4, slide count rounded up to even) slides, half on each side.
  const clones = Math.max(4, Math.ceil(n / 2) * 2) / 2;
  const current = index + clones;

  const measure = useCallback(() => {
    if (outerRef.current) setItemWidth(outerRef.current.clientWidth);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // autoHeight: the viewport takes the height of the slide in view.
  useLayoutEffect(() => {
    const el = itemRefs.current[current];
    if (el && itemWidth) setHeight(el.getBoundingClientRect().height);
  }, [current, itemWidth]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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

  return (
    <div
      className="lv-testimonial-slider lv-owl-carousel lv-owl-theme lv-owl-loaded lv-owl-drag"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={outerRef}
        className="lv-owl-stage-outer lv-owl-height"
        style={height ? { height: `${height}px` } : undefined}
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
          // Until measured (and without JS) the first slide shows at full width
          // through the `gh-owl-pending` rules in about-overview-live.css.
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
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget) onTransitionEnd();
          }}
        >
          {slides.map(({ slide, cloned }, i) => (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`lv-owl-item${cloned ? " lv-cloned" : ""}${i === current ? " lv-active" : ""}`}
              style={itemWidth ? { width: `${itemWidth}px`, marginRight: `${MARGIN_PX}px` } : { marginRight: `${MARGIN_PX}px` }}
              aria-hidden={cloned ? true : undefined}
            >
              {children[slide]}
            </div>
          ))}
        </div>
      </div>
      <div className="lv-owl-nav">
        <button type="button" className="lv-owl-prev" aria-label="Previous testimonial" onClick={() => go(-1)}>
          <div className="lv-testimonial-button-prev">
            <i className="ti ti-arrow-left" />
          </div>
        </button>
        <button type="button" className="lv-owl-next" aria-label="Next testimonial" onClick={() => go(1)}>
          <div className="lv-testimonial-button-next">
            <i className="ti ti-arrow-right" />
          </div>
        </button>
      </div>
    </div>
  );
}
