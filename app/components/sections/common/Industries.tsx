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
  { number: "05", title: "Healthcare Digital Marketing", href: "#" },
  { number: "06", title: "Education Digital Marketing", href: "#" },
  { number: "07", title: "Retail Digital Marketing", href: "#" },
  { number: "08", title: "Hospitality Digital Marketing", href: "#" },
  { number: "09", title: "Automotive Digital Marketing", href: "#" },
  { number: "10", title: "Legal Digital Marketing", href: "#" },
  { number: "11", title: "Finance Digital Marketing", href: "#" },
  { number: "12", title: "Technology Digital Marketing", href: "#" },
  { number: "13", title: "Manufacturing Digital Marketing", href: "#" },
  { number: "14", title: "Logistics Digital Marketing", href: "#" },
  { number: "15", title: "Non-Profit Digital Marketing", href: "#" },
  { number: "16", title: "Fashion Digital Marketing", href: "#" },
  { number: "17", title: "Food & Beverage Digital Marketing", href: "#" },
  { number: "18", title: "Travel Digital Marketing", href: "#" },
  { number: "19", title: "Sports Digital Marketing", href: "#" },
  { number: "20", title: "Entertainment Digital Marketing", href: "#" },
  { number: "21", title: "Agriculture Digital Marketing", href: "#" },
  { number: "22", title: "Energy Digital Marketing", href: "#" },
  { number: "23", title: "Pharmaceutical Digital Marketing", href: "#" },
  { number: "24", title: "Insurance Digital Marketing", href: "#" },
  { number: "25", title: "Government Digital Marketing", href: "#" },
  { number: "26", title: "Telecommunications Digital Marketing", href: "#" },
  { number: "27", title: "Media Digital Marketing", href: "#" },
  { number: "28", title: "Recruitment Digital Marketing", href: "#" },
  { number: "29", title: "Interior Design Digital Marketing", href: "#" },
  { number: "30", title: "Fitness Digital Marketing", href: "#" },
  { number: "31", title: "Beauty Digital Marketing", href: "#" },
  { number: "32", title: "Events Digital Marketing", href: "#" },
];

const INITIAL_COUNT = 4;

export default function Industries() {
  const [expanded, setExpanded] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorPos = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const fifthCardRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Measure exact height of first 4 cards after mount
  useEffect(() => {
    const firstCard = rowRefs.current[0];
    const lastCard = rowRefs.current[INITIAL_COUNT - 1];
    if (firstCard && lastCard) {
      const height =
        lastCard.offsetTop + lastCard.offsetHeight - firstCard.offsetTop;
      setContainerHeight(height);
    }
  }, []);

  const updateActiveFromCursor = useCallback(() => {
    if (!cursorPos.current) { setActiveIndex(null); return; }
    const { x, y } = cursorPos.current;
    let found: number | null = null;
    for (let i = 0; i < rowRefs.current.length; i++) {
      const el = rowRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        found = i; break;
      }
    }
    setActiveIndex(found);
  }, []);

  // Window scroll listener — handles page scroll
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

  // Container scroll listener — handles trackpad scroll inside the list
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleContainerScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateActiveFromCursor);
    };
    container.addEventListener("scroll", handleContainerScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleContainerScroll);
  }, [updateActiveFromCursor]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cursorPos.current = { x: e.clientX, y: e.clientY };
    updateActiveFromCursor();
  }, [updateActiveFromCursor]);

  const handleSectionLeave = useCallback(() => {
    cursorPos.current = null;
    setActiveIndex(null);
  }, []);

  const handleViewAll = useCallback(() => {
    setExpanded(true);
    setTimeout(() => {
      // Scroll page to cards area
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Instantly set container scroll so card 5 peeks
      if (fifthCardRef.current && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          fifthCardRef.current.offsetTop - 20;
      }
    }, 50);
  }, []);

  const handleCollapse = useCallback(() => {
    setExpanded(false);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section id="industries" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" width="60%" />
      <div className="section-container relative z-10 py-16 md:py-[104px]! lg:py-[120px]!">

        {/* Header */}
        <div className="mx-auto flex flex-col items-center text-center px-4 md:px-0">
          <Tag label="Industries We Serve" />
          <h2 className="my-4 md:my-6 text-white max-w-3xl">
            <span className="text-primary">Building Success</span> Across Diverse Markets
          </h2>
          <p className="text-sm md:text-base font-medium leading-relaxed md:leading-[100%] text-white/80 max-w-[90%] md:max-w-none">
            We deliver industry focused digital solutions designed to address
            unique challenges, audiences, and growth opportunities.
          </p>
        </div>

        {/* Cards wrapper — sectionRef here so scrollIntoView targets the list */}
        <div ref={sectionRef} className="relative mt-8 md:mt-16">
          <div
            ref={scrollContainerRef}
            className="flex flex-col gap-y-4 md:gap-y-8 custom-scrollbar pr-2"
            style={{
              height: containerHeight ? `${containerHeight}px` : "auto",
              overflowY: expanded ? "auto" : "hidden",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleSectionLeave}
          >
            {industries.map((industry, index) => (
              <div
                key={industry.number}
                ref={(el) => {
                  rowRefs.current[index] = el;
                  if (index === INITIAL_COUNT) fifthCardRef.current = el;
                }}
              >
                <IndustriesCard
                  {...industry}
                  isActive={activeIndex === index}
                />
              </div>
            ))}
          </div>

          {/* Fade gradient — fades out when expanded */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, #05080F 100%)",
              opacity: expanded ? 0 : 1,
            }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          {!expanded ? (
            <Button variant="solid" onClick={handleViewAll}>
              View All Industries
            </Button>
          ) : (
            <Button variant="outline" onClick={handleCollapse}>
              Show Less
            </Button>
          )}
        </div>

      </div>
    </section>
  );
}