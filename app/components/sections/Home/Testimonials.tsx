"use client";

import { useMemo, useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import TestimonialCard from "../../ui/TestimonialCard";

const testimonials = [
  {
    quote: "Ainovex helped us rebuild our digital presence from the ground up. Their team understood our market, moved quickly, and delivered a platform that actually converts.",
    name: "Sarah Mitchell",
    role: "Marketing Director, Nova Retail",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    quote: "Working with Ainovex felt like adding a dedicated growth partner. Strategy, execution, and reporting were all clear — and the results showed up in the first quarter.",
    name: "James Carter",
    role: "CEO, BrightPath Logistics",
    avatar: "/images/testimonials/james.jpg",
    rating: 5,
  },
  {
    quote: "They took a complex set of services and turned them into a clean, high-performing website. Communication was excellent and every milestone landed on time.",
    name: "Daniel Brooks",
    role: "Founder, NorthPeak Media",
    avatar: "/images/testimonials/daniel.jpg",
    rating: 5,
  },
];

const tilts = ["cw", "ccw", "ccw"] as const;

// Per slot: which breakpoints should this slot be visible at
const slotVisibility = [
  "",              // slot 0: visible on all (md+ handled by TestimonialCard's !active logic)
  "",              // slot 1: active card, always visible
  "lg:block",      // slot 2: only on lg+
] as const;

export default function Testimonials() {
  const [offset, setOffset] = useState(0);
  const count = testimonials.length;

  const visible = useMemo(
    () => [0, 1, 2].map((slot) => testimonials[(offset + slot) % count]),
    [offset, count]
  );

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />
      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px]">
        <div className="mx-auto flex flex-col items-center text-center px-4 md:px-0">
          <Tag label="Testimonials" />
          <h2 className="my-6 max-w-4xl text-black-v1/87">
            <span className="text-primary">What Our Clients Say About Our</span>{" "}
            Digital Marketing Services
          </h2>
          <p className="max-w-lg text-sm md:text-base font-medium leading-relaxed md:leading-[100%] text-black-v1/87">
            Discover how our technology solutions create measurable impact,
            lasting partnerships, and better experiences for businesses.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 flex flex-col items-center justify-center gap-8 py-6 md:flex-row md:items-start md:justify-between md:gap-0 overflow-hidden">
          {visible.map((item, index) => (
            <TestimonialCard
              key={`${item.name}-${offset}`}
              {...item}
              active={index === 1}
              tilt={tilts[index]}
              className={slotVisibility[index]}
            />
          ))}
        </div>

        {/* Nav buttons */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setOffset((o) => (o - 1 + count) % count)}
            aria-label="Previous testimonial"
            className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-primary/90 hover:border-primary/80"
          >
            <IoChevronBack size={22} />
          </button>
          <button
            type="button"
            onClick={() => setOffset((o) => (o + 1) % count)}
            aria-label="Next testimonial"
            className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-primary/90 hover:border-primary/80"
          >
            <IoChevronForward size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}