"use client";

import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ScrollArrows() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show up arrow after scrolling 400px
      setShowUp(scrollTop > 400);
      // Hide down arrow if near bottom of page
      setShowDown(scrollTop + winHeight < docHeight - 200);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollDown = () => {
    const winHeight = window.innerHeight;
    window.scrollBy({ top: winHeight * 0.9, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      {/* Up arrow */}
      <button
        onClick={scrollUp}
        aria-label="Scroll up"
        className={`group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-corporate/15 shadow-3d-pop text-corporate flex items-center justify-center transition-all duration-300 hover:bg-corporate hover:text-white hover:scale-110 ${
          showUp
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <ChevronUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Down arrow */}
      <button
        onClick={scrollDown}
        aria-label="Scroll down"
        className={`group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-corporate/90 backdrop-blur-md border-2 border-corporate/15 shadow-3d-pop text-white flex items-center justify-center transition-all duration-300 hover:bg-kid-orange hover:scale-110 ${
          showDown
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <ChevronDown size={24} className="group-hover:translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
