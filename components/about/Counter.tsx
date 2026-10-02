"use client";

import { useEffect, useRef, useState } from "react";

// Live `.counter` (hospa-main.js): when the number scrolls into view it counts
// up from 0 to its value in 200 steps of 10ms, once.
export default function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      const step = value / 200;
      let current = 0;
      timer = window.setInterval(() => {
        current += step;
        const next = Math.floor(current);
        setShown(next);
        if (next >= value) window.clearInterval(timer);
      }, 10);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [value]);

  return (
    <h3 ref={ref} className={className}>
      {shown}
    </h3>
  );
}
