"use client";

import Image from "next/image";
import { IoArrowForward, IoChevronBack } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";

export default function SuccessStories() {
  return (
    <section id="success-stories" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />
      <div className="absolute top-0 right-0">
        <Image src="/images/stories-vector-right.png" alt="Stories Vector Right" width={461} height={461} />
      </div>
      <div className="absolute bottom-20 left-0">
        <Image src="/images/stories-vector-left.png" alt="Stories Vector Left" width={461} height={461} />
      </div>
      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px]">
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

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="mx-auto flex max-w-75 flex-col items-start gap-2 rounded-3xl border border-[#21325E] bg-[#0C1222] px-6 py-4 text-white">
            <Image src="/images/success-stories.png" width={250} height={145} alt="Success Story" />
            <h3 className="mt-1 text-xl font-semibold">Ecommerce Platform</h3>
            <p className="text-sm">Web Development</p>
          </div>
          <div className="mx-auto flex max-w-75 flex-col items-start gap-2 rounded-3xl border border-[#21325E] bg-[#0C1222] px-6 py-4 text-white">
            <Image src="/images/success-stories.png" width={250} height={145} alt="Success Story" />
            <h3 className="mt-1 text-xl font-semibold">Ecommerce Platform</h3>
            <p className="text-sm">Web Development</p>
          </div>
          <div className="mx-auto flex max-w-75 flex-col items-start gap-2 rounded-3xl border border-[#21325E] bg-[#0C1222] px-6 py-4 text-white">
            <Image src="/images/success-stories.png" width={250} height={145} alt="Success Story" />
            <h3 className="mt-1 text-xl font-semibold">Ecommerce Platform</h3>
            <p className="text-sm">Web Development</p>
          </div>
          <div className="mx-auto flex max-w-75 flex-col items-start gap-2 rounded-3xl border border-[#21325E] bg-[#0C1222] px-6 py-4 text-white">
            <Image src="/images/success-stories.png" width={250} height={145} alt="Success Story" />
            <h3 className="mt-1 text-xl font-semibold">Ecommerce Platform</h3>
            <p className="text-sm">Web Development</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous success story"
            className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:border-black-v1/30 hover:text-black-v1"
          >
            <IoChevronBack size={22} />
          </button>
          <button
            type="button"
            aria-label="Next success story"
            className="flex size-12 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90"
          >
            <IoArrowForward size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
