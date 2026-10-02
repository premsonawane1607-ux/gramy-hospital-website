"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function onScroll() {
      setActive(window.scrollY > 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-[30px] z-[11] flex h-10 w-10 items-center justify-center rounded-full bg-optional text-xl text-white transition-all duration-500 hover:bg-main ${
        active ? "bottom-[2%] opacity-100" : "-bottom-10 opacity-0"
      }`}
    >
      <i className="ti ti-arrow-up" aria-hidden="true" />
    </button>
  );
}
