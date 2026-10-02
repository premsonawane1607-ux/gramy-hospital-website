"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Patient quote slider rendered after the About box on live doctor pages
// that include one (verified on dr-alifiya-udaipurwala). Reproduces the
// live `.cch-testimonial-slider` Owl init: loop, autoplay with an 8000ms
// timeout, 3000ms smartSpeed, 25px margin, 1 visible item, pause on hover,
// no dots — with the original's custom prev/next arrow buttons overlaid at
// the card's bottom-right. Card paint follows the live page-specific
// Elementor override (lavender #D6D2F1, black text) rather than the generic
// blue/white `.cch-testimonial-card` base.
const AUTOPLAY_MS = 8000;
const TRANSITION_MS = 3000;

export interface DoctorTestimonial {
  quote: string;
  name: string;
  role: string;
  img: string | null;
}

export default function DoctorTestimonials({ items }: { items: DoctorTestimonial[] }) {
  const n = items.length;
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(1);
  const jumpedRef = useRef(false);
  const [pos, setPos] = useState(1);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = firstSlideRef.current;
      if (el) setStep(el.offsetWidth + 25);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [n]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setAnimate(true);
      setPos((p) => {
        const next = p + dir;
        posRef.current = next;
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, n, pos, go]);

  const handleTransitionEnd = useCallback(() => {
    const p = posRef.current;
    if (p >= n + 1) {
      setAnimate(false);
      jumpedRef.current = true;
      posRef.current = 1;
      setPos(1);
    } else if (p < 1) {
      setAnimate(false);
      jumpedRef.current = true;
      posRef.current = n;
      setPos(n);
    }
  }, [n]);

  useEffect(() => {
    if (!animate && jumpedRef.current) {
      jumpedRef.current = false;
      const id = window.requestAnimationFrame(() => setAnimate(true));
      return () => window.cancelAnimationFrame(id);
    }
  }, [animate, pos]);

  if (n === 0) return null;

  const cards = [items[n - 1], ...items, items[0]];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[20px]">
        <div
          className="flex items-stretch"
          style={{
            transform: `translateX(${-pos * step}px)`,
            transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {cards.map((t, i) => (
            <div
              key={`${i}-${t.name}`}
              ref={i === 0 ? firstSlideRef : undefined}
              className="mr-[25px] w-full flex-none"
            >
              <div className="rounded-[20px] bg-[#D6D2F1] p-[30px] min-[768px]:p-[40px]">
                <div className="mb-[15px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/theme/quote.svg" alt="" className="h-auto w-auto" />
                </div>
                <p className="text-[15px] text-black min-[768px]:text-[20px]">{t.quote}</p>
                <div className="mt-[22px] flex items-center min-[768px]:mt-[35px]">
                  {t.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.img} alt="" className="h-auto w-full max-w-[55px] rounded-full" />
                  )}
                  <div className="ml-[15px]">
                    <h3 className="mb-0 text-[15px] font-semibold tracking-[1.4px] text-black">{t.name}</h3>
                    <span className="mt-[8px] block text-[14px] text-black">{t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ul className="absolute bottom-[10px] right-[10px] z-[1] mb-0 flex p-0 min-[768px]:bottom-[40px] min-[768px]:right-[40px]">
        <li className="mr-[10px] list-none last:mr-0">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="bg-transparent p-0"
          >
            <i
              className="ti ti-arrow-left inline-block h-[25px] w-[25px] rounded-full border border-white/50 text-center text-[15px] leading-[25px] text-white transition hover:bg-white hover:text-black min-[768px]:h-[45px] min-[768px]:w-[45px] min-[768px]:text-[18px] min-[768px]:leading-[45px]"
              aria-hidden="true"
            />
          </button>
        </li>
        <li className="list-none">
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="bg-transparent p-0"
          >
            <i
              className="ti ti-arrow-right inline-block h-[25px] w-[25px] rounded-full border border-white/50 text-center text-[15px] leading-[25px] text-white transition hover:bg-white hover:text-black min-[768px]:h-[45px] min-[768px]:w-[45px] min-[768px]:text-[18px] min-[768px]:leading-[45px]"
              aria-hidden="true"
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
