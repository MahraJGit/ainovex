"use client";

import { useMemo, useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import TestimonialCard from "../../ui/TestimonialCard";

const testimonials = [
  {
    quote: "Our iOS and Android app launched without a single major bug. User retention jumped 40% in the first month. Ainovex truly understands mobile.",
    name: "Sarah Mitchell",
    role: "Founder, Nova Retail",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    quote: "Ainovex built our corporate website from scratch. Page speed improved drastically, bounce rate dropped, and we started ranking on Google within weeks. Their team delivered exactly what they promised, on time and within budget.",
    name: "James Carter",
    role: "CEO, BrightPath Logistics",
    avatar: "/images/testimonials/james.jpg",
    rating: 5,
  },
  {
    quote: "We were burning money on ads with zero ROI. Ainovex restructured our entire campaign strategy. Lead quality improved significantly, and our cost per acquisition dropped by almost half.",
    name: "Daniel Rowe",
    role: "Marketing Director, NorthPeak Media",
    avatar: "/images/testimonials/daniel.jpg",
    rating: 5,
  },
  {
    quote: "Our organic traffic tripled in six months. Ainovex's SEO strategy put us on page one for keywords we'd struggled with for years.",
    name: "Amanda Reyes",
    role: "Operations Manager",
    avatar: "/images/testimonials/daniel.jpg",
    rating: 5,
  },
  {
    quote: "Our online store conversions increased by 35% after the checkout redesign. The team understood our customers better than we did, and it showed in every detail.",
    name: "Olivia Bennett",
    role: "Ecommerce Owner",
    avatar: "/images/testimonials/daniel.jpg",
    rating: 5,
  },
];

const tilts = ["cw", "ccw", "ccw"] as const;

const slotVisibility = [
  "hidden md:block",  // slot 0: hidden on mobile, shown on md+
  "block",            // slot 1: always shown (active card)
  "hidden xl:block",  // slot 2: hidden until xl (1280px+)
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
        <div className="mt-16 flex justify-center gap-0 py-6 overflow-hidden md:justify-evenly">
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
        <div className="mt-6 flex items-center justify-center gap-3">
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