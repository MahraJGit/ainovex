"use client";

import { useMemo, useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import TestimonialCard from "../../ui/TestimonialCard";

const testimonials = [
  {
    quote:
      "Ainovex helped us rebuild our digital presence from the ground up. Their team understood our market, moved quickly, and delivered a platform that actually converts.",
    name: "Sarah Mitchell",
    role: "Marketing Director, Nova Retail",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    quote:
      "Working with Ainovex felt like adding a dedicated growth partner. Strategy, execution, and reporting were all clear — and the results showed up in the first quarter.",
    name: "James Carter",
    role: "CEO, BrightPath Logistics",
    avatar: "/images/testimonials/james.jpg",
    rating: 5,
  },
  {
    quote:
      "They took a complex set of services and turned them into a clean, high-performing website. Communication was excellent and every milestone landed on time.",
    name: "Daniel Brooks",
    role: "Founder, NorthPeak Media",
    avatar: "/images/testimonials/daniel.jpg",
    rating: 5,
  },
];

const tilts = ["cw", "ccw", "ccw"] as const;

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [offset, setOffset] = useState(0);
  const count = testimonials.length;

  const visible = useMemo(
    () =>
      [0, 1, 2].map(
        (slot) => testimonials[(offset + slot) % count]
      ),
    [offset, count]
  );

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />
      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag label="Testimonials" />
          <h2 className="my-6 max-w-4xl text-black-v1/87">
            <span className="text-primary">What Our Clients Say About Our</span>{" "}
            Digital Marketing Services
          </h2>
          <p className="max-w-lg text-base font-medium leading-[100%] text-black-v1/87">
            Discover how our technology solutions create measurable impact,
            lasting partnerships, and better experiences for businesses.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between py-6 md:flex-row md:items-start">
          {visible.map((item, index) => (
            <TestimonialCard
              key={`${item.name}-${offset}`}
              {...item}
              active={index === 1}
              tilt={tilts[index]}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous success story"
            className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-primary/90 hover:border-primary/80"
          >
            <IoChevronBack size={22} />
          </button>
          <button
            type="button"
            aria-label="Next success story"
            className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-primary/90 hover:border-primary/80"
          >
            <IoChevronForward size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
