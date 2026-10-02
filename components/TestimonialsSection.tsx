"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { testimonials } from "@/lib/homepage-data";

const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 1000;
const GAP = 25;
const ITEMS_PER_VIEW = 1;

export default function TestimonialsSection() {
  const items = testimonials.items;
  const viewportRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pos, setPos] = useState(ITEMS_PER_VIEW);
  const [withTransition, setWithTransition] = useState(true);

  const extended = useMemo(() => {
    const before = items.slice(items.length - ITEMS_PER_VIEW);
    const after = items.slice(0, ITEMS_PER_VIEW);
    return [...before, ...items, ...after];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function measure() {
      const el = viewportRef.current;
      if (el) setContainerWidth(el.clientWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function resetAutoplay() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setPos((p) => p + 1);
    }, AUTOPLAY_MS);
  }

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTransitionEnd() {
    if (pos >= ITEMS_PER_VIEW + items.length) {
      setWithTransition(false);
      setPos(pos - items.length);
    } else if (pos < ITEMS_PER_VIEW) {
      setWithTransition(false);
      setPos(pos + items.length);
    }
  }

  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  function goTo(direction: 1 | -1) {
    setWithTransition(true);
    setPos((p) => p + direction);
    resetAutoplay();
  }

  const cardWidth = containerWidth;
  const translateX = -(pos * (cardWidth + GAP));

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="container-default relative z-10">
        <div className="mx-auto mb-10 max-w-[1042px] lg:mb-[100px]">
          <span className="mb-2.5 block text-[10px] font-bold tracking-[1.2px] text-optional md:mb-3 md:text-xs">
            {testimonials.sub}
          </span>
          <h2 className="text-[28px] leading-[1.3] md:text-[52px]">
            {testimonials.title}
            <br />
            {testimonials.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-[30px] lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="relative mb-[25px] aspect-[16/10] w-full overflow-hidden rounded-[20px]">
              <Image src={testimonials.leftImage} alt="Gramy Hospital" fill className="object-cover" />
            </div>

            <div
              className="relative overflow-hidden rounded-[20px]"
              onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
              onMouseLeave={resetAutoplay}
            >
              <div ref={viewportRef} className="overflow-hidden rounded-[20px]">
                <div
                  className="flex"
                  style={{
                    gap: `${GAP}px`,
                    transform: `translateX(${translateX}px)`,
                    transition: withTransition ? `transform ${TRANSITION_MS}ms ease` : "none",
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extended.map((t, i) => (
                    <div
                      key={`${t.name}-${i}`}
                      style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
                      className="relative flex-none rounded-[20px] bg-[#D6D2F1] p-[30px] md:p-10"
                    >
                      <Image src="/images/theme/quote.svg" alt="" width={40} height={32} className="mb-[15px]" />
                      <p className="text-[15px] font-medium leading-relaxed text-black md:text-xl">&quot;{t.quote}&quot;</p>
                      <div className="mt-[22px] flex items-center md:mt-[35px]">
                        <div className="relative h-[55px] w-[55px] flex-none overflow-hidden rounded-full">
                          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                        </div>
                        <div className="ml-[15px]">
                          <h3 className="text-[15px] font-semibold tracking-[1.4px] text-black">{t.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-[10px] right-[10px] flex gap-2.5 md:bottom-10 md:right-10">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(-1)}
                  className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-white/50 text-[15px] text-black transition hover:bg-white md:h-[45px] md:w-[45px] md:text-base"
                >
                  <i className="ti ti-arrow-left" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => goTo(1)}
                  className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-white/50 text-[15px] text-black transition hover:bg-white md:h-[45px] md:w-[45px] md:text-base"
                >
                  <i className="ti ti-arrow-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-[25px] max-w-[260px] rounded-[20px] bg-[#D7ECE4] p-[30px] text-center">
              <span className="mb-3 block text-xs tracking-[1.2px] text-black">{testimonials.rating.label}</span>
              <div className="flex items-center justify-center gap-2.5">
                <i className="ti ti-star-filled text-[35px] leading-none text-optional-three" aria-hidden="true" />
                <b className="text-[35px] font-black leading-none text-black">{testimonials.rating.value}</b>
              </div>
            </div>

            <div className="relative mb-[25px] aspect-[16/10] w-full overflow-hidden rounded-[20px]">
              <Image src={testimonials.image} alt="Gramy Hospital" fill className="object-cover" />
            </div>

            <div className="flex max-w-[465px] flex-col items-start gap-0 rounded-[20px] bg-[#E1E6EB] p-[25px] md:flex-row md:items-center md:gap-5 md:p-[30px]">
              <div className="flex h-[72px] w-[72px] flex-none items-center justify-center rounded-full bg-white">
                <i className="flaticon-caduceus text-[40px] text-optional" aria-hidden="true" />
              </div>
              <div className="mt-[15px] max-w-[290px] md:ml-0 md:mt-0">
                <span className="mb-1.5 block text-xs tracking-[1.2px] text-black">{testimonials.trust.label}</span>
                <h3 className="mb-3 text-lg font-semibold leading-snug text-black">{testimonials.trust.title}</h3>
                <Link href={testimonials.trust.href} className="gh-feature-card__link !text-[13.5px] md:!text-sm">
                  <span aria-hidden="true">&#8594;</span> Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gh-shape-bounce pointer-events-none absolute right-[15%] top-[15%] z-0 opacity-80">
        <Image src="/images/theme/shape.png" alt="" width={90} height={110} />
      </div>
    </section>
  );
}
