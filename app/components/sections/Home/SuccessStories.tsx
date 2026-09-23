"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";

const stories = [
  {
    image: "/images/success-stories.png",
    title: "Ecommerce Platform",
    category: "Web Development",
  },
  {
    image: "/images/success-stories.png",
    title: "Fintech Mobile App",
    category: "Web Development",
  },
  {
    image: "/images/success-stories.png",
    title: "Ai-generated Dashboard",
    category: "Ai Development",
  },
  {
    image: "/images/success-stories.png",
    title: "Food Delivery App",
    category: "App Development",
  },
];

function StoryCard({ image, title, category }: (typeof stories)[0]) {
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-3xl border border-[#21325E] bg-[#0C1222] px-6 py-4 text-white">
      <Image src={image} width={250} height={145} alt={title} className="w-full" />
      <h3 className="mt-1 text-[18px] font-semibold">{title}</h3>
      <p className="text-sm">{category}</p>
    </div>
  );
}

export default function SuccessStories() {
  const [offset, setOffset] = useState(0);
  const count = stories.length;

  const visibleOne = stories[offset % count];

  const visibleTwo = useMemo(
    () => [0, 1].map((slot) => stories[(offset + slot) % count]),
    [offset, count]
  );

  const visibleThree = useMemo(
    () => [0, 1, 2].map((slot) => stories[(offset + slot) % count]),
    [offset, count]
  );

  const visibleFour = useMemo(
    () => [0, 1, 2, 3].map((slot) => stories[(offset + slot) % count]),
    [offset, count]
  );

  const prev = () => setOffset((o) => (o - 1 + count) % count);
  const next = () => setOffset((o) => (o + 1) % count);

  return (
    <section id="success-stories" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="absolute top-0 right-0 w-[200px] md:w-[320px] lg:w-[461px]">
        <Image
          src="/images/stories-vector-right.png"
          alt=""
          width={461}
          height={461}
          className="w-full h-auto"
          aria-hidden
        />
      </div>
      <div className="absolute bottom-20 left-0 w-[200px] md:w-[320px] lg:w-[461px]">
        <Image
          src="/images/stories-vector-left.png"
          alt=""
          width={461}
          height={461}
          className="w-full h-auto"
          aria-hidden
        />
      </div>

      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px]">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag label="Success Stories" />
          <h2 className="my-6 text-black-v1/87">
            We Turn Challenges into Opportunities
          </h2>
          <p className="text-base font-medium leading-[100%] text-text-black-v1/87">
            Explore how our solutions have helped businesses overcome challenges,
            achieve goals, and drive measurable results.
          </p>
        </div>

        {/* Mobile: 1 card */}
        <div className="mt-14 md:hidden">
          <StoryCard {...visibleOne} />
        </div>

        {/* Tablet: 2 cards (768–1023px) */}
        <div className="mt-14 hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
          {visibleTwo.map((s, i) => (
            <StoryCard key={`${s.title}-${i}`} {...s} />
          ))}
        </div>

        {/* Small desktop: 3 cards (1024–1279px) */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-3 lg:gap-5 xl:hidden">
          {visibleThree.map((s, i) => (
            <StoryCard key={`${s.title}-${i}`} {...s} />
          ))}
        </div>

        {/* Large desktop: 4 cards (1280px+) */}
        <div className="mt-14 hidden xl:grid xl:grid-cols-4 xl:gap-6">
          {visibleFour.map((s, i) => (
            <StoryCard key={`${s.title}-${i}`} {...s} />
          ))}
        </div>

        {/* Nav — single pair, works for all breakpoints */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous story"
            className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-primary/90 hover:border-primary/80"
          >
            <IoChevronBack size={22} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next story"
            className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-primary/90 hover:border-primary/80"
          >
            <IoChevronForward size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}