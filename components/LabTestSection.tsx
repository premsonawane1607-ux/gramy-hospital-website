"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { labTests } from "@/lib/homepage-data";

const AUTOPLAY_MS = 5000;
const TRANSITION_MS = 1000;
const GAP = 25;

export default function LabTestSection() {
  const items = labTests.items;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(2);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pos, setPos] = useState(2);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    function measure() {
      const el = viewportRef.current;
      if (!el) return;
      setContainerWidth(el.clientWidth);
      setItemsPerView(window.innerWidth >= 768 ? 2 : 1);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    setWithTransition(false);
    setPos(itemsPerView);
    const t = setTimeout(() => setWithTransition(true), 50);
    return () => clearTimeout(t);
  }, [itemsPerView]);

  const extended = useMemo(() => {
    const before = items.slice(items.length - itemsPerView);
    const after = items.slice(0, itemsPerView);
    return [...before, ...items, ...after];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setWithTransition(true);
      setPos((p) => p + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  function handleTransitionEnd() {
    if (pos >= itemsPerView + items.length) {
      setWithTransition(false);
      setPos(pos - items.length);
    } else if (pos < itemsPerView) {
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

  const pageCount = Math.ceil(items.length / itemsPerView);
  const realIndex = (((pos - itemsPerView) % items.length) + items.length) % items.length;
  const activeDot = Math.floor(realIndex / itemsPerView);

  function goToDot(i: number) {
    setWithTransition(true);
    setPos(itemsPerView + i * itemsPerView);
  }

  const cardWidth = containerWidth > 0 ? (containerWidth - GAP * (itemsPerView - 1)) / itemsPerView : 0;
  const translateX = -(pos * (cardWidth + GAP));

  return (
    <section className="section-padding bg-white">
      <div className="gh-labtest-container overflow-hidden">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="relative min-h-[450px] overflow-hidden rounded-[20px]">
            <Image
              src={labTests.image}
              alt="Gramy Hospital surgical team"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute bottom-[15px] left-0 z-10 flex max-w-[92%] items-center justify-between gap-4 rounded-r-[40px] bg-[#E1E6EB] py-[15px] pl-4 pr-4 sm:bottom-5 sm:max-w-[440px] sm:pl-[75px] sm:pr-[15px]">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-none items-center justify-center">
                  <Image src={labTests.patientCare.icon} alt="" width={32} height={32} />
                </div>
                <div>
                  <h5 className="text-[13px] font-semibold tracking-[1.2px] text-black sm:text-sm">{labTests.patientCare.title}</h5>
                  <p className="mt-1.5 max-w-[280px] text-[12.5px] leading-snug text-paragraph sm:max-w-[365px] sm:text-[13.5px]">
                    {labTests.patientCare.description}
                  </p>
                </div>
              </div>
              <Link
                href="/find-a-location"
                className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-[#8EC0EE] text-black transition hover:bg-main hover:text-white sm:h-[45px] sm:w-[45px]"
                aria-label="Find a location"
              >
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-[20px] bg-[#E1E6EB] p-[25px] sm:px-10 sm:py-14 lg:px-[65px] lg:py-[100px]">
            <div className="mb-[25px] max-w-[575px] lg:mb-10">
              <span className="mb-3 block text-[10px] font-bold tracking-[1.2px] text-optional sm:text-[12px] lg:mb-[15px]">
                {labTests.sub}
              </span>
              <h2 className="text-[25px] leading-[1.3] text-black sm:text-[32px] lg:text-[42px]">
                {labTests.title} <b className="font-extrabold">{labTests.titleEmphasis}</b>
              </h2>
            </div>

            <div ref={viewportRef} className="overflow-hidden">
              <div
                className="flex"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(${translateX}px)`,
                  transition: withTransition ? `transform ${TRANSITION_MS}ms ease` : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extended.map((item, i) => (
                  <div
                    key={`${item.title}-${i}`}
                    style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
                    className="relative flex-none rounded-[20px] bg-white p-5 sm:p-[30px] sm:pt-[50px]"
                  >
                    <span className="absolute right-[5px] top-[5px] rounded-[20px] bg-[#C4DCF3] px-[10px] py-[5px] text-[10px] font-semibold tracking-[1.2px] text-black sm:right-[10px] sm:top-[10px] sm:px-[15px] sm:py-[10px] sm:text-[12px]">
                      {item.discount}
                    </span>
                    <div className="mb-5 sm:mb-[30px]">
                      <Image src={item.icon} alt="" width={48} height={48} />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-black sm:mb-5">
                      <Link href={item.href}>{item.title}</Link>
                    </h3>
                    <p className="mb-3 text-sm text-paragraph sm:mb-5 sm:text-base">{item.description}</p>
                    <Link href={item.href} className="default-btn !bg-optional-two hover:!bg-optional">
                      <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
                      Schedule A Test
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[30px] flex h-[5px] w-full gap-[3px] overflow-hidden rounded-full bg-[#CAD3DC] lg:mt-[45px]">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goToDot(i)}
                  className={`h-full flex-1 transition-colors ${i === activeDot ? "bg-[#7F95AB]" : "bg-[#CAD3DC]"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
