"use client";

import { useEffect, useRef, useState } from "react";

// Five rows, each carrying one phrase, distributed vertically through the
// hero. Every row travels right -> left, seamlessly looping. Speed and
// horizontal starting offset are varied slightly per row so the layer reads
// as one cohesive moving typography field rather than five identical bars.
const ROWS: { text: string; duration: number; top: string; size: string; tint: boolean; delay: number }[] = [
  { text: "BY YOUTH", duration: 32, top: "4%", size: "text-[19vw] sm:text-[13vw]", tint: false, delay: -2 },
  { text: "FOR YOUTH", duration: 26, top: "23%", size: "text-[17vw] sm:text-[11vw]", tint: true, delay: -14 },
  { text: "REAL STORIES", duration: 34, top: "44%", size: "text-[15vw] sm:text-[10vw]", tint: false, delay: -8 },
  { text: "REAL TEENS", duration: 28, top: "65%", size: "text-[17vw] sm:text-[11vw]", tint: true, delay: -20 },
  { text: "REAL IMPACT", duration: 30, top: "84%", size: "text-[15vw] sm:text-[10vw]", tint: false, delay: -5 }
];

function MarqueeRow({
  text,
  duration,
  size,
  tint,
  delay
}: {
  text: string;
  duration: number;
  size: string;
  tint: boolean;
  delay: number;
}) {
  // Repeat the phrase enough times that one copy always spans more than a
  // full viewport width, then duplicate the whole run once so the
  // translateX(-50%) loop point is visually identical to the start.
  const repeated = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-x-0 overflow-hidden" aria-hidden="true">
      <div
        className="marquee-track gap-[6vw]"
        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-[6vw] pr-[6vw]">
            {repeated.map((i) => (
              <span
                key={i}
                className={`hero-word ${size} ${tint ? "hero-word--tint" : ""} font-medium`}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [enableParallax, setEnableParallax] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnableParallax(isFinePointer && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!enableParallax) return;
    const layer = layerRef.current;
    if (!layer) return;

    let frame = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 14; // very subtle, max ~7px
        const y = (e.clientY / innerHeight - 0.5) * 8;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [enableParallax]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={layerRef} className="absolute inset-0 transition-transform duration-300 ease-out">
        {ROWS.map((row) => (
          <div key={row.text} className="absolute inset-x-0" style={{ top: row.top }}>
            <MarqueeRow text={row.text} duration={row.duration} size={row.size} tint={row.tint} delay={row.delay} />
          </div>
        ))}
      </div>
    </div>
  );
}
