"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../ui/Button";
import IndustriesCard from "../../ui/IndustriesCard";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";

const industries = [
  { number: "01", title: "B2B Digital Marketing", href: "#" },
  { number: "02", title: "Bank Digital Marketing", href: "#" },
  { number: "03", title: "Construction Digital Marketing", href: "#" },
  { number: "04", title: "Real Estate Digital Marketing", href: "#" },
];

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorPos = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const updateActiveFromCursor = useCallback(() => {
    if (!cursorPos.current) {
      setActiveIndex(null);
      return;
    }

    const { x, y } = cursorPos.current;
    let found: number | null = null;

    for (let i = 0; i < rowRefs.current.length; i++) {
      const el = rowRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        found = i;
        break;
      }
    }

    setActiveIndex(found);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateActiveFromCursor);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateActiveFromCursor]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cursorPos.current = { x: e.clientX, y: e.clientY };
    updateActiveFromCursor();
  }, [updateActiveFromCursor]);

  const handleSectionLeave = useCallback(() => {
    cursorPos.current = null;
    setActiveIndex(null);
  }, []);

  return (
    <section id="industries" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" width="60%" />
      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag label="Industries We Serve" />
          <h2 className="my-6 text-white max-w-3xl">
            <span className="text-primary">Building Success</span> Across Diverse Markets
          </h2>
          <p className="text-base font-medium leading-[100%] text-white/80">
            We deliver industry focused digital solutions designed to address unique challenges, audiences, and growth opportunities.
          </p>
        </div>

        <div
          className="flex flex-col mt-16 gap-y-8"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleSectionLeave}
        >
          {industries.map((industry, index) => (
            <div
              key={industry.number}
              ref={(el) => { rowRefs.current[index] = el; }}
            >
              <IndustriesCard {...industry} isActive={activeIndex === index} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Button variant="solid">View All</Button>
        </div>
      </div>
    </section>
  );
}