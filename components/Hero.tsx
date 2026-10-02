"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/homepage-data";

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = hero.slides.length;

  function resetAutoplay() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
  }

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goTo(i: number) {
    setIndex((i + total) % total);
    resetAutoplay();
  }

  return (
    <section className="gh-hero" aria-label="Gramy Hospital introduction">
      <div
        className="gh-hero__viewport"
        onMouseEnter={() => {
          if (timerRef.current) clearInterval(timerRef.current);
        }}
        onMouseLeave={resetAutoplay}
      >
        <div
          className="gh-hero__track"
          style={{ width: `${total * 100}%`, transform: `translateX(-${index * (100 / total)}%)` }}
        >
          {hero.slides.map((slide, i) => (
            <div
              key={i}
              className="gh-slide"
              style={{ width: `${100 / total}%`, backgroundPosition: slide.imagePosition === "top" ? "top" : "center" }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.imagePosition === "top" ? "top" : "center" }}
              />
              <div className="gh-slide__scrim" />
              <div className="gh-slide__content">
                <h1 className="gh-slide__title">
                  <span>{slide.titleBold}</span>
                  {slide.titleLight && <span className="gh-slide__title--light">{slide.titleLight}</span>}
                </h1>
                <p className="gh-slide__body">{slide.body}</p>
                <a href={hero.ctaPhone} className="gh-cta">
                  <span className="gh-cta__icon" aria-hidden="true">
                    &#8594;
                  </span>
                  {hero.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="gh-arrow gh-arrow--prev" aria-label="Previous slide" onClick={() => goTo(index - 1)}>
          &#8249;
        </button>
        <button type="button" className="gh-arrow gh-arrow--next" aria-label="Next slide" onClick={() => goTo(index + 1)}>
          &#8250;
        </button>
      </div>

      <div className="gh-features-area">
        <div className="container-default">
          <div className="gh-features-inner">
            <div className="grid grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-4">
              {hero.quickLinks.map((q) => (
                <div key={q.title} className={`gh-feature-card ${q.bg}`}>
                  <div className="gh-feature-card__title">
                    <i className={`ti ${q.icon}`} aria-hidden="true" />
                    <h3>{q.title}</h3>
                  </div>
                  <p>{q.description}</p>
                  <Link href={q.href} className="gh-feature-card__link">
                    <span aria-hidden="true">&#8594;</span> Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
